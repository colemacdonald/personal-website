type GameOptions = {
  fps: number;
  speed: number;
  coinMargin: number;
  height: number;
  width: number;
  monsterSpeed: number;
  numberOfMonsters: number;
  grav: number;
  safeBox: Rectangle;
  snapToPlatforms: boolean;
};

type Rectangle = {
  x: number;
  y: number;
  h: number;
  w: number;
};
