import React, { Component } from "react";
import { TILES } from "../game/tiles/PlatformTiles";
import { WizeGameController } from "../game/controllers/WizeGameController"
import { util } from "../util";
import { GameControllerBase, GameState } from "../game/controllers/GameControllerBase";
import { RandomWizeGameController } from "../game/controllers/RandomWizeGameController";

// TODO: Separate view from game controller logic
class WizeGameComponent extends Component {
    viewportH: number;
    viewportW: number;
    viewportY: number;
    viewportX: number;
    canvasScale: number;

    canvas: any;
    cntx: any;

    gameController: GameControllerBase;

    gameMode: string = "story";

    level: number;
    frameCount: number;

    interval: NodeJS.Timer;

    constructor(props) {
        super(props);

        // TODO: separate canvas size from viewportH / allow scaling
        this.viewportH = props.viewportH;
        this.viewportW = props.viewportW;
        this.viewportY = props.viewportY;
        this.viewportX = props.viewportX;
        this.canvasScale = props.canvasScale;

        this.canvas = React.createRef();

        this.gameController = props.gameController;

        this.level = 0;
        this.frameCount = 0;
    }

    /*
   * To be called at the frame rate.
   */
    tick() {
        this.gameController.tick();
        if (this.gameController.gameState === GameState.Over) {
            if (this.interval) window.clearInterval(this.interval);
        }

        this.updateViewport();
        this.drawGame();
        if (this.gameController.game.playerAlive) {
            this.frameCount++;
        }

        if (this.gameController.game.lastPowerup) {
            if (this.interval) window.clearInterval(this.interval);

            this.interval = setInterval(this.tick.bind(this), 1000 / this.gameController.game.gameOptions.fps);
        }
    }

    componentDidMount() {
        document.addEventListener("keyup", this.keyup.bind(this));
        document.addEventListener("keydown", this.keydown.bind(this));
        this.startGame();
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
        document.removeEventListener("keyup", this.keyup);
        document.removeEventListener("keydown", this.keydown);
    }

    render() {
        return (
            <div className="flex-item">
                <div className="flex-item">
                    <h2>Game Mode:</h2>
                    <select onChange={this.gameModeChange.bind(this)}>
                        <option value="survival">Survival</option>
                        <option value="story">Story</option>
                    </select>
                    <br/><br/>
                    <button
                        onClick={() => {
                            this.startGame();
                        }}
                    >
                        Start Again
                    </button>
                </div>
                <div className="wize-game">
                    <canvas
                        ref={this.canvas}
                        className="game-canvas"
                        height={`${this.viewportH * this.canvasScale}px`}
                        width={`${this.viewportW * this.canvasScale}px`}
                    />
                </div>
            </div>
        );
    }

    gameModeChange(event) {
        this.gameMode = event.target.value;
    }

    startGame() {
        this.level = 0;
        this.frameCount = 0;

        if (this.gameMode === "survival") {
            this.gameController = new RandomWizeGameController();
        }
        else {
            this.gameController = new WizeGameController();
        }

        this.gameController.newGame();

        this.viewportY = this.gameController.game.character.x - 100;
        this.viewportX = this.gameController.game.character.y - 100;

        this.cntx = this.canvas.current.getContext("2d");
        this.cntx.imageSmoothingEnabled = false;

        if (this.interval) window.clearInterval(this.interval);
        this.interval = setInterval(this.tick.bind(this), 1000 / this.gameController.game.gameOptions.fps);
    }

    drawBackground() {
        this.cntx.clearRect(
            0,
            0,
            this.canvas.current.width,
            this.canvas.current.height
        );


        // Background
        this.cntx.fillStyle = "#302c2e";
        this.cntx.fillRect(
            0,
            0,
            this.canvas.current.width,
            this.canvas.current.height
        );

        // this.cntx.drawImage(this.gameController.game.room.background.getFrame().img, 0, 0, this.canvas.current.width, this.canvas.current.height);


        // Room Background
        this.cntx.fillStyle = "#33beff";
        this.cntx.fillRect(
            0,
            0 - this.viewportY * this.canvasScale,
            this.canvas.current.width,
            this.gameController.game.room.h * this.canvasScale
        );
    }

    isInView(box: Rectangle): boolean {
        return util.doRectanglesOverlap(this.viewportX, this.viewportY, this.viewportH, this.viewportW, box.x, box.y, box.h, box.w);
    }

    /*
     * Calls various draw functions in order
     */
    drawGame() {
        if (this.gameController.gameState === GameState.Over) {
            this.drawBackground();
            this.cntx.fillStyle = "red";
            this.cntx.font = "30px Arial";
            this.cntx.fillText(
                "Game Over...",
                this.viewportW / 2 - 75,
                this.viewportH / 2
            );
            this.drawScore();
            return;
        }

        this.drawBackground();

        this.drawBackgroundElements(false);

        // Draw platforms (which are currently coded to hav width of 50 that are >= 100)
        this.drawPlatforms();

        this.drawBackgroundElements(true);

        // Draw doors
        this.drawDoors();

        // Monsters
        this.drawMonsters();

        // Coins
        this.drawCoins();

        // Player
        this.drawPlayer();

        // Score
        this.drawScore();

        // Mini Map
        this.drawMinimap();

        this.cntx.fillStyle = "gold";
        this.cntx.fillText(this.gameController.message, this.canvas.current.width / 2 - 50, this.canvas.current.height / 2);
    }

    drawScore() {
        this.cntx.fillStyle = "red";
        this.cntx.font = "30px Arial";
        this.cntx.fillText(
            "Level: " +
            this.gameController.level +
            " Score: " +
            this.gameController.game.score +
            " (" +
            Math.floor(this.frameCount / this.gameController.game.gameOptions.fps) +
            "s)",
            10,
            30
        );
    }

    /*
     * Draws each platform that exists inside the viewport at its position offset the viewport
     */
    drawPlatforms() {
        var plats = this.gameController.game.room.platforms;

        plats.forEach(plat => {
            // If visible
            if (this.isInView(plat)) {
                // Left corner
                this.drawImage(TILES.leftImg, { x: plat.x, y: plat.y, w: TILES.w, h: TILES.h });

                // Middle tiles
                let i = 1;
                // Until we reach the right side
                while ((i + 1) * TILES.w < plat.w) {
                    this.drawImage(TILES.centerImg, { x: plat.x + TILES.w * i, y: plat.y, w: TILES.w, h: TILES.h });
                    i++;
                }

                this.drawImage(TILES.rightImg, { x: plat.x + TILES.w * i, y: plat.y, w: TILES.w, h: TILES.h });
            }
        });
    }

    drawBackgroundElements(inFrontOfPlatformsFlag) {
        // Background Elements
        this.gameController.game.room.backgroundElements.forEach(e => {
            if (e.inFrontOfPlatforms === inFrontOfPlatformsFlag) {
                this.drawImage(e.getFrame().img, e.box);
            }
        });
    }

    drawDoors() {
        let doors = this.gameController.game.room.doors;

        doors.forEach(door => {
            if (this.isInView(door.box)) {
                this.drawImage(door.getFrame().img, door.box)
            }
        });
    }

    /*
     * Draws each monster that exists inside the viewport at its position offset the viewport
     */
    drawMonsters() {
        let monsters = this.gameController.game.room.monsters;

        monsters.forEach(monster => {
            if (this.isInView(monster)) {
                this.drawImage(monster.getFrame().img, monster.box);
            }
        });
    }

    /*
     * Draws each coin that exists inside the viewport at its position offset the viewport
     */
    drawCoins() {
        this.cntx.fillStyle = "yellow";

        this.gameController.game.room.coins.forEach(c => {
            if (this.isInView(c.box)) {
                this.drawImage(c.getFrame().img, c.box);
            }
        }, this);

        this.gameController.game.room.powerups.forEach(p => {
            let coin = p.coin;
            if (this.isInView(coin.box)) {
                this.drawImage(coin.getFrame().img, coin.box);
            }
        }, this);
    }

    /*
     * Draws the player at its position offset the viewport
     */
    drawPlayer() {
        let c = this.gameController.game.character,
            img = c.getFrame().img;

        this.drawImage(img, c.box);
    }

    drawImage(img: any, box: Rectangle) {
        this.cntx.drawImage(img,
            (box.x - this.viewportX) * this.canvasScale,
            (box.y - this.viewportY) * this.canvasScale,
            box.w * this.canvasScale,
            box.h * this.canvasScale)
    }

    drawMinimap() {
        let minimapScale = 0.09;

        let minimap = {
            y: 10,
            w: this.gameController.game.room.w * minimapScale,
            h: this.gameController.game.room.h * minimapScale,
            x: 0
        };
        minimap.x = (this.viewportW - minimap.w - 10);

        this.cntx.save();
        this.cntx.globalAlpha = 0.55;
        this.cntx.fillStyle = "green";
        this.cntx.fillRect(minimap.x * this.canvasScale, minimap.y * this.canvasScale, minimap.w * this.canvasScale, minimap.h * this.canvasScale);


        this.drawMinimapPlatforms(minimapScale, minimap);
        this.drawMinimapDoors(minimapScale, minimap);
        this.drawMinimapCharacter(minimapScale, minimap);
        this.drawMinimapCoins(minimapScale, minimap);
        this.drawMinimapMonsters(minimapScale, minimap);

        this.cntx.restore();
    }

    drawMinimapPlatforms(scale, minimap) {
        this.cntx.fillStyle = "brown";

        this.drawOnMinimap(this.gameController.game.room.platforms, scale, minimap);
    }

    drawMinimapDoors(scale, minimap) {
        this.cntx.fillStyle = "black";

        this.drawOnMinimap(this.gameController.game.room.doors.map(d => d.box), scale, minimap);
    }

    drawMinimapCharacter(scale, minimap) {
        this.cntx.fillStyle = "blue";
        let c = this.gameController.game.character;

        this.drawOnMinimap([c], scale, minimap);
    }

    drawMinimapCoins(scale, minimap) {
        this.cntx.fillStyle = "gold";

        this.drawOnMinimap(this.gameController.game.room.coins.map(c => c.box), scale, minimap);
        this.drawOnMinimap(this.gameController.game.room.powerups.map(p => p.coin.box), scale, minimap);
    }

    drawMinimapMonsters(scale, minimap) {
        this.cntx.fillStyle = "red";
        this.drawOnMinimap(this.gameController.game.room.monsters, scale, minimap);
    }

    drawOnMinimap(rects, scale, minimap) {
        rects.forEach((r) => {

            // we might want things drawn outside of the room in the main game but we won't on the minimap
            let trimmedToRoom = {
                x: Math.max(r.x, 0),
                y: Math.min(r.y, this.gameController.game.room.h),
                w: r.w,
                h: r.h
            };

            trimmedToRoom.w = Math.min(trimmedToRoom.w, this.gameController.game.room.w - trimmedToRoom.x);
            // allow the floor
            trimmedToRoom.h = Math.min(trimmedToRoom.h, this.gameController.game.room.h - trimmedToRoom.y + 50);

            this.cntx.fillRect(
                (minimap.x + (trimmedToRoom.x / this.gameController.game.room.w) * minimap.w) * this.canvasScale,
                (minimap.y + (trimmedToRoom.y / this.gameController.game.room.h) * minimap.h) * this.canvasScale,
                trimmedToRoom.w * scale * this.canvasScale,
                trimmedToRoom.h * scale * this.canvasScale);
        });
    }

    /*
     * Update the viewport if the character gets too close to the edge
     */
    updateViewport() {
        let c = this.gameController.game.character;
        if (c.x < this.viewportX + 0.3 * this.viewportW) {
            this.viewportX = c.x - 0.3 * this.viewportW;
        } else if (c.x > this.viewportX + 0.7 * this.viewportW) {
            this.viewportX = c.x - 0.7 * this.viewportW;
        }

        if (c.y < this.viewportY + 0.35 * this.viewportH) {
            this.viewportY = c.y - 0.35 * this.viewportH;
        } else if (c.y > this.viewportY + 0.65 * this.viewportH) {
            this.viewportY = c.y - 0.65 * this.viewportH;
        }
    }

    /**
     * EVENTS
     */
    keyup(e) {
        switch (e.keyCode) {
            case 37:
                this.gameController.game.leftRelease();
                break;
            case 38:
                this.gameController.game.upRelease();
                break;
            case 39:
                this.gameController.game.rightRelease();
                break;
            case 40:
                this.gameController.game.downRelease();
                break;
            default:
                break;
        }
    }
    keydown(e) {
        switch (e.keyCode) {
            case 37:
                this.gameController.game.leftPress();
                break;
            case 38:
                this.gameController.game.upPress();
                break;
            case 39:
                this.gameController.game.rightPress();
                break;
            case 40:
                this.gameController.game.downPress();
                break;
            default:
                break;
        }
    }
}

export { WizeGameComponent };
