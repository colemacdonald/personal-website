import { util } from "../util.js";
import { Monster } from "../game/sprites/Monster.js"
import { Coin } from "../game/sprites/Coin.js"

class LevelGenerator {
    static generateRandomLevel(options) {
        let level = {
            platforms: [{ x: 0, y: 1500, h: 150, w: 2000 }],
            coins: [],
            monsters: []
        };

        while (level.platforms.length < 50) {
            let newPlat = {
                x: Math.random() * (options.width - 300),
                y: Math.random() * options.height,
                h: 50,
                w: Math.ceil(Math.random() * 5 + 1) * 50,
            };
        
            if (!util.doRectangleArraysOverlap(level.platforms, [newPlat])) {
                level.platforms.push(newPlat);
            }
        }
        
        let i = 0;
        while (
            level.monsters.length < options.numberOfMonsters &&
            i < level.platforms.length
        ) {
            if (
                !util.doRectangleArraysOverlap(
                [level.platforms[i]],
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
                level.monsters.push(
                new Monster({
                    platform: level.platforms[i],
                    x: level.platforms[i].x + level.platforms[i].w / 2,
                    y: level.platforms[i].y - 20,
                    h: 50,
                    w: 20,
                    speed: options.monsterSpeed,
                })
                );
            }
            i++;
        }
    
        for (let i = 0; i < 20; i++) {
            level.coins.push(
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

        return level;
    }
}

export default LevelGenerator;