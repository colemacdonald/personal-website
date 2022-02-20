enum State {
	Idle,
	Walking,
	Jumping,
	InAir
};

enum Direction {
    Right,
    Left
};
  
type Frame = {
    img: any,
    x_offset: number,
    width_extend: number
};

class FrameC {
    src: string;
    img: any;
    ticks: number = 1;
    x_offset: number = 0;
    width_extend: number = 0;
    y_offset: number = 0;
    height_extend: number = 0;
    relativeHitBoxes: Array<Rectangle> = [];
    relativeHurtBoxes: Array<Rectangle> = [];

    constructor(src: string, ticks: number, hurtBoxes: Array<Rectangle>) {
        this.src = src;
        this.ticks = ticks;
        this.relativeHurtBoxes = hurtBoxes;
    }
};

type FrameSet = {
	sources: Array<string>,
	images: Array<any>,
	x_offset: number,
	width_offset: number,
	width_extend: number,
};

export { State, Direction, Frame, FrameSet, FrameC }