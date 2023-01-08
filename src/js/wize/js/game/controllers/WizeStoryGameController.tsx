import { KYeezy } from '../main-character/KYeezyCharacter';
import { WizeGame } from '../WizeGame';
import { GameControllerBase, GameState } from './GameControllerBase';
import { util } from '../../util';
import { Door } from '../sprites/Door';
import { CreateStoryModeRooms } from './StoryModeRooms';
import { Room } from '../Room';

export class WizeStoryGameController extends GameControllerBase {
  rooms: Room[];

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
    this.rooms = CreateStoryModeRooms();

    this.game = new WizeGame(this.baseOptions, this.rooms[0], this.character);
    this.character.setCurrentPlatform(this.game.room.platforms[0]);
    this.character.setPosition(this.game.room.platforms[0].x, this.character.y);
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
        break;
      default:
    }
  }

  getOverlappingDoor(): Door {
    let overlappedDoor = null;

    this.game.room.doors.forEach((door) => {
      if (util.doRectangleArraysOverlap(door.hitBoxes, this.character.hurtBoxes)) {
        overlappedDoor = door;
      }
    });

    return overlappedDoor;
  }
}
