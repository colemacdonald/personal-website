import WizeGame from "../WizeGame";
import { KYeezy } from "../sprites/KYeezyCharacter";
import { RoomGenerator } from "../RoomGenerator";
import { ControllableCharacter } from "../sprites/ControllableCharacter";
import { GameControllerBase, GameState } from "./GameControllerBase"

class RandomWizeGameController extends GameControllerBase {
    
    character: ControllableCharacter;
    game: WizeGame;

    newGame() {
        this.gameState = GameState.Playing;
        this.level = 0;

        let room = RoomGenerator.generateRandomRoom(this.baseOptions);
        this.character = new KYeezy({});

        this.game = new WizeGame(this.baseOptions, room, this.character);
        this.character.setPosition(this.baseOptions.safeBox.x + this.baseOptions.safeBox.w/2, this.baseOptions.safeBox.y + this.baseOptions.safeBox.h/2);
        this.character.setGame(this.game);
    }

    incrementGameDifficulty() {
        if (this.game) delete this.game;

        this.baseOptions.monsterSpeed += 0.5;
        this.baseOptions.numberOfMonsters += 2;

        this.level++;

        let room = RoomGenerator.generateRandomRoom(this.baseOptions);

        this.game = new WizeGame(this.baseOptions, room, this.character);
        this.character.setPosition(this.baseOptions.safeBox.x + this.baseOptions.safeBox.w/2, this.baseOptions.safeBox.y + this.baseOptions.safeBox.h/2);
        this.character.setGame(this.game);
    }

    tick() {
        super.tick();

        // check for death
        if (!this.game.playerAlive) {
            this.gameState = GameState.Over;
            return;
        }

        if (this.game.score === 200) {
            this.incrementGameDifficulty();
        }
    }
}

export { RandomWizeGameController };