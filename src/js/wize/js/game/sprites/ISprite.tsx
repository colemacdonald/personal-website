interface ISprite {
    box: Rectangle;
    inFrontOfPlatforms: boolean;

    tick();

    getFrame();
}