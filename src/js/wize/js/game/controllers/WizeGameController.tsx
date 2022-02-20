import { Room } from "../Room";
import { KYeezy } from "../sprites/KYeezyCharacter";
import WizeGame from "../WizeGame";
import { GameControllerBase, GameState } from "./GameControllerBase";
import { util } from "../../util.js"
import Door from "../sprites/Door";
import { RoomBuilder } from "../RoomBuilder";


class WizeGameController extends GameControllerBase {
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
        this.character.setPosition(this.baseOptions.safeBox.x + this.baseOptions.safeBox.w/2, this.baseOptions.safeBox.y + this.baseOptions.safeBox.h/2);
        this.character.setGame(this.game);
    }

    /*
     Main game update method that signals a frame
     */
    tick() {
        super.tick();

        // check for death
        if (!this.game.playerAlive) {
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
    }

    getOverlappingDoor() : Door {
        let overlappedDoor = null;

        this.game.room.doors.forEach(door => {
            if (util.doRectangleArraysOverlap([door], this.character.getHurtBoxes())) {
                overlappedDoor = door;
            }
        })

        return overlappedDoor;
    }

    rooms: Array<Room> = [
        new RoomBuilder({h:750, w: 1000}).withFloor()
            .withDoor({x: 900, y:650, destRoom: 1, destX: 100, destY: 0})
            .withDoor({x: 700, y:650, destRoom:3, destX: 300, destY:2170})
        .build(),
        new RoomBuilder({h:2400, w:500}).withFloor()
            .withPlatform({x: 0, y: 300, h: 50, w: 300})
            .withDoor({x: 50, y:200, destRoom: 0, destX: 840, destY: 750})
            .withPlatform({x:200, y: 500, h: 50, w: 300})
            .withPlatform({x:0, y: 800, h: 50, w: 300})
            .withPlatform({x:200, y: 1100, h: 50, w: 300})
            .withPlatform({x:0, y: 1400, h: 50, w: 300})
            .withDoor({x:50, y: 2300, destRoom:2, destX: 1900, destY:50})
        .build(),
        new RoomBuilder({h: 100, w: 2000}).withFloor()
            .withDoor({x: 2450, y:0, destRoom: 1, destX: 110, destY: 2350})
            .withDoor({x:20, y: 0, destRoom: 3, destX: 870, destY: 2170})    
        .build(),
        new RoomBuilder({h: 2200, w: 1000}).withFloor()
            .withDoor({x:940, y: 2100, destRoom: 2, destX: 75, destY:50})
            .withPlatform({x: 0, y: 2100, w: 100, h: 50})
            .withPlatform({x: 0, y: 2000, w: 100, h: 50})
            .withPlatform({x: 0, y: 1900, w: 100, h: 50})
            .withPlatform({x: 220, y: 1800, w: 100, h: 50})
            .withPlatform({x: 440, y: 1700, w: 100, h: 50})
            .withPlatform({x: 660, y: 1600, w: 100, h: 50})
            .withPlatform({x: 880, y: 1500, w: 100, h: 50})
            .withPlatform({x: 660, y: 1400, w: 100, h: 50})
            .withPlatform({x: 880, y: 1300, w: 100, h: 50})
            .withPlatform({x: 660, y: 1200, w: 100, h: 50})
            .withPlatform({x: 880, y: 1100, w: 100, h: 50})
            .withPlatform({x: 660, y: 1000, w: 100, h: 50})
            .withPlatform({x: 440, y: 1000, w: 100, h: 50})
            .withPlatform({x: 150, y: 1050, w: 200, h: 50})
            .withPlatform({x: 0, y: 950, w: 100, h: 50})
            .withPlatform({x: 220, y: 850, w: 100, h: 50})
            .withPlatform({x: 0, y: 750, w: 100, h: 50})
            .withPlatform({x: 220, y: 650, w: 100, h: 50})
            .withPlatform({x: 0, y: 550, w: 100, h: 50})
            .withPlatform({x: 220, y: 450, w: 100, h: 50})
            .withPlatform({x: 440, y: 350, w: 200, h: 50})
            .withPlatform({x: 760, y: 450, w: 100, h: 50})
            .withPlatform({x: 900, y: 350, w: 100, h: 50})
            .withPlatform({x: 900, y: 250, w: 100, h: 50})
            .withPlatform({x: 0, y: 200, w: 750, h: 50})
            .withPlatform({x: 0, y: 100, w: 450, h: 50})
        .build()
    ];
}

export { WizeGameController };