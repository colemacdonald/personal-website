import { util } from "../util";
import { Monster, MonsterType } from "./sprites/Monster"
import { Coin } from "./sprites/Coin"
import { Room } from "./Room";
import Door from "./sprites/Door";
import { Powerup } from "./Powerup";

import { StaticElement } from "./background-elements/StaticElement";
import { RoomBackgroundTheme, RoomThemes } from "./tiles/RoomThemes";
import { AnimatedBackgroundElement, AnimatedBackgroundElementType } from "./background-elements/AnimatedBackgroundElement";

class RoomBuilder {

    room: Room;

    constructor(r: { h: number, w: number }) {
        this.room = new Room({ h: r.h, w: r.w });
    }


    withTheme(theme: RoomBackgroundTheme): RoomBuilder {
        this.room.backgroundTheme = RoomThemes[theme];
        return this;
    }

    withFloor(): RoomBuilder {
        // add to front
        this.room.platforms.unshift({ x: -this.room.w, y: this.room.h, w: this.room.w * 3, h: 150 });
        return this;
    }

    withDamageZoneFloor(extend: boolean = false): RoomBuilder {
        // add to front
        this.room.damageZones.unshift({ x: 0, y: this.room.h, w: this.room.w, h: 150 });
        return this;
    }

    withCeiling(): RoomBuilder {
        this.room.hasCeiling = true;
        return this;
    }

    withPlatform(plat: Rectangle): RoomBuilder {
        this.room.platforms.push(plat);
        return this;
    }

    withDoor(d: { x: number, y: number, destRoom: number, destX: number, destY: number }): RoomBuilder {
        this.room.doors.push(new Door(d.x, d.y, d.destRoom, d.destX, d.destY));
        return this;
    }

    withPowerup(powerup: Powerup): RoomBuilder {
        this.room.powerups.push(powerup);
        return this;
    }

    withCustomPowerup(x: number, y: number, name: string, method: Function): RoomBuilder {
        this.room.powerups.push({coin: new Coin({x: x, y: y}), name: name, method: method});
        return this;
    }

    withMonster(options): RoomBuilder {
        let platform: Rectangle;
        if (options.plat) {
            platform = this.room.platforms[options.plat];
        } else {
            platform = { x: options.x, y: options.y, w: options.w, h: options.h };
        }

        this.room.monsters.push(new Monster({ monsterType: options.monsterType, x: platform.x + platform.w / 2, y: platform.y - 20, platform: platform }));
        return this;
    }

    withAnimatedElement(e: { x: number, y: number, type: AnimatedBackgroundElementType }): RoomBuilder {
        this.room.backgroundElements.push(new AnimatedBackgroundElement({ x: e.x, y: e.y, inFrontOfPlatforms: true, type: e.type }));
        return this;
    }

    withStaticElement(e): RoomBuilder {
        this.room.backgroundElements.push(new StaticElement(e));
        return this;
    }

    build(): Room {
        return this.room;
    }


    static buildRandomRoom(options: GameOptions): Room {
        let room = new RoomBuilder({ h: 1500, w: 2000 }).withFloor().build();

        while (room.platforms.length < 50) {
            let newPlat = {
                x: Math.random() * (options.width - 300),
                y: Math.random() * options.height,
                h: 50,
                w: Math.ceil(Math.random() * 5 + 1) * 50,
            };

            if (!util.doRectangleArraysOverlap(room.platforms, [newPlat])) {
                room.platforms.push(newPlat);
            }
        }

        let i = 0;
        while (
            room.monsters.length < options.numberOfMonsters &&
            i < room.platforms.length
        ) {
            if (
                !util.doRectangleArraysOverlap(
                    [room.platforms[i]],
                    [
                        {
                            x: options.safeBox.x - 10,
                            y: options.safeBox.y - options.safeBox.h - 30,
                            h: 400,
                            w: 200,
                        },
                    ]
                )
            ) {
                room.monsters.push(
                    new Monster({
                        platform: room.platforms[i],
                        x: room.platforms[i].x + room.platforms[i].w / 2,
                        y: room.platforms[i].y - 20,
                        monsterType: MonsterType.Centipede,
                    })
                );
            }
            i++;
        }

        for (let i = 0; i < 20; i++) {
            room.coins.push(
                new Coin({
                    x:
                        Math.random() * (options.width - options.coinMargin * 2) +
                        options.coinMargin,
                    y:
                        Math.random() * (options.height - options.coinMargin * 2) +
                        options.coinMargin,
                })
            );
        }

        return room;
    }
}

export { RoomBuilder };