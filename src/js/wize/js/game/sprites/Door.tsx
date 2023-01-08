import { Frame } from '../Frames';
import { SpriteBase } from './SpriteBase';

export class Door {
  drawBox: Rectangle;

  inFrontOfPlatforms: boolean = true;

  hitBoxes: Array<Rectangle>;

  destRoom: number;
  destX: number;
  destY: number;

  constructor(x: number, y: number, destRoom: number, destX: number, destY: number) {
    this.drawBox = { x: x, y: y, h: 100, w: 86 };

    this.hitBoxes = [{ x: x + 30, y: y + 60, h: 40, w: 40 }];

    this.destRoom = destRoom;
    this.destX = destX;
    this.destY = destY;
  }

  // currently neither of these are used for doors but they could be if we wanted to animate them but for now, the frame simple belongs to the room theme
  tick() {}

  getFrame() {
    return null;
  }
}
