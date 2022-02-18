import WizeGame from "./WizeGame";
import { KYeezy } from "./sprites/KYeezyCharacter";
import LevelGenerator from "./LevelGenerator";

class WizeGameController {
    baseOptions = {
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

    startRandomGame() {
        this.gameOptions = {
            character: new KYeezy(),
            ...this.baseOptions
        };

        this.gameOptions.level = LevelGenerator.generateRandomLevel(this.gameOptions);
            
        this.game = new WizeGame(this.gameOptions);
        this.gameOptions.character.setPosition(this.gameOptions.safeBox.x + this.gameOptions.safeBox.w/2, this.gameOptions.safeBox.y + this.gameOptions.safeBox.h/2);
        this.gameOptions.character.setGame(this.game);
    }

    incrementGameDifficulty() {
        if (this.game) delete this.game;

        this.gameOptions.monsterSpeed += 0.5;
        this.gameOptions.numberOfMonsters += 2;


        this.game = new WizeGame(this.gameOptions);
        this.gameOptions.character.setPosition(this.gameOptions.safeBox.x + this.gameOptions.safeBox.w/2, this.gameOptions.safeBox.y + this.gameOptions.safeBox.h/2);
        this.gameOptions.character.setGame(this.game);

    }
}

export default WizeGameController;