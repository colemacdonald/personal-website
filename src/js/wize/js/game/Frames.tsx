enum State {
	Idle,
	Walking,
	Jumping,
	InAir,
    Attacking
};

enum Direction {
    Right,
    Left
};
  
class Frame {
    src: string;
    img: any;
    ticks: number = 1;
    x_offset: number = 0;
    width_extend: number = 0;
    y_offset: number = 0;
    height_extend: number = 0;
    relativeHitBoxes: Array<Rectangle> = [];
    relativeHurtBoxes: Array<Rectangle> = [];

    constructor(frameOptions) {
        this.src = frameOptions.src;
        this.ticks = frameOptions.ticks || 1;
        this.x_offset = frameOptions.x_offset || 0;
        this.width_extend = frameOptions.width_extend || 0;
        this.y_offset = frameOptions.y_offset || 0;
        this.height_extend = frameOptions.height_extend || 0;
        this.relativeHurtBoxes = frameOptions.hurtBoxes || [];
        this.relativeHitBoxes = frameOptions.hitBoxes || [];

        // load image
        let img = new Image();
        img.src = this.src;
        this.img = img;
    }
};

export { State, Direction, Frame }