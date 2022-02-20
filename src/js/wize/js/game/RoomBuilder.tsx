import { util } from "../util";
import { Monster } from "./sprites/Monster"
import { Coin } from "./sprites/Coin"
import { Room } from "./Room";
import Door from "./sprites/Door.js";
import { Powerup } from "./Powerup";
import { Fountain } from "./background-elements/Fountain";

class RoomBuilder {

    room: Room;

    constructor(r: {h: number, w: number}) {
        this.room = {h: r.h, w: r.w, platforms: [], monsters: [], coins: [], doors: [], powerups: [], backgroundElements: []};
    }

    withFloor() : RoomBuilder {
        this.room.platforms.push({x: 0, y: this.room.h, w: this.room.w, h: 150});
        return this;
    }

    withPlatform(plat: Rectangle) : RoomBuilder {
        this.room.platforms.push(plat);
        return this;
    }

    withDoor(d: {x: number, y: number, destRoom: number, destX: number, destY: number}): RoomBuilder {
        this.room.doors.push({x: d.x, y: d.y, destRoom: d.destRoom, destX: d.destX, destY: d.destY, h: 100, w: 50})
        return this;
    }

    withPowerup(powerup: Powerup): RoomBuilder {
        this.room.powerups.push(powerup);
        return this;
    }

    withMonster(m : {w: number, h: number, plat: number}): RoomBuilder {
        let platform = this.room.platforms[m.plat]
        this.room.monsters.push(new Monster({w: m.w, h: m.h, x: platform.x + platform.w / 2, y: platform.y - 20, platform: platform, speed: 1 }))
        return this;
    }

    withFountain(f: {x: number, y: number}): RoomBuilder {
        this.room.backgroundElements.push(new Fountain({x: f.x, y: f.y, h: 100, w: 100}));
        return this;
    }

    build() : Room {
        return this.room;
    }


    static buildRandomRoom(options: GameOptions): Room {
        let room = new RoomBuilder({h:1500, w:2000}).withFloor().build();

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
                    h: 50,
                    w: 20,
                    speed: options.monsterSpeed,
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