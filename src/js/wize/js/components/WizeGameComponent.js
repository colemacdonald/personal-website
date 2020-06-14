import React, { Component } from "react";
import { COIN_FRAMES } from "../game/Coin.js";
import { TILES } from "../game/Frames.js";
import { WizeGame } from "../game/WizeGame.js";
import { _ } from "underscore";
import { util } from "../util.js";

class WizeGameComponent extends Component {
  constructor(props) {
    super(props);

    this.viewportH = props.dimensions.viewportH;
    this.viewportW = props.dimensions.viewportW;
    this.viewportY = props.dimensions.viewportY;
    this.viewportX = props.dimensions.viewportX;

    _.bindAll(this, "update", "keyup", "keydown", "startGame");

    this.bootstrapCoinsImages();

    this.bootstrapPlatformImages();

    this.canvas = React.createRef();

    this.games = 0;
    this.frameCount = 0;
  }

  componentDidMount() {
    this.startGame(false);
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
      this.games = 0;
      this.frameCount = 0;
    }

    if (this.game) delete this.game;
    this.game = new WizeGame();

    this.viewportY = this.game.getMainCharacter().x - 100;
    this.viewportX = this.game.getMainCharacter().y - 100;

    this.cntx = this.canvas.current.getContext("2d");
    this.cntx.imageSmoothingEnabled = false;

    if (this.interval) window.clearInterval(this.interval);
    this.interval = setInterval(this.update, 1000 / this.game.fps);

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
    if (!this.game.playerAlive) {
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
    } else if (this.game.score === 2000) {
      this.games++;
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
  }

  drawScore() {
    this.cntx.fillStyle = "red";
    this.cntx.font = "30px Arial";
    this.cntx.fillText(
      "Games: " +
        this.games +
        " Score: " +
        this.game.score +
        " (" +
        Math.floor(this.frameCount / this.game.fps) +
        "s)",
      10,
      30
    );
  }

  /*
   * Draws each platform that exists inside the viewport at its position offset the viewport
   */
  drawPlatforms() {
    var plats = this.game.platforms;

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
    var monsters = this.game.monsters;

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
    var coins = this.game.coins;

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
    var c = this.game.getMainCharacter(),
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

  /*
   * To be called at the frame rate.
   *
   */
  update() {
    this.game.update();
    this.drawGame();
    this.updateViewport();
    if (this.game.playerAlive) {
      this.frameCount++;
    }
  }

  /*
   * Update the viewport if the character gets too close to the edge
   */
  updateViewport() {
    var c = this.game.getMainCharacter();
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
        this.game.leftRelease();
        break;
      case 38:
        this.game.upRelease();
        break;
      case 39:
        this.game.rightRelease();
        break;
      case 40:
        this.game.downRelease();
        break;
      default:
        break;
    }
  }
  keydown(e) {
    switch (e.keyCode) {
      case 37:
        this.game.leftPress();
        break;
      case 38:
        this.game.upPress();
        break;
      case 39:
        this.game.rightPress();
        break;
      case 40:
        this.game.downPress();
        break;
      default:
        break;
    }
  }
}

export default WizeGameComponent;
