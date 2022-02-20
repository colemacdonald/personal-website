import { Room } from "../Room";
import { KYeezy } from "../sprites/KYeezyCharacter";
import WizeGame from "../WizeGame";
import { GameControllerBase, GameState } from "./GameControllerBase";
import { util } from "../../util.js"
import Door from "../sprites/Door";
import { RoomBuilder } from "../RoomBuilder";


class WizeGameController extends GameControllerBase {
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
            .withDoor({x: 900, y:650, h:100, w: 50, destRoom: 1, destX: 100, destY: 0})
        .build(),
        new RoomBuilder({h:2400, w:500}).withFloor()
            .withPlatform({x: 0, y: 300, h: 150, w: 300})
            .withDoor({x: 50, y:200, h:100, w: 50, destRoom: 0, destX: 840, destY: 750})
            .withPlatform({x:200, y: 500, h: 150, w: 300})
            .withPlatform({x:0, y: 800, h: 150, w: 300})
            .withPlatform({x:200, y: 1100, h: 150, w: 300})
            .withPlatform({x:0, y: 1400, h: 150, w: 300})
            .withDoor({x:50, y: 2300, h: 100, w: 50, destRoom:2, destX: 2400, destY:50})
        .build(),
        new RoomBuilder({h: 100, w: 2500}).withFloor()
            .withDoor({x: 2450, y:0, h: 100, w: 50, destRoom: 1, destX: 110, destY: 2250})
        .build()
    ];
}

export { WizeGameController };