import { RoomGenerator } from "../RoomGenerator";
import { ControllableCharacter } from "../sprites/ControllableCharacter";
import { KYeezy } from "../sprites/KYeezyCharacter";
import { WizeGame } from "../WizeGame";


enum GameState {
    Loading,
    Playing,
    Over
}

class GameControllerBase {
    gameState: GameState = GameState.Playing;
    game: WizeGame;
    character: ControllableCharacter;
    level: number = 0;

    baseOptions: GameOptions = {
        fps: 60,
        speed: 3,
        coinMargin: 150,
        height: 1500,
        width: 2000,
        monsterSpeed: 2,
        numberOfMonsters: 20,
        grav: 0.5,
        safeBox: {
            x: 100,
            y: 1300,
            h: 400,
            w: 200
        }
    };

    newGame() {
        this.gameState = GameState.Playing;
        this.level = 0;

        this.baseOptions.monsterSpeed = 2;
        this.baseOptions.numberOfMonsters = 20;

        let room = RoomGenerator.generateRandomRoom(this.baseOptions);
        this.character = new KYeezy({});

        this.game = new WizeGame(this.baseOptions, room, this.character);
        this.character.setPosition(this.baseOptions.safeBox.x + this.baseOptions.safeBox.w/2, this.baseOptions.safeBox.y + this.baseOptions.safeBox.h/2);
        this.character.setGame(this.game);
    }

    tick() {
        // update the game a single frame
        this.game.update();
    }
}

export { GameControllerBase, GameState };