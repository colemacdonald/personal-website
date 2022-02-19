import Room from "../Room";

type Door = {
    x: number,
    y: number,
    h: number,
    w: number,
    destinationLevel: Room
};

export default Door;