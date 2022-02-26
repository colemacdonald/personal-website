import { Room } from "../Room";
import { RoomBackgroundTheme } from "../tiles/RoomThemes";
import { KYeezy } from "../main-character/KYeezyCharacter";
import WizeGame from "../WizeGame";
import { GameControllerBase, GameState } from "./GameControllerBase";
import { util } from "../../util"
import Door from "../sprites/Door";
import { RoomBuilder } from "../RoomBuilder";
import { Coin } from "../sprites/Coin";
import { Powerup } from "../Powerup";
import { MonsterType } from "../sprites/Monster";
import { StaticElementType } from "../background-elements/StaticElement";
import { BackgroundElementType } from "../background-elements/Backgrounds";


class WizeGameController extends GameControllerBase {
    loadingTicks: number = 0;
    maxLoadingTicks: number = 250;

    constructor() {
        super();

        this.baseOptions.snapToPlatforms = false;
    }

    newGame() {
        this.gameState = GameState.Playing;
        this.level = 0;

        this.baseOptions.monsterSpeed = 2;
        this.baseOptions.numberOfMonsters = 20;

        this.character = new KYeezy({});

        this.game = new WizeGame(this.baseOptions, this.rooms[0], this.character);
        this.character.setPosition(this.baseOptions.safeBox.x + this.baseOptions.safeBox.w / 2, this.baseOptions.safeBox.y + this.baseOptions.safeBox.h / 2);
        this.character.setGame(this.game);
    }

    /*
     Main game update method that signals a frame
     */
    tick() {

        switch (this.gameState) {
            case GameState.Playing:
                super.tick();
                // check for death
                if (this.character.healthPoints === 0) {
                    this.gameState = GameState.Over;
                    return;
                }

                // check for doors
                let door = this.getOverlappingDoor();
                if (door) {
                    delete this.game;

                    this.game = new WizeGame(this.baseOptions, this.rooms[door.destRoom], this.character);
                    this.character.setPosition(door.destX, door.destY);
                    this.character.setGame(this.game);
                }

                // check for powerups
                if (this.game.lastPowerup) {
                    this.message = this.game.lastPowerup.name + " acquired!";

                    this.gameState = GameState.Loading;
                    this.game.lastPowerup = null;
                }
            case GameState.Loading:
                this.loadingTicks++;
                if (this.loadingTicks > this.maxLoadingTicks) {
                    this.gameState = GameState.Playing;
                    this.loadingTicks = 0;
                    this.message = "";
                }
            default:
        }
    }

    getOverlappingDoor(): Door {
        let overlappedDoor = null;

        this.game.room.doors.forEach(door => {
            if (util.doRectangleArraysOverlap(door.hitBoxes, this.character.hurtBoxes)) {
                overlappedDoor = door;
            }
        });

        return overlappedDoor;
    }

    doubleJump: Powerup = {
        coin: new Coin({ x: 950, y: 200 }),
        name: "Double Jump",
        method: (character: KYeezy) => {
            character.maxJmpCnt = 2;
        }
    };

    rooms: Array<Room> = [
        new RoomBuilder({ h: 750, w: 1000 })
            .withFloor()
            .withDoor({ x: 900, y: 660, destRoom: 1, destX: 100, destY: 0 })
            .withMonster({monsterType: MonsterType.Vulture, x: 0, y: 600, w: 1000, h: 20 })
            .withFountain({ x: 500, y: 650 })
            .withStaticElement({type: StaticElementType.Tree3, x: -240, y: 380, inFrontOfPlatforms: true, scale: 2})
            .withStaticElement({type: StaticElementType.Stone1, x: 350, y: 743})
            .build(),
        new RoomBuilder({ h: 2400, w: 500 }).withFloor()
            .withTheme(RoomBackgroundTheme.Castle)
            .withPlatform({ x: 0, y: 300, h: 50, w: 300 })
            .withDoor({ x: 50, y: 210, destRoom: 0, destX: 840, destY: 750 })
            .withPlatform({ x: 200, y: 500, h: 50, w: 300 })
            .withMonster({ monsterType: MonsterType.Scorpion, plat: 2 })
            .withPlatform({ x: 0, y: 800, h: 50, w: 300 })
            .withMonster({ monsterType: MonsterType.Centipede, plat: 3 })
            .withPlatform({ x: 200, y: 1100, h: 50, w: 300 })
            .withMonster({ monsterType: MonsterType.Centipede, plat: 4 })
            .withPlatform({ x: 0, y: 1400, h: 50, w: 300 })
            .withMonster({ monsterType: MonsterType.Centipede, plat: 5 })
            .withDoor({ x: 50, y: 2310, destRoom: 2, destX: 1900, destY: 50 })
            .build(),
        new RoomBuilder({ h: 100, w: 2000 }).withFloor()
            .withTheme(RoomBackgroundTheme.Cave)
            .withDoor({ x: 1950, y: 10, destRoom: 1, destX: 150, destY: 2350 })
            .withDoor({ x: -10, y: 10, destRoom: 3, destX: 870, destY: 2170 })
            .build(),
        new RoomBuilder({ h: 2200, w: 1000 }).withFloor()
            .withTheme(RoomBackgroundTheme.Castle)
            .withDoor({ x: 940, y: 2110, destRoom: 2, destX: 100, destY: 50 })
            .withPlatform({ x: 0, y: 2100, w: 100, h: 50 })
            .withPlatform({ x: 0, y: 2000, w: 100, h: 50 })
            .withPlatform({ x: 0, y: 1900, w: 100, h: 50 })
            .withPlatform({ x: 220, y: 1800, w: 100, h: 50 })
            .withPlatform({ x: 440, y: 1700, w: 100, h: 50 })
            .withPlatform({ x: 660, y: 1600, w: 100, h: 50 })
            .withPlatform({ x: 880, y: 1500, w: 100, h: 50 })
            .withPlatform({ x: 660, y: 1400, w: 100, h: 50 })
            .withPlatform({ x: 880, y: 1300, w: 100, h: 50 })
            .withPlatform({ x: 660, y: 1200, w: 100, h: 50 })
            .withPlatform({ x: 880, y: 1100, w: 100, h: 50 })
            .withPlatform({ x: 660, y: 1000, w: 100, h: 50 })
            .withPlatform({ x: 440, y: 1000, w: 100, h: 50 })
            .withPlatform({ x: 150, y: 1050, w: 200, h: 50 })
            .withPlatform({ x: 0, y: 950, w: 100, h: 50 })
            .withPlatform({ x: 220, y: 850, w: 100, h: 50 })
            .withPlatform({ x: 0, y: 750, w: 100, h: 50 })
            .withPlatform({ x: 220, y: 650, w: 100, h: 50 })
            .withPlatform({ x: 0, y: 550, w: 100, h: 50 })
            .withPlatform({ x: 220, y: 450, w: 100, h: 50 })
            .withPlatform({ x: 440, y: 350, w: 200, h: 50 })
            .withPlatform({ x: 760, y: 450, w: 100, h: 50 })
            .withPlatform({ x: 900, y: 350, w: 100, h: 50 })
            .withPlatform({ x: 900, y: 250, w: 100, h: 50 })
            .withPlatform({ x: 0, y: 150, w: 450, h: 50 })
            .withPowerup(this.doubleJump)
            .withDoor({ x: 20, y: 60, destRoom: 0, destX: 60, destY: 600 })
            .build()
    ];
}

export { WizeGameController };