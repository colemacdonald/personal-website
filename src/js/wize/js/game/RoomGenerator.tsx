import { util } from "../util.js";
import { Monster } from "./sprites/Monster"
import { Coin } from "./sprites/Coin"
import { CreateRoomWithFloor, Room } from "./Room";

class RoomGenerator {
    static generateRandomRoom(options: GameOptions): Room {
        let room = CreateRoomWithFloor(1500, 2000);

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

export { RoomGenerator };