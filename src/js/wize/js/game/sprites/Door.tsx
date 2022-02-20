import { Room } from "../Room";

type Door = {
    x: number,
    y: number,
    h: number,
    w: number,
    destRoom: number,
    destX: number,
    destY: number
};

export default Door;