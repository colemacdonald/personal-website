class Monster {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.h = options.h;
    this.w = options.w;

    this.platform = options.platform;

    this.speed = 2;

    this.xv = this.speed;
    this.yv = 0;
    this.canFly = false;
  }

  move() {
    //these walk back and forth on platforms
    if (
      this.x < this.platform.x - 5 ||
      this.x > this.platform.x + this.platform.w
    ) {
      this.xv *= -1;
    }

    this.x += this.xv;
  }
}

export { Monster };
