class Monster {
  x: number;
  y: number;
  h: number;
  w: number;
  speed: number;
  platform: Rectangle;
  xv: number;
  

  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.h = options.h;
    this.w = options.w;

    this.speed = options.speed;

    this.platform = options.platform;

    this.xv = this.speed;
  }

  move() {
    //these walk back and forth on platforms
    if (
      this.x < this.platform.x + 10 ||
      this.x + this.w > this.platform.x + this.platform.w - 10
    ) {
      this.xv *= -1;
    }

    this.x += this.xv;
  }
}

export { Monster };
