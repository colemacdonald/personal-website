import React, { Component } from "react";
import { WizeGameController } from "../game/controllers/WizeGameController"
import { util } from "../util";
import { GameControllerBase, GameState } from "../game/controllers/GameControllerBase";
import { RandomWizeGameController } from "../game/controllers/RandomWizeGameController";
import { RoomBackgroundTheme } from "../game/tiles/RoomThemes";

// TODO: Separate view from game controller logic
class WizeGameComponent extends Component {
    viewportH: number;
    viewportW: number;
    viewportY: number;
    viewportX: number;
    canvasScale: number;

    canvas: any;
    cntx: any;
    audio: any;
    currentAudioSrc: string;
    audioPlayed: boolean = false;

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
        this.audio = React.createRef();

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

        // update music if necessary
        if (this.currentAudioSrc !== this.gameController.game.room.backgroundTheme.backgroundMusic) {
            this.audio.current.src = this.gameController.game.room.backgroundTheme.backgroundMusic;
            this.currentAudioSrc = this.gameController.game.room.backgroundTheme.backgroundMusic;           
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
        this.audio.current.oncanplaythrough = (event) => { 
            this.audio.current.loop = true; 
            this.audio.current.autoPlay = true; 
        };
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
                    <audio ref={this.audio} autoPlay></audio>
                    <h2>Game Mode:</h2>
                    <select onChange={this.gameModeChange.bind(this)}>
                        <option value="story">Story</option>
                        <option value="survival">Survival</option>
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
        this.cntx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);

        let w = 50;
        let h = 50;

        let room = this.gameController.game.room;
        let verticalRoom = room.h > room.w;
        let backgroundImage = verticalRoom ? room.backgroundTheme.verticalBackgroundImage : room.backgroundTheme.horizontalBackgroundImage;

        // Background Colour to infinity
        this.cntx.fillStyle = room.backgroundTheme.primaryColour;
        this.cntx.fillRect(0, 0, this.canvas.current.width, this.canvas.current.height);

        // background image
        if (backgroundImage) {
            let img = backgroundImage.img;

            let imgScale = Math.min(room.w / img.width, room.h / img.height);

            // tiles default to 50/50 and we want just enough to clip into the wall tiles
            let margin = 15 * this.canvasScale;

            let i = -margin;

            while (i < (verticalRoom ? room.h : room.w)) {
                this.drawImage(img, {
                        x: verticalRoom ? -margin : i,
                        y: verticalRoom ? i : -margin, 
                        w: verticalRoom ? room.w + margin * 2 : img.width * imgScale, 
                        h: verticalRoom ? img.height * imgScale : room.h + margin * 2
                    });

                i += (verticalRoom ? img.height : img.width) * imgScale;
            }

            // Cover overhanging background image
            this.cntx.fillStyle = room.backgroundTheme.primaryColour;

            this.cntx.fillRect((room.w - this.viewportX) * this.canvasScale + margin, 0, this.canvas.current.width, this.canvas.current.height);
        }

        // Fill in floor
        this.cntx.fillStyle = room.backgroundTheme.floorColour;
        this.cntx.fillRect(-room.w, (room.h - this.viewportY + 25) * this.canvasScale, room.w * w, 500);
        
        if (room.backgroundTheme.key !== RoomBackgroundTheme.Empty) {
            
            if (!backgroundImage) {
                // Background Tiles
                for (let x = 0; x < room.w; x += w) {
                    for (let y = 0; y < room.h; y += h) {
                        this.drawImage(room.getBackgroundThemeTile(x, y).img, { x: x, y: y, w: w, h: h })
                    }
                }
            }
            
            // Wall Tiles
            // Left
            this.drawImage(room.backgroundTheme.wallTiles.topLeft.img, {x: -w , y: -h, h: h, w: w})
            for (let y = 0; y < room.h; y += h) {
                this.drawImage(room.backgroundTheme.wallTiles.left.img, {x: -w, y: y, h: h, w: w});
            }
            this.drawImage(room.backgroundTheme.wallTiles.bottomLeft.img, {x: -w, y: room.h, h: h, w: w});
        
            // Right
            this.drawImage(room.backgroundTheme.wallTiles.topRight.img, {x: room.w , y: -h, h: h, w: w})
            for (let y = 0; y < room.h; y += h) {
                this.drawImage(room.backgroundTheme.wallTiles.right.img, {x: room.w, y: y, h: h, w: w});
            }
            this.drawImage(room.backgroundTheme.wallTiles.bottomRight.img, {x: room.w, y: room.h, h: h, w: w});

            // Ceiling
            for (let x = 0; x < room.w; x += w) {
                this.drawImage(room.backgroundTheme.wallTiles.ceiling.img, {x: x, y: -w, w: w, h:h})
            }
        }
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
        let plats = this.gameController.game.room.platforms;

        let theme = this.gameController.game.room.backgroundTheme;

        let h = 50;
        let w = 50;

        plats.forEach(plat => {
            // If visible
            if (this.isInView(plat)) {
                // Left corner
                this.drawImage(theme.platformTiles.left.img, { x: plat.x, y: plat.y, w: w, h: h});

                // Middle tiles
                let i = 1;
                // Until we reach the right side
                while ((i + 1) * w < plat.w) {
                    this.drawImage(theme.platformTiles.center.img, { x: plat.x + w * i, y: plat.y, w: w, h: h });
                    i++;
                }

                this.drawImage(theme.platformTiles.right.img, { x: plat.x + w * i, y: plat.y, w: w, h: h });
            }
        });
    }

    drawBackgroundElements(inFrontOfPlatformsFlag) {
        // Background Elements
        this.gameController.game.room.backgroundElements.forEach(e => {
            if (e.inFrontOfPlatforms === inFrontOfPlatformsFlag) {
                this.drawImage(e.getFrame().img, e.drawBox);
            }
        });
    }

    drawDoors() {
        let doors = this.gameController.game.room.doors;

        doors.forEach(door => {
            if (this.isInView(door.drawBox)) {
                this.drawImage(door.getFrame().img, door.drawBox)
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
            if (this.isInView(c.drawBox)) {
                this.drawImage(c.getFrame().img, c.drawBox);
            }
        }, this);

        this.gameController.game.room.powerups.forEach(p => {
            let coin = p.coin;
            if (this.isInView(coin.drawBox)) {
                this.drawImage(coin.getFrame().img, coin.drawBox);
            }
        }, this);
    }

    /*
     * Draws the player at its position offset the viewport
     */
    drawPlayer() {
        let c = this.gameController.game.character,
            img = c.getFrame().img;

        this.drawImage(img, c.drawBox);
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

        this.drawOnMinimap(this.gameController.game.room.doors.map(d => d.drawBox), scale, minimap);
    }

    drawMinimapCharacter(scale, minimap) {
        this.cntx.fillStyle = "blue";
        let c = this.gameController.game.character;

        this.drawOnMinimap([c], scale, minimap);
    }

    drawMinimapCoins(scale, minimap) {
        this.cntx.fillStyle = "gold";

        this.drawOnMinimap(this.gameController.game.room.coins.map(c => c.drawBox), scale, minimap);
        this.drawOnMinimap(this.gameController.game.room.powerups.map(p => p.coin.drawBox), scale, minimap);
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
