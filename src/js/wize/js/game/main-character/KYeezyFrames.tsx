
import { util } from "../../util";
import { State, Direction, Frame } from "../Frames";

let FRAMES = {};

let hurtBox = { x: 5, y: 10, h: 70, w: 30 };

FRAMES[State.Idle] = {};
FRAMES[State.Idle][Direction.Right] = [
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_still_right.png"), hurtBoxes: [hurtBox]}),
];
FRAMES[State.Idle][Direction.Left] = [
	new Frame({src: [require("../../../../../resources/wize/kyell/kyell_still_left.png")], hurtBoxes: [hurtBox]}),
];

FRAMES[State.Walking] = {};

FRAMES[State.Walking][Direction.Right] = [
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0000.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0001.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0002.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0003.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0004.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0005.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0006.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0007.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0008.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0009.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0010.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0011.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0012.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_right0013.png"), ticks: 4, x_offset: -41, width_extend: 41, hurtBoxes: [hurtBox]}),
];

FRAMES[State.Walking][Direction.Left] = [
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0000.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0001.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0002.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0003.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0004.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0005.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0006.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0007.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0008.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0009.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0010.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0011.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0012.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_walk/kyell_walk_hairmove_left0013.png"), ticks: 4, width_extend: 41, hurtBoxes: [hurtBox]}),
];

FRAMES[State.Jumping] = {};
FRAMES[State.Jumping][Direction.Right] = [];
FRAMES[State.Jumping][Direction.Left] = [];


FRAMES[State.InAir] = {};
FRAMES[State.InAir][Direction.Right] = [
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_jump/kyell_jump_right0004.png"), hurtBoxes: [hurtBox]})
];
FRAMES[State.InAir][Direction.Left] = [
	new Frame({src: require("../../../../../resources/wize/kyell/kyell_jump/kyell_jump_left0004.png"), hurtBoxes: [hurtBox]})
];

FRAMES[State.Attacking] = {};
FRAMES[State.Attacking][Direction.Right] = [
	new Frame({src: require("../../../../../resources/wize/kyell/kyell-attack-right.png"), hurtBoxes: [hurtBox], hitBoxes: [{x: 40, y: 40, w: 34, h: 40}], width_extend: 75, x_offset: -41})
];
FRAMES[State.Attacking][Direction.Left] = [
	new Frame({src: require("../../../../../resources/wize/kyell/kyell-attack-left.png"), hurtBoxes: [hurtBox], hitBoxes: [{x: -34, y: 40, w: 34, h: 40}], width_extend: 75, x_offset: -34})
];



export { FRAMES }