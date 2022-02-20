import { ControllableCharacter } from "../main-character/ControllableCharacter";
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
    message: string = "";

    baseOptions: GameOptions = {
        fps: 60,
        speed: 3,
        coinMargin: 150,
        height: 1500,
        width: 2000,
        monsterSpeed: 2,
        numberOfMonsters: 20,
        grav: 0.5,
        snapToPlatforms: true,
        safeBox: {
            x: 100,
            y: 1300,
            h: 400,
            w: 200
        }
    };

    newGame() { }

    tick() {
        // update the game a single frame
        this.game.update();
    }
}

export { GameControllerBase, GameState };