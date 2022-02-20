import React, { Component } from "react";
import { TILES } from "../frames/PlatformTiles";
import { WizeGameController } from "../game/controllers/WizeGameController"
import { util } from "../util.js";
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

  level: number;
  frameCount: number;

  interval: NodeJS.Timer;

  platformImages: {
    left: any,
    center: any,
    right: any
  };
  

  constructor(props) {
    super(props);

    // TODO: separate canvas size from viewportH / allow scaling
    this.viewportH = props.viewportH;
    this.viewportW = props.viewportW;
    this.viewportY = props.viewportY;
    this.viewportX = props.viewportX;
    this.canvasScale = props.canvasScale;

    this.canvas = React.createRef();

    this.bootstrapPlatformImages();

    this.gameController = props.gameController;

    this.level = 0;
    this.frameCount = 0;
  }

    /*
   * To be called at the frame rate.
   */
  update() {
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

        

        this.interval = setInterval(this.update.bind(this), 1000 / this.gameController.game.gameOptions.fps);
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
        <button
          onClick={() => {
            this.startGame();
          }}
        >
          Start Again
        </button>
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

  startGame() {
    this.level = 0;
    this.frameCount = 0;

    this.gameController.newGame();

    this.viewportY = this.gameController.game.character.x - 100;
    this.viewportX = this.gameController.game.character.y - 100;

    this.cntx = this.canvas.current.getContext("2d");
    this.cntx.imageSmoothingEnabled = false;

    if (this.interval) window.clearInterval(this.interval);
    this.interval = setInterval(this.update.bind(this), 1000 / this.gameController.game.gameOptions.fps);
  }

  drawBackground() {
    this.cntx.clearRect(
      0,
      0,
      this.canvas.current.width,
      this.canvas.current.height
    );

    // Background
    this.cntx.fillStyle = "black";
    this.cntx.fillRect(
      0,
      0,
      this.canvas.current.width,
      this.canvas.current.height
    );

    // Room Background
    this.cntx.fillStyle = "#33beff";
    this.cntx.fillRect(
      0 - this.viewportX * this.canvasScale,
      0 - this.viewportY * this.canvasScale,
      this.gameController.game.room.w * this.canvasScale,
      this.gameController.game.room.h * this.canvasScale
    );
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

    // Draw platforms (which are currently coded to hav width of 50 that are >= 100)
    this.drawPlatforms();

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
      if (
        util.doRectanglesOverlap(
          this.viewportX,
          this.viewportY,
          this.viewportH,
          this.viewportW,
          plat.x,
          plat.y,
          plat.h,
          plat.w
        )
      ) {
        // Left corner
        this.cntx.drawImage(
          this.platformImages.left,
        (plat.x - this.viewportX) * this.canvasScale,
          (plat.y - this.viewportY) * this.canvasScale,
          TILES.w * this.canvasScale,
          TILES.h * this.canvasScale
        );

        // Middle tiles

        var i = 1;
        // Until we reach the right side
        while ((i + 1) * TILES.w < plat.w) {
          this.cntx.drawImage(
            this.platformImages.center,
            (plat.x + TILES.w * i - this.viewportX) * this.canvasScale,
            (plat.y - this.viewportY) * this.canvasScale,
            TILES.w * this.canvasScale,
            TILES.h * this.canvasScale
          );

          i++;
        }

        // Right corner
        this.cntx.drawImage(
          this.platformImages.right,
          (plat.x + TILES.w * i - this.viewportX) * this.canvasScale,
          (plat.y - this.viewportY) * this.canvasScale,
          TILES.w * this.canvasScale,
          TILES.h * this.canvasScale
        );
      }
    });
  }

  drawDoors() {
    let doors = this.gameController.game.room.doors;

    this.cntx.fillStyle = "grey";

    doors.forEach(door => {
      if (
        util.doRectanglesOverlap(
          this.viewportX,
          this.viewportY,
          this.viewportH,
          this.viewportW,
          door.x,
          door.y,
          door.h,
          door.w
        )
      ) {
        this.cntx.fillRect(
          (door.x - this.viewportX) * this.canvasScale,
          (door.y - this.viewportY) * this.canvasScale,
          door.w * this.canvasScale,
          door.h * this.canvasScale
        );
      }
    });
  }

  /*
   * Draws each monster that exists inside the viewport at its position offset the viewport
   */
  drawMonsters() {
    let monsters = this.gameController.game.room.monsters;

    this.cntx.fillStyle = "brown";

    monsters.forEach(monster => {
      if (
        util.doRectanglesOverlap(
          this.viewportX,
          this.viewportY,
          this.viewportH,
          this.viewportW,
          monster.x,
          monster.y,
          monster.h,
          monster.w
        )
      ) {
        this.cntx.fillRect(
          (monster.x - this.viewportX) * this.canvasScale,
          (monster.y - this.viewportY) * this.canvasScale,
          monster.w * this.canvasScale,
          monster.h * this.canvasScale
        );
      }
    });
  }

  /*
   * Draws each coin that exists inside the viewport at its position offset the viewport
   */
  drawCoins() {
    this.cntx.fillStyle = "yellow";

    this.gameController.game.room.powerups.forEach(p => {
        let coin = p.coin;
      if (
        util.doRectanglesOverlap(
          this.viewportX,
          this.viewportY,
          this.viewportH,
          this.viewportW,
          coin.box.x,
          coin.box.y,
          coin.box.h,
          coin.box.w
        )
      ) {
        var img = coin.getNextFrame();

        this.cntx.drawImage(
          img,
          (coin.box.x - this.viewportX) * this.canvasScale,
          (coin.box.y - this.viewportY) * this.canvasScale,
          coin.box.h * this.canvasScale,
          coin.box.w * this.canvasScale
        );
      }
    }, this);
  }

  /*
   * Draws the player at its position offset the viewport
   */
  drawPlayer() {
    let c = this.gameController.game.character,
      frame = c.getFrame();
    // drawImage(img, x, y, w, h)

    this.cntx.drawImage(
      frame.img,
      (c.x - this.viewportX + frame.x_offset) * this.canvasScale,
      (c.y - this.viewportY) * this.canvasScale,
      (c.w + frame.width_extend) * this.canvasScale,
      c.h * this.canvasScale
    );
    

    // this.cntx.fillStyle = 'purple';
    // this.cntx.fillRect(c.x - this.viewportX, c.y - this.viewportY, c.w, c.h);
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

    this.drawOnMinimap(this.gameController.game.room.doors, scale, minimap);
  }

  drawMinimapCharacter(scale, minimap) {
    this.cntx.fillStyle = "blue";
    let c = this.gameController.game.character;

    this.drawOnMinimap([c], scale, minimap);
  }

  drawMinimapCoins(scale, minimap) {
    this.cntx.fillStyle = "gold";

    this.drawOnMinimap(this.gameController.game.room.coins.map(c => { return { x: c.x - c.r/2, y: c.y - c.r/2, h: c.r*2, w: c.r*2}}), scale, minimap);
    this.drawOnMinimap(this.gameController.game.room.powerups.map(p => {return { x: p.coin.x - p.coin.r/2, y: p.coin.y - p.coin.r/2, h: p.coin.r*2, w: p.coin.r*2 }}), scale, minimap);
  }

  drawMinimapMonsters(scale, minimap) {
    this.cntx.fillStyle = "red";
    this.drawOnMinimap(this.gameController.game.room.monsters, scale, minimap);
  }

  drawOnMinimap(rects, scale, minimap) {
    rects.forEach((r) => {
      this.cntx.fillRect(
        (minimap.x + (r.x / this.gameController.game.room.w) * minimap.w) * this.canvasScale,
        (minimap.y + (r.y / this.gameController.game.room.h) * minimap.h) * this.canvasScale,
        r.w * scale * this.canvasScale,
        r.h * scale * this.canvasScale
      );
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

  bootstrapPlatformImages() {
    const left = new Image(),
      right = new Image(),
      center = new Image();

    left.src = TILES.grass_left;
    right.src = TILES.grass_right;
    center.src = TILES.grass_mid;

    this.platformImages = {
      left: left,
      right: right,
      center: center,
    };
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

export {WizeGameComponent};
