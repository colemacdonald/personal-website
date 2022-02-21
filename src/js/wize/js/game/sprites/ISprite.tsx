interface ISprite {
    drawBox: Rectangle;
    hitBoxes: Array<Rectangle>;

    inFrontOfPlatforms: boolean;

    tick();

    getFrame();
}