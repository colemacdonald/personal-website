import { util } from "../util";
import { ControllableCharacter } from "./main-character/ControllableCharacter";
import { Room } from "./Room";
import { Powerup } from "./Powerup";
import { KYeezy } from "./main-character/KYeezyCharacter";

class WizeGame {
    grav: number;
    room: Room;
    character: KYeezy;
    onGround: boolean;

    gameOptions: GameOptions;

    score: number;

    lastPowerup: Powerup;

    /**
     * Create a new game
     */
    constructor(options: GameOptions, room: Room, character: KYeezy) {
        this.gameOptions = options;
        this.grav = options.grav;
        this.room = room;
        this.character = character;

        this.score = 0;
    }

    /**
     * Update the game state to the next frame
     */
    tick() {
        // If the character on a platform?
        this.onGround = false;
        this.character.onG = false;
        this.lastPowerup = null;

        this.checkForCurrentPlatform();

        // Move
        this.character.tick();

        // Force in bounds; rooms always have walls but only sometimes has ceilings
        let aboveBottomY = Math.min(this.room.h - this.character.h + 30, this.character.y);
        this.character.setPosition(Math.max(Math.min(this.room.w - this.character.w, this.character.x), 0), this.room.hasCeiling ? Math.max(aboveBottomY, 0) : Math.min(this.character.y, aboveBottomY));

        this.checkDamageZones();

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

    checkDamageZones() {
        this.room.damageZones.forEach(z => {
            if (util.doRectanglesOverlap(this.character.x, this.character.y + this.character.h * 0.97, this.character.h * 0.1, this.character.w, z.x, z.y, z.h * 0.4 /* platforms are mostly dirt */, z.w)) {
                this.character.onHit();
                this.character.setCurrentPlatform(z);
                this.onGround = true;
            }
        });
    }

    updateAndCheckMonsters() {
        let toRemove = [];
        this.room.monsters.forEach(monster => {
            if (util.doRectangleArraysOverlap(this.character.hitBoxes, monster.hitBoxes)){
                monster.onHit();
                toRemove.push(this.room.monsters.indexOf(monster));
                
                // monsters drop health 40% of the time
                if (Math.random() < 0.4) {
                    this.room.powerups.push(Powerup.Health(monster.x, monster.y));
                }

            }else if (util.doRectangleArraysOverlap(this.character.hurtBoxes, monster.hitBoxes)) {
                this.character.onHit();
            }
            monster.tick();
        }, this);

        // need to remove in reverse order or else splice won't work
        toRemove.reverse();
        toRemove.forEach(m => {
            this.room.monsters.splice(m, 1);
        });
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
            if (util.doRectangleArraysOverlap([p.sprite.drawBox], this.character.hurtBoxes)) {
                powerup = p;
            }
            p.sprite.tick();
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

    spacePress() {
        this.character.runStart();
    }

    spaceRelease() {
        this.character.runEnd();
    }
}

export default WizeGame;

export { WizeGame };
