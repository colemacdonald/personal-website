import RandomWizeGameManager from "./RandomWizeGameManager";

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
    
    randomGameManager: RandomWizeGameManager;

    constructor() {
        this.randomGameManager = new RandomWizeGameManager(this.baseOptions);
    }

    getCurrentGame() {
        return this.randomGameManager.game;
    }

    /*
     Main game update method that signals a frame
     */
    tick() {
        this.getCurrentGame().update();
    }

    startRandomGame() {
        this.randomGameManager.startRandomGame();
    }

    incrementGameDifficulty() {
        this.randomGameManager.incrementGameDifficulty();
    }
}

export default WizeGameController;