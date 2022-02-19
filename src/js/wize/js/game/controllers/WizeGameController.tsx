import { Room, CreateRoomWithFloor } from "../Room";
import { KYeezy } from "../sprites/KYeezyCharacter";
import WizeGame from "../WizeGame";
import { GameControllerBase, GameState } from "./GameControllerBase";
import { util } from "../../util.js"
import Door from "../sprites/Door";


class WizeGameController extends GameControllerBase {

    rooms: Array<Room>;
    
    constructor() {
        super();

        this.rooms = [ 
            CreateRoomWithFloor(1500, 2000),
            CreateRoomWithFloor(500, 1000),
        ];
0
        this.rooms[0].doors.push({x: 1900, y:1400, h:100, w: 50, destRoom: this.rooms[1], destX: 100, destY: 900});
        this.rooms[1].doors.push({x: 50, y:400, h:100, w: 50, destRoom: this.rooms[0], destX: 1800, destY: 1400});
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

           this.game = new WizeGame(this.baseOptions, door.destRoom, this.character);
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
}

export { WizeGameController };