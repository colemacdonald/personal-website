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

    // special method used for copying info into the empty frame
    copyFrom(frame: Frame): void {
        this.ticks = frame.ticks;
        this.x_offset = frame.x_offset;
        this.width_extend = frame.width_extend;
        this.y_offset = frame.y_offset;
        this.height_extend = frame.height_extend;
        this.relativeHitBoxes = frame.relativeHitBoxes;
        this.relativeHurtBoxes = frame.relativeHurtBoxes;
    }
};

export { State, Direction, Frame }