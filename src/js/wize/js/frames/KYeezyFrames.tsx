enum State {
	Idle,
	Walking,
	Jumping,
	InAir
};

type FrameGroup = {
	right: FrameSet,
	left: FrameSet
};

type FrameSet = {
	sources: Array<string>,
	images: Array<any>,
	x_offset: number,
	width_offset: number,
	width_extend: number,
};

let FRAMES = {};

FRAMES[State.Idle] = {
	right: {
		sources: [require("../../../../resources/wize/kyell_still_right.png")],
		images: [],
		x_offset: 0,
		width_extend: 0,
	},
	left: {
		sources: [require("../../../../resources/wize/kyell_still_left.png")],
		images: [],
		x_offset: 0,
		width_extend: 0,
	},
};

FRAMES[State.Walking] = {
	right: {
		x_offset: -41,
		width_extend: 41,
		sources: [
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0000.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0000.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0001.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0001.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0002.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0002.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0003.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0003.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0004.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0004.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0005.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0005.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0006.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0006.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0007.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0007.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0008.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0008.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0009.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0009.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0010.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0010.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0011.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0011.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0012.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0012.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0013.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0013.png"),
		],
		images: [],
	},
	left: {
		x_offset: 0,
		width_extend: 41,
		sources: [
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0000.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0000.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0001.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0001.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0002.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0002.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0003.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0003.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0004.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0004.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0005.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0005.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0006.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0006.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0007.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0007.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0008.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0008.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0009.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0009.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0010.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0010.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0011.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0011.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0012.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0012.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0013.png"),
			require("../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0013.png"),
		],
		images: []
	},
};


FRAMES[State.Jumping] = {
	right: {
		sources: [],
		images: [],
		x_offset: 0,
	},
	left: {
		sources: [],
		images: [],
		x_offset: 0,
	}
};

FRAMES[State.InAir] = {
	right: {
		sources: [
			// require("../../../../resources/wize/kyell_jump/kyell_jump_right0000.png"),
			// require("../../../../resources/wize/kyell_jump/kyell_jump_right0001.png"),
			// require("../../../../resources/wize/kyell_jump/kyell_jump_right0002.png"),
			// require("../../../../resources/wize/kyell_jump/kyell_jump_right0003.png"),
			require("../../../../resources/wize/kyell_jump/kyell_jump_right0004.png"),
		],
		images: [],
		x_offset: 0,
		width_extend: 0,
	},
	left: {
		sources: [require("../../../../resources/wize/kyell_jump/kyell_jump_left0004.png")],
		images: [],
		x_offset: 0,
		width_extend: 0,
	},
};

export {State, FrameGroup, FrameSet, FRAMES}