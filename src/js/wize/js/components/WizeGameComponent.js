import React, { Component } from "react";
import { COIN_FRAMES } from "../game/sprites/Coin.js";
import { TILES } from "../game/sprites/Frames.js";
import WizeGame from "../game/WizeGame.js";
import WizeGameController from "../game/WizeGameController.js"
import { _ } from "underscore";
import { util } from "../util.js";

// TODO: Separate view from game controller logic
class WizeGameComponent extends Component {
  constructor(props) {
    super(props);

    // TODO: separate canvas size from viewportH / allow scaling
    this.viewportH = props.dimensions.viewportH;
    this.viewportW = props.dimensions.viewportW;
    this.viewportY = props.dimensions.viewportY;
    this.viewportX = props.dimensions.viewportX;

    _.bindAll(this, "update", "keyup", "keydown", "startGame");

    this.bootstrapCoinsImages();

    this.bootstrapPlatformImages();

    this.canvas = React.createRef();

    this.gameController = new WizeGameController();

    this.level = 0;
    this.frameCount = 0;
  }

  componentDidMount() {
    this.startGame(true);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
    document.removeEventListener("keyup", this.keyup);
    document.removeEventListener("keydown", this.keydown);
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.startGame(true);
          }}
        >
          Start Again
        </button>
        <div className="wize-game">
          <canvas
            ref={this.canvas}
            className="game-canvas"
            height={`${this.viewportH}px`}
            width={`${this.viewportW}px`}
          />
        </div>
      </div>
    );
  }

  startGame(reset) {
    if (reset === true) {
      this.level = 0;
      this.frameCount = 0;

      this.gameController.startRandomGame();
    } else {
      this.gameController.incrementGameDifficulty();
    }

    this.game = this.gameController.game;

    this.viewportY = this.gameController.getCurrentGame().getMainCharacter().x - 100;
    this.viewportX = this.gameController.getCurrentGame().getMainCharacter().y - 100;

    this.cntx = this.canvas.current.getContext("2d");
    this.cntx.imageSmoothingEnabled = false;

    if (this.interval) window.clearInterval(this.interval);
    this.interval = setInterval(this.update, 1000 / this.gameController.getCurrentGame().fps);

    document.addEventListener("keyup", this.keyup);
    document.addEventListener("keydown", this.keydown);
  }

  drawBackground() {
    this.cntx.clearRect(
      0,
      0,
      this.canvas.current.width,
      this.canvas.current.height
    );

    // Background
    this.cntx.fillStyle = "#33beff";
    this.cntx.fillRect(
      0,
      0,
      this.canvas.current.width,
      this.canvas.current.height
    );
  }

  /*
   * Calls various draw functions in order
   */
  drawGame() {
    if (!this.gameController.getCurrentGame().playerAlive) {
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
    } else if (this.gameController.getCurrentGame().score === 2000) {
      this.level++;
      this.startGame(false);
      return;
    }

    this.drawBackground();

    // Draw platforms (which are currently coded to hav width of 50 that are >= 100)
    this.drawPlatforms();

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
  }

  drawScore() {
    this.cntx.fillStyle = "red";
    this.cntx.font = "30px Arial";
    this.cntx.fillText(
      "Level: " +
        this.level +
        " Score: " +
        this.gameController.getCurrentGame().score +
        " (" +
        Math.floor(this.frameCount / this.gameController.getCurrentGame().fps) +
        "s)",
      10,
      30
    );
  }

  /*
   * Draws each platform that exists inside the viewport at its position offset the viewport
   */
  drawPlatforms() {
    var plats = this.gameController.getCurrentGame().level.platforms;

    _.each(
      plats,
      function (plat) {
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
            plat.x - this.viewportX,
            plat.y - this.viewportY,
            TILES.w,
            TILES.h
          );

          // Middle tiles

          var i = 1;
          // Until we reach the right side
          while ((i + 1) * TILES.w < plat.w) {
            this.cntx.drawImage(
              this.platformImages.center,
              plat.x + TILES.w * i - this.viewportX,
              plat.y - this.viewportY,
              TILES.w,
              TILES.h
            );

            i++;
          }

          // Right corner
          this.cntx.drawImage(
            this.platformImages.right,
            plat.x + TILES.w * i - this.viewportX,
            plat.y - this.viewportY,
            TILES.w,
            TILES.h
          );
        }
      },
      this
    );
  }

  /*
   * Draws each monster that exists inside the viewport at its position offset the viewport
   */
  drawMonsters() {
    var monsters = this.gameController.getCurrentGame().level.monsters;

    this.cntx.fillStyle = "brown";
    _.each(
      monsters,
      function (monster) {
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
            monster.x - this.viewportX,
            monster.y - this.viewportY,
            monster.w,
            monster.h
          );
        }
      },
      this
    );
  }

  /*
   * Draws each coin that exists inside the viewport at its position offset the viewport
   */
  drawCoins() {
    var coins = this.gameController.getCurrentGame().level.coins;

    this.cntx.fillStyle = "yellow";
    _.each(
      coins,
      function (coin) {
        if (
          util.doRectanglesOverlap(
            this.viewportX,
            this.viewportY,
            this.viewportH,
            this.viewportW,
            coin.x - coin.r,
            coin.y - coin.r,
            2 * coin.r,
            2 * coin.r
          )
        ) {
          var index = coin.getImageIndex();
          this.cntx.drawImage(
            COIN_FRAMES.images[index],
            coin.x - coin.r - this.viewportX,
            coin.y - coin.r - this.viewportY,
            coin.r * 2,
            coin.r * 2
          );
        }
      },
      this
    );
  }

  /*
   * Draws the player at its position offset the viewport
   */
  drawPlayer() {
    var c = this.gameController.getCurrentGame().getMainCharacter(),
      frame = c.getFrame();
    // drawImage(img, x, y, w, h)
    this.cntx.drawImage(
      frame.img,
      c.x - this.viewportX + frame.x_offset,
      c.y - this.viewportY,
      c.w + frame.width_extend,
      c.h
    );

    // this.cntx.fillStyle = 'purple';
    // this.cntx.fillRect(c.x - this.viewportX, c.y - this.viewportY, c.w, c.h);
  }

  drawMinimap() {
    let minimapScale = 0.09;

    let minimap = {
      y: 10,
      w: this.gameController.getCurrentGame().width * minimapScale,
      h: this.gameController.getCurrentGame().height * minimapScale,
    };
    minimap.x = this.viewportW - minimap.w - 10;

    this.cntx.save();
    this.cntx.globalAlpha = 0.55;
    this.cntx.fillStyle = "green";
    this.cntx.fillRect(minimap.x, minimap.y, minimap.w, minimap.h);

    this.drawMinimapPlatforms(minimapScale, minimap);
    this.drawMinimapCharacter(minimapScale, minimap);
    this.drawMinimapCoins(minimapScale, minimap);
    this.drawMinimapMonsters(minimapScale, minimap);

    this.cntx.restore();
  }

  drawMinimapPlatforms(scale, minimap) {
    this.cntx.fillStyle = "brown";

    this.drawOnMinimap(this.gameController.getCurrentGame().level.platforms, scale, minimap);
  }

  drawMinimapCharacter(scale, minimap) {
    this.cntx.fillStyle = "blue";
    let c = this.gameController.getCurrentGame().getMainCharacter();

    this.drawOnMinimap([c], scale, minimap);
  }

  drawMinimapCoins(scale, minimap) {
    this.cntx.fillStyle = "gold";

    this.gameController.getCurrentGame().level.coins.forEach((c) => {
      this.cntx.fillRect(
        minimap.x + (c.x / this.gameController.getCurrentGame().width) * minimap.w,
        minimap.y + (c.y / this.gameController.getCurrentGame().height) * minimap.h,
        Math.max(c.r * scale, 3),
        Math.max(c.r * scale, 3)
      );
    });
  }

  drawMinimapMonsters(scale, minimap) {
    this.cntx.fillStyle = "red";
    this.drawOnMinimap(this.gameController.getCurrentGame().level.monsters, scale, minimap);
  }

  drawOnMinimap(rects, scale, minimap) {
    rects.forEach((r) => {
      this.cntx.fillRect(
        minimap.x + (r.x / this.gameController.getCurrentGame().width) * minimap.w,
        minimap.y + (r.y / this.gameController.getCurrentGame().height) * minimap.h,
        r.w * scale,
        r.h * scale
      );
    });
  }

  /*
   * To be called at the frame rate.
   *
   */
  update() {
    this.gameController.tick();
    this.drawGame();
    this.updateViewport();
    if (this.gameController.getCurrentGame().playerAlive) {
      this.frameCount++;
    }
  }

  /*
   * Update the viewport if the character gets too close to the edge
   */
  updateViewport() {
    var c = this.gameController.getCurrentGame().getMainCharacter();
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

  bootstrapCoinsImages() {
    COIN_FRAMES.sources.forEach((src) => {
      var img = new Image();
      img.src = src;

      COIN_FRAMES.images.push(img);
    });
  }

  bootstrapPlatformImages() {
    var left = new Image(),
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
        this.gameController.getCurrentGame().leftRelease();
        break;
      case 38:
        this.gameController.getCurrentGame().upRelease();
        break;
      case 39:
        this.gameController.getCurrentGame().rightRelease();
        break;
      case 40:
        this.gameController.getCurrentGame().downRelease();
        break;
      default:
        break;
    }
  }
  keydown(e) {
    switch (e.keyCode) {
      case 37:
        this.gameController.getCurrentGame().leftPress();
        break;
      case 38:
        this.gameController.getCurrentGame().upPress();
        break;
      case 39:
        this.gameController.getCurrentGame().rightPress();
        break;
      case 40:
        this.gameController.getCurrentGame().downPress();
        break;
      default:
        break;
    }
  }
}

export default WizeGameComponent;
