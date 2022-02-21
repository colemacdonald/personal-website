let TILES = {
    h: 50,
    w: 50,
    grass_left: require("../../../../../resources/wize/tiles/platforms/grass_plat_left_corner.png"),
    grass_right: require("../../../../../resources/wize/tiles/platforms/grass_plat_right_corner.png"),
    grass_mid: require("../../../../../resources/wize/tiles/platforms/grass_plat_tile.png"),
    bottom_floating: require("../../../../../resources/wize/tiles/platforms/bottom_floating_plat.png"),
    leftImg: null,
    rightImg: null,
    centerImg: null,
    bottomImg: null
};


const bootstrapPlatformImages = () => {
    const left = new Image(),
        right = new Image(),
        center = new Image(),
        bottom = new Image();

    left.src = TILES.grass_left;
    right.src = TILES.grass_right;
    center.src = TILES.grass_mid;
    bottom.src = TILES.bottom_floating;

    TILES.leftImg = left;
    TILES.rightImg = right;
    TILES.centerImg = center;
    TILES.bottomImg = bottom;
}

bootstrapPlatformImages();

export { TILES };
