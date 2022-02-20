import WizeGame from "../WizeGame";
import { KYeezy } from "../main-character/KYeezyCharacter";
import { RoomBuilder } from "../RoomBuilder";
import { GameControllerBase, GameState } from "./GameControllerBase"

class RandomWizeGameController extends GameControllerBase {
    newGame() {
        this.gameState = GameState.Playing;
        this.level = 0;

        this.baseOptions.monsterSpeed = 2;
        this.baseOptions.numberOfMonsters = 20;

        let room = RoomBuilder.buildRandomRoom(this.baseOptions);
        this.character = new KYeezy({});

        this.game = new WizeGame(this.baseOptions, room, this.character);
        this.character.setPosition(this.baseOptions.safeBox.x + this.baseOptions.safeBox.w / 2, this.baseOptions.safeBox.y + this.baseOptions.safeBox.h / 2);
        this.character.setGame(this.game);
    }

    incrementGameDifficulty() {
        if (this.game) delete this.game;

        this.level++;

        this.baseOptions.monsterSpeed = 2 + this.level * 1;
        this.baseOptions.numberOfMonsters = 20 + this.level * 2;

        let room = RoomBuilder.buildRandomRoom(this.baseOptions);

        this.game = new WizeGame(this.baseOptions, room, this.character);
        this.character.setPosition(this.baseOptions.safeBox.x + this.baseOptions.safeBox.w / 2, this.baseOptions.safeBox.y + this.baseOptions.safeBox.h / 2);
        this.character.setGame(this.game);
    }

    tick() {
        super.tick();

        // check for death
        if (!this.game.playerAlive) {
            this.gameState = GameState.Over;
            return;
        }

        if (this.game.score === 2000) {
            this.incrementGameDifficulty();
        }
    }
}

export { RandomWizeGameController };