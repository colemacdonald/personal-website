import React, { Component } from "react";
import { WizeStoryGameController } from "../game/controllers/WizeStoryGameController"
import { util } from "../util";
import { GameControllerBase, GameState } from "../game/controllers/GameControllerBase";
import { WizeSurvivalGameController } from "../game/controllers/WizeSurvivalGameController";
import { RoomBackgroundTheme } from "../game/tiles/RoomThemes";
import { KYeezyHealthIcon } from "../game/main-character/KYeezyFrames";

// TODO: Separate view from game controller logic
class WizeGameComponent extends Component {
    viewportH: number;
    viewportW: number;
    viewportY: number;
    viewportX: number;
    canvasScale: number;

    showHitboxes: boolean = false;

    canvas: any;
    cntx: any;
    audio: any;
    currentAudioSrc: string;
    audioPlayed: boolean = false;
    unPauseFrame: number = 0;

    gameController: GameControllerBase;

    gameMode: string = "story";

    level: number;
    frameCount: number;

    interval: NodeJS.Timer;

    minimapColours = {
        background: "green",
        platforms: "brown",
        monsters: "red",
        doors: "black",
        damageZones: "redorange",
        character: "blue",
        coins: "gold"
    }

    messageBoxStyle = {
        backgroundColour: "#585858",
        borderColour: "gold",
        textColour: "gold",
        headerFont: "30px Arial",
        bodyFont: "20px Arial",
        padding: 30
    }

    constructor(props) {
        super(props);

        this.viewportH = props.viewportH;
        this.viewportW = props.viewportW;
        this.viewportY = props.viewportY;
        this.viewportX = props.viewportX;

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
        if (this.gameController.character.healthPoints > 0) {
            this.frameCount++;
        }

        // player just got a power, will pause to display the information.
        if (this.gameController.game.lastPowerup) {
            
            // first frame after grabbing powerup
            if (this.unPauseFrame === 0) {
                this.drawMessage(this.gameController.game.lastPowerup.name + " acquired!", this.gameController.game.lastPowerup.instructions);
                this.unPauseFrame = this.frameCount + this.gameController.game.lastPowerup.pauseDuration;
            }

            if (this.frameCount < this.unPauseFrame) {
                return;
            } else {
                this.unPauseFrame = 0;
            }
        }


        // update game
        this.gameController.tick();
        if (this.gameController.gameState === GameState.Over) {
            if (this.interval) window.clearInterval(this.interval);
        }

        // update music if necessary
        if (this.currentAudioSrc !== this.gameController.game.room.backgroundTheme.backgroundMusic) {
            this.audio.current.src = this.gameController.game.room.backgroundTheme.backgroundMusic;
            this.currentAudioSrc = this.gameController.game.room.backgroundTheme.backgroundMusic;           
        }

        // draw
        this.updateViewport();
        this.drawGame();
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
                <div className="horizontal-flex-box">
                    <audio ref={this.audio} autoPlay></audio>
                    <div className="horizontal-flex-box">
                        <h5>Game Mode:</h5>
                        <select onChange={this.gameModeChange.bind(this)}>
                            <option value="story">Story</option>
                            <option value="survival">Survival</option>
                        </select>
                    </div>
                    <input type="checkbox" onChange={this.showHitboxesChanged.bind(this)}/> Show Hit/Hurt Boxes
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
                        // default values though the canvas will autoscale
                        // this impacts the size of text something to do with the size of the background images?
                        // these values work since they were previous defaults - likely some hard coded values in
                        // this class dependent on these
                        // TODO: these values shouldn't matter
                        height={"1000px"}
                        width={"2000px"}
                    />
                </div>
            </div>
        );
    }

    gameModeChange(event) {
        this.gameMode = event.target.value;
    }

    showHitboxesChanged(event) {
        this.showHitboxes = event.target.checked;
    }

    startGame() {
        this.level = 0;
        this.frameCount = 0;

        if (this.gameMode === "survival") {
            this.gameController = new WizeSurvivalGameController();
        }
        else {
            this.gameController = new WizeStoryGameController();
        }

        this.gameController.newGame();

        this.viewportY = this.gameController.game.character.x - 100;
        this.viewportX = this.gameController.game.character.y - 100;

        this.cntx = this.canvas.current.getContext("2d");
        this.cntx.imageSmoothingEnabled = false;

        if (this.interval) window.clearInterval(this.interval);
        this.interval = setInterval(this.tick.bind(this), 1000 / this.gameController.game.gameOptions.fps);
    }

    drawMessage(header: string, body: string) {
        this.cntx.font = this.messageBoxStyle.headerFont;
        let headerDimensions = this.cntx.measureText(header);
        let hh = headerDimensions.actualBoundingBoxAscent - headerDimensions.actualBoundingBoxDescent;

        this.cntx.font = this.messageBoxStyle.bodyFont;
        let bodyDimensions = this.cntx.measureText(body);
        let bh = bodyDimensions.actualBoundingBoxAscent - headerDimensions.actualBoundingBoxDescent;

        let w = Math.max(headerDimensions.width, bodyDimensions.width) + this.messageBoxStyle.padding * 2;
        let h = hh + bh + this.messageBoxStyle.padding * 3;

        // don't like it but for speed drawRect will compensate...
        let centerX = this.canvas.current.width / 2;
        let centerY = this.canvas.current.height / 2;

        this.cntx.fillStyle = this.messageBoxStyle.backgroundColour;

        this.cntx.fillRect(centerX - w / 2, centerY - h / 2, w, h);
        this.cntx.strokeStyle = this.messageBoxStyle.borderColour;
        this.cntx.strokeRect(centerX - w / 2, centerY - h / 2, w, h);
        this.cntx.stokeStyle = "#00000000";

        this.cntx.fillStyle = this.messageBoxStyle.textColour;
        this.cntx.font = this.messageBoxStyle.headerFont;
        this.cntx.fillText(
            header,
            centerX - headerDimensions.width / 2,
            centerY - h / 2 + this.messageBoxStyle.padding + hh / 2
        );

        this.cntx.font = this.messageBoxStyle.bodyFont;
        this.cntx.fillText(
            body,
            centerX - bodyDimensions.width / 2,
            centerY - h / 2 + this.messageBoxStyle.padding * 2.5 + hh + bh / 2
        );
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
        } else if (room.backgroundTheme.backgroundTiles) {
            // Background Tiles
            for (let x = 0; x < room.w; x += w) {
                for (let y = 0; y < room.h; y += h) {
                    this.drawImage(room.getBackgroundThemeTile(x, y).img, { x: x, y: y, w: w, h: h })
                }
            }
        }

        // Fill in floor
        this.cntx.fillStyle = room.backgroundTheme.floorColour;
        this.cntx.fillRect(-room.w, (room.h - this.viewportY + 25) * this.canvasScale, room.w * w, 500);
        
        
        // Wall Tiles
        if (room.backgroundTheme.wallTiles) {
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
            if (room.hasCeiling) {
                for (let x = 0; x < room.w; x += w) {
                    this.drawImage(room.backgroundTheme.wallTiles.ceiling.img, {x: x, y: -w, w: w, h:h})
                }
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
        this.canvasScale = this.canvas.current.width / this.viewportW;

        this.drawBackground();

        this.drawBackgroundElements(false);

        // Draw platforms (which are currently coded to hav width of 50 that are >= 100)
        this.drawPlatforms();

        // Draw damage zones which are currently like platforms but apply the onHit effect to the character
        this.drawDamageZones();

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

        if (this.gameController.gameState === GameState.Over) {
            this.drawMessage("Game Over...", "Better luck next time.");
            return;
        }

        if (this.showHitboxes) {
            this.gameController.game.character.hurtBoxes.forEach(r => {
                this.drawRect("blue", r, 0.5);
            });
    
            this.gameController.game.character.hitBoxes.forEach(r => {
                this.drawRect("red", r, 0.5);
            });

            this.gameController.game.room.monsters.forEach(m => {
                m.hitBoxes.forEach(r => {
                    this.drawRect("red", r, 0.5);
                });
            });
        }

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

        // health
        for(let i = 0; i < this.gameController.character.healthPoints; i++) {
            this.cntx.drawImage(KYeezyHealthIcon.img, 10 + i * 30, 40, 21, 33);
        }
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
                // ---------------------- Top 
                // Left corner
                this.drawImage(theme.platformTiles.left.img, { x: plat.x, y: plat.y, w: w, h: h});

                // Middle tiles
                let i = 1;
                // Until we reach the right side
                while ((i + 1) * w < plat.w) {
                    this.drawImage(theme.platformTiles.center.img, { x: plat.x + w * i, y: plat.y, w: w, h: h });
                    i++;
                }
                // right corner
                this.drawImage(theme.platformTiles.right.img, { x: plat.x + plat.w - w, y: plat.y, w: w, h: h });

                // ---------------------  Fill
                let currentY = plat.y + h;
                while (currentY < plat.y + plat.h - h) {
                    this.drawImage(theme.platformTiles.leftSide.img, {x: plat.x, y: currentY, w: w, h: h});

                    i = 1;
                    // Until we reach the right side
                    while ((i + 1) * w < plat.w) {
                        this.drawImage(theme.platformTiles.fill.img, { x: plat.x + w * i, y: currentY, w: w, h: h });
                        i++;
                    }

                    this.drawImage(theme.platformTiles.rightSide.img, {x: plat.x + plat.w - w, y: currentY, w: w, h: h});

                    currentY += h;
                }

                // ---------------------  Bottom
                if (currentY < plat.y + plat.h) {
                    this.drawImage(theme.platformTiles.bottomLeft.img, {x: plat.x, y: currentY, w: w, h: h});

                    i = 1;
                    // Until we reach the right side
                    while ((i + 1) * w < plat.w) {
                        this.drawImage(theme.platformTiles.bottom.img, { x: plat.x + w * i, y: currentY, w: w, h: h });
                        i++;
                    }

                    this.drawImage(theme.platformTiles.bottomRight.img, {x: plat.x + plat.w - w, y: currentY, w: w, h: h});

                }

                

                
            }
        });
    }

    drawDamageZones() {
        let zones = this.gameController.game.room.damageZones;

        let theme = this.gameController.game.room.backgroundTheme;

        let h = 50;
        let w = 50;

        const period = 400;
        const maxShift = 4;
        let shift = this.frameCount % period / (period / (maxShift * 2));
        
        if (shift > maxShift) {
            shift = maxShift * 2 - shift;
        }

        
        zones.forEach(z => {
            // If visible
            if (this.isInView(z)) {
                // Left corner
                this.drawImage(theme.damageZoneTiles.left.img, { x: z.x, y: z.y, w: w + shift, h: h});

                // Middle tiles
                let i = 1;
                // Until we reach the right side
                while ((i + 1) * w < z.w) {
                    this.drawImage(theme.damageZoneTiles.center.img, { x: z.x  - shift + w * i, y: z.y, w: w, h: h });
                    i++;
                }

                this.drawImage(theme.damageZoneTiles.right.img, { x: z.x - shift + w * i, y: z.y, w: w + shift, h: h });
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
                this.drawImage(this.gameController.game.room.backgroundTheme.doorFrame.img, door.drawBox)
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
                this.drawImage(monster.getFrame().img, monster.drawBox);
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
            let coin = p.sprite;
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

    drawRect(colour: string, box: Rectangle, opacity: number = 1) {
        this.cntx.save();
        this.cntx.fillStyle = colour;
        this.cntx.globalAlpha = opacity;
        this.cntx.fillRect((box.x - this.viewportX) * this.canvasScale, (box.y - this.viewportY) * this.canvasScale, box.w * this.canvasScale, box.h * this.canvasScale);
        this.cntx.restore();
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
        this.drawMinimapDamageZones(minimapScale, minimap);
        this.drawMinimapDoors(minimapScale, minimap);
        this.drawMinimapCharacter(minimapScale, minimap);
        this.drawMinimapCoins(minimapScale, minimap);
        this.drawMinimapMonsters(minimapScale, minimap);

        this.cntx.restore();
    }

    drawMinimapPlatforms(scale, minimap) {
        this.cntx.fillStyle = this.minimapColours.platforms;

        this.drawOnMinimap(this.gameController.game.room.platforms, scale, minimap);
    }

    drawMinimapDamageZones(scale, minimap) {
        this.cntx.fillStyle = this.minimapColours.damageZones;

        this.drawOnMinimap(this.gameController.game.room.damageZones, scale, minimap);
    }

    drawMinimapDoors(scale, minimap) {
        this.cntx.fillStyle = this.minimapColours.doors;

        this.drawOnMinimap(this.gameController.game.room.doors.map(d => d.drawBox), scale, minimap);
    }

    drawMinimapCharacter(scale, minimap) {
        this.cntx.fillStyle = this.minimapColours.character;
        let c = this.gameController.game.character;

        this.drawOnMinimap([c], scale, minimap);
    }

    drawMinimapCoins(scale, minimap) {
        this.cntx.fillStyle = this.minimapColours.coins;

        this.drawOnMinimap(this.gameController.game.room.coins.map(c => c.drawBox), scale, minimap);
        this.drawOnMinimap(this.gameController.game.room.powerups.map(p => p.sprite.drawBox), scale, minimap);
    }

    drawMinimapMonsters(scale, minimap) {
        this.cntx.fillStyle = this.minimapColours.monsters;
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
            case 32:
                this.gameController.game.spaceRelease();
                break;
            default:
                break;
        }
    }
    keydown(e) {
        switch (e.keyCode) {
            case 37:
                this.gameController.game.leftPress();
                e.preventDefault();
                break;
            case 38:
                this.gameController.game.upPress();
                e.preventDefault();
                break;
            case 39:
                this.gameController.game.rightPress();
                e.preventDefault();
                break;
            case 40:
                this.gameController.game.downPress();
                e.preventDefault();
                break;
            // f - https://keycode.info/
            case 70:
                this.gameController.game.attackPress();
                break;
            case 32:
                this.gameController.game.spacePress();
                e.preventDefault();
                break;
            default:
                break;
        }
    }
}

export { WizeGameComponent };
