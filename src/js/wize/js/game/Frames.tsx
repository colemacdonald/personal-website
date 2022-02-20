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

type FrameSet = {
	sources: Array<string>,
	images: Array<any>,
	x_offset: number,
	width_offset: number,
	width_extend: number,
};

export { State, Direction, Frame, FrameSet }