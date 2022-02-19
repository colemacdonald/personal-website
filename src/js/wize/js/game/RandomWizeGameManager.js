import WizeGame from "./WizeGame";
import { KYeezy } from "./sprites/KYeezyCharacter";
import LevelGenerator from "./LevelGenerator";

class RandomWizeGameManager {
    constructor(baseOptions) {
        console.log("Constructed random manager.")
        this.gameOptions = {
            ...baseOptions
        };
    }

    startRandomGame() {
        let level = LevelGenerator.generateRandomLevel(this.gameOptions);
        this.character = new KYeezy();

        this.game = new WizeGame(this.gameOptions, level, this.character);
        this.character.setPosition(this.gameOptions.safeBox.x + this.gameOptions.safeBox.w/2, this.gameOptions.safeBox.y + this.gameOptions.safeBox.h/2);
        this.character.setGame(this.game);
    }

    incrementGameDifficulty() {
        if (this.game) delete this.game;

        this.gameOptions.monsterSpeed += 0.5;
        this.gameOptions.numberOfMonsters += 2;

        let level = LevelGenerator.generateRandomLevel(this.gameOptions);

        this.game = new WizeGame(this.gameOptions, level, this.character);
        this.character.setPosition(this.gameOptions.safeBox.x + this.gameOptions.safeBox.w/2, this.gameOptions.safeBox.y + this.gameOptions.safeBox.h/2);
        this.character.setGame(this.game);
    }
}

export default RandomWizeGameManager;