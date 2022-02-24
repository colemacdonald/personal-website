import { util } from "../util";
import { ControllableCharacter } from "./main-character/ControllableCharacter";
import { Room } from "./Room";
import { Powerup } from "./Powerup";

class WizeGame {
    grav: number;
    room: Room;
    character: ControllableCharacter;
    onGround: boolean;

    gameOptions: GameOptions;

    playerAlive: boolean;
    score: number;

    lastPowerup: Powerup;

    /**
     * Create a new game
     */
    constructor(options: GameOptions, room: Room, character: ControllableCharacter) {
        this.gameOptions = options;
        this.grav = options.grav;
        this.room = room;
        this.character = character;

        this.playerAlive = true;
        this.score = 0;
    }

    /**
     * Update the game state to the next frame
     */
    tick() {
        // If the character on a platform?
        this.onGround = false;
        this.character.onG = false;

        this.checkForCurrentPlatform();

        // Move
        this.character.tick();

        // Force in bounds
        this.character.setPosition(Math.max(Math.min(this.room.w - this.character.w, this.character.x), 0), Math.max(Math.min(this.room.h - this.character.h + 30, this.character.y), 0));

        this.updateAndCheckMonsters();

        this.updateAndCheckCoins();

        this.updateAndCheckPowerups();

        this.updateBackgroundItems();
    }

    /***************** UPDATERS *****************/
    checkForCurrentPlatform() {
        this.room.platforms.forEach((plat) => {
            if (
                util.doRectanglesOverlap(
                    this.character.x,
                    this.character.y + this.character.h * 0.97,
                    this.character.h * 0.1,
                    this.character.w,
                    plat.x,
                    plat.y,
                    plat.h * 0.4, // platforms are mostly dirt
                    plat.w
                ) &&
                !this.character.onG &&
                this.character.yv > 0
            ) {
                this.character.setCurrentPlatform(plat);
                this.onGround = true;
            }
        }, this);
    }

    updateAndCheckMonsters() {
        this.room.monsters.forEach(monster => {
            if (util.doRectangleArraysOverlap(this.character.hitBoxes, monster.hitBoxes)){
                monster.onHit().then(() => {console.log("audio played")}).catch((e) => {console.log(e)});
            }else if (util.doRectangleArraysOverlap(this.character.hurtBoxes, monster.hitBoxes)) {
                this.playerAlive = false;
            }
            monster.tick();
        }, this);
    }

    updateAndCheckCoins() {
        var indices = [];

        this.room.coins.forEach(coin => {
            if (
                util.doRectangleArraysOverlap(this.character.hurtBoxes, [
                    {
                        x: coin.x - coin.r,
                        y: coin.y - coin.r,
                        h: coin.r * 2,
                        w: coin.r * 2,
                    },
                ])
            ) {
                indices.push(this.room.coins.indexOf(coin));
            }
            coin.tick();
        }, this);

        // Remove coins from game
        for (var i = indices.length - 1; i >= 0; i--) {
            this.score += 100;
            this.room.coins.splice(indices[i], 1);
        }
    }

    updateAndCheckPowerups() {
        let powerup = null;

        this.room.powerups.forEach(p => {
            if (util.doRectangleArraysOverlap([{ x: p.coin.x - p.coin.r / 2, y: p.coin.y - p.coin.r / 2, h: p.coin.r * 2, w: p.coin.r * 2 }], this.character.hurtBoxes)) {
                powerup = p;
            }
            p.coin.tick();
        });

        // check for powerups
        if (powerup) {
            powerup.method(this.character);
            this.room.powerups.splice(this.room.powerups.indexOf(powerup), 1);
            this.lastPowerup = powerup;
        }
    }

    updateBackgroundItems() {
        this.room.backgroundElements.forEach(e => {
            e.tick();
        });
    }

    /***************** EVENTS *******************/

    leftPress() {
        this.character.leftPress();
    }

    leftRelease() {
        this.character.leftRelease();
    }

    rightPress() {
        this.character.rightPress();
    }

    rightRelease() {
        this.character.rightRelease();
    }

    upPress() {
        this.character.upPress();
    }

    upRelease() {
        this.character.upRelease();
    }

    downPress() {
        this.character.downPress();
    }

    downRelease() {
        this.character.downRelease();
    }

    attackPress() {
        this.character.attack();
    }
}

export default WizeGame;

export { WizeGame };
