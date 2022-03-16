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

        // revive dead monsters
        while (this.room.deadMonsters.length > 0) {
            this.room.monsters.push(this.room.deadMonsters.pop());
        }
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

        this.checkTallPlatforms();

        this.checkDamageZones();

        this.updateAndCheckMonsters();

        this.updateAndCheckCoins();

        this.updateAndCheckPowerups();

        this.updateBackgroundItems();
    }

    /***************** UPDATERS *****************/
    checkForCurrentPlatform() {
        this.room.platforms.forEach((plat) => {
            if (util.doRectanglesOverlap(this.character.x, this.character.y + this.character.h * 0.97, this.character.h * 0.1, this.character.w,
                    plat.x, plat.y, 20, plat.w)
                    && !this.character.onG && this.character.yv > 0
                ) {
                // landing on a platform
                this.character.setCurrentPlatform(plat);
                this.onGround = true;
            }
        }, this);

        this.room.damageZones.forEach((z) => {
            if (util.doRectanglesOverlap(this.character.x, this.character.y + this.character.h * 0.75, this.character.h * 0.25, this.character.w,
                    z.x, z.y, 20, z.w)
                    && !this.character.onG && this.character.yv > 0
                ) {
                // landing on a damage zone
                this.character.setCurrentPlatform({x: z.x, 
                    y: z.y + (Math.min(this.character.x - z.x, z.x + z.w - this.character.x - 30) > 0 ? 25 : 0), // we hold them higher on the edge of the damage zones
                    w: z.w, h: z.h});
                this.onGround = true;
            }
        }, this);

        this.room.slopes.forEach(s => {
            let x = s.x1;
            let y = s.y1;
            
            let yinc = -(Math.abs(s.x1 - s.x2) / (s.y1 - s.y2));
            let xinc = 1;

            while (x < s.x2) {
                if (util.doRectanglesOverlap(this.character.x, this.character.y + this.character.h * 0.97, this.character.h * 0.1, this.character.w,
                    x, y, 1, 1)) {
                        this.character.setCurrentPlatform({x: x, y: y, h: 50, w: 50});
                    }
                x += xinc;
                y += yinc;
            }
        });
    }

    checkTallPlatforms() {
        this.room.platforms.forEach((plat) => {
            if (plat.h > 50 && plat.y < this.room.h 
            && util.doRectanglesOverlap(this.character.x, this.character.y, this.character.h, this.character.w, plat.x, plat.y + 25, plat.h - 25, plat.w)) {
                // left side
                if (util.doRectanglesOverlap(this.character.x, this.character.y, this.character.h, this.character.w, plat.x, plat.y + 25, plat.h - 35, 25)) {
                    this.character.x = plat.x - this.character.w;
                    this.character.xv = 0;
                }
                // right side
                if (util.doRectanglesOverlap(this.character.x, this.character.y, this.character.h, this.character.w, plat.x + plat.w - 25, plat.y + 25, plat.h - 35, 25)) {
                    this.character.x = plat.x + plat.w;
                    this.character.xv = 0;
                }
                // bottom
                if (util.doRectanglesOverlap(this.character.x, this.character.y, 25, this.character.w, plat.x + 25, plat.y + plat.h - 25, 25, plat.w - 50)) {
                    this.character.y = plat.y + plat.h;
                    this.character.yv = 0;
                }
            }
        });
    }

    checkDamageZones() {
        this.room.damageZones.forEach(z => {
            if (util.doRectangleArraysOverlap(this.character.hurtBoxes, [{x: z.x + 30,y : z.y, h: z.h, w: z.w - 60}])) {
                this.character.onHit();
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
                
                // monsters drop health some of the time
                if (Math.random() < 0.25) {
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
            this.room.deadMonsters.push(this.room.monsters.splice(m, 1)[0]);
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
