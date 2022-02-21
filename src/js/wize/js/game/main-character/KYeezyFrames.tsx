
import { util } from "../../util";
import { State, Direction, Frame } from "../Frames";

let FRAMES = {};

let hurtBox = { x: 5, y: 10, h: 70, w: 30 };

FRAMES[State.Idle] = {};
FRAMES[State.Idle][Direction.Right] = [
	new Frame({src: require("../../../../../resources/wize/kyell_still_right.png"), hurtBoxes: [hurtBox]}),
];
FRAMES[State.Idle][Direction.Left] = [
	new Frame({src: [require("../../../../../resources/wize/kyell_still_left.png")], hurtBoxes: [hurtBox]}),
];

FRAMES[State.Walking] = {};

FRAMES[State.Walking][Direction.Right] = [
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0000.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0001.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0002.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0003.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0004.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0005.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0006.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0007.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0008.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0009.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0010.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0011.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0012.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_right0013.png"), ticks: 2, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
];

FRAMES[State.Walking][Direction.Left] = [
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0000.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0001.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0002.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0003.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0004.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0005.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0006.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0007.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0008.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0009.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0010.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0011.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0012.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell_walk/kyell_walk_hairmove_left0013.png"), ticks: 2, width_extend: 41, hurtBoxes: [hurtBox]}),
];

FRAMES[State.Jumping] = {};
FRAMES[State.Jumping][Direction.Right] = [];
FRAMES[State.Jumping][Direction.Left] = [];


FRAMES[State.InAir] = {};
FRAMES[State.InAir][Direction.Right] = [
	new Frame({src: require("../../../../../resources/wize/kyell_jump/kyell_jump_right0004.png"), hurtBoxes: [hurtBox]})
];
FRAMES[State.InAir][Direction.Left] = [
	new Frame({src: require("../../../../../resources/wize/kyell_jump/kyell_jump_left0004.png"), hurtBoxes: [hurtBox]})
];


util.bootstrapFrames(FRAMES);

export { FRAMES }