import { Frame } from "../Frames";

enum RoomBackgroundTheme {
    Outside,
    Castle,
    // UnderGround,
    Cave,
    Autumn
};

type RoomTheme = {
    key: RoomBackgroundTheme,
    primaryColour: string,
    secondaryColour: string,
    floorColour: string,
    platformTiles: { left: Frame, center: Frame, right: Frame, leftSide: Frame, rightSide: Frame, bottomLeft: Frame, bottomRight: Frame, bottom: Frame, fill: Frame },
    damageZoneTiles: { left: Frame, center: Frame, right: Frame },
    backgroundTiles: Array<Frame>,
    wallTiles: { topLeft: Frame, left: Frame, bottomLeft: Frame, topRight: Frame, right: Frame, bottomRight: Frame, ceiling: Frame },
    horizontalBackgroundImage: Frame,
    verticalBackgroundImage: Frame,
    repeatBackgroundImage: boolean,
    backgroundMusic: string,
    doorFrame: Frame
};

let RoomThemes = {};

RoomThemes[RoomBackgroundTheme.Outside] = {
    key: RoomBackgroundTheme.Outside,
    primaryColour: "#33beff",
    secondaryColour: "white",
    floorColour: "#302c2e",
    horizontalBackgroundImage: new Frame({src: require("../../../../../resources/wize/backgrounds/day/5.png")}),
    repeatBackgroundImage: true,
    platformTiles: {
        left: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_left_corner.png")}),
        center: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_tile.png")}),
        right: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_right_corner.png")}),
        leftSide: new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_vertical_tile_left.png")}),
        rightSide: new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_vertical_tile_right.png")}),
        bottomLeft: new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_vertical_floating_tile_left.png")}),
        bottomRight: new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_vertical_floating_tile_right.png")}),
        bottom: new Frame({src: require("../../../../../resources/wize/tiles/platforms/bottom_floating_plat.png")}),
        fill: new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_inside.png")})
    },
    backgroundTiles: [],
    backgroundMusic: require("../../../../../resources/wize/audio/Prelude in F  Minor (with Accompaniment).mp3"),
    doorFrame: new Frame({src: require("../../../../../resources/wize/doors/castle/door1.png"), hitBoxes: [{x: 30, y: 60, h: 40, w: 40 }]})
};

RoomThemes[RoomBackgroundTheme.Castle] = {
    key: RoomBackgroundTheme.Castle,
    primaryColour: "#201c41", //"#35355f",
    secondaryColour: "#424c7d",
    floorColour: "#201c41",
    platformTiles: {
        left: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile23.png")}),
        center: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile22.png")}),
        right: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile21.png")}),
        leftSide: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile58.png")}),
        rightSide: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile56.png")}),
        bottomLeft: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile35.png")}),
        bottomRight: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile24.png")}),
        bottom: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile60.png")}),
        fill: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile60.png")}),
    },
    backgroundTiles: [
        new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile13.png")}),
        new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile4.png")}),
        new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile10.png")}),
    ],
    wallTiles: {
        topLeft: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile121.png")}),
        left: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile120.png")}),
        bottomLeft: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile83.png")}),
        topRight: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile118.png")}),
        right: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile122.png")}),
        bottomRight: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile82.png")}),
        ceiling: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile999.png")})
    },
    backgroundMusic: require("../../../../../resources/wize/audio/Prelude in F  Minor (with Accompaniment).mp3"),
    doorFrame: new Frame({src: require("../../../../../resources/wize/doors/castle/door1.png"), hitBoxes: [{x: 30, y: 60, h: 40, w: 40 }]})
}


// RoomThemes[RoomBackgroundTheme.UnderGround] = {
//     key: RoomBackgroundTheme.UnderGround,
//     primaryColour: "#302c2e",
//     secondaryColour: "#472d3c",
//     floorColour: "#302c2e",
//     platformTiles: {
//         left: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_left_corner.png")}),
//         center: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_tile.png")}),
//         right: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_right_corner.png")}),
//     },
//     backgroundTiles: [
//         new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_inside.png")}),
//         new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_vertical_tile_left.png")}),
//         new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_vertical_tile_right.png")}),
//     ],
//     wallTiles: {
//         topLeft: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_53.png")}),
//         left: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_61.png")}),
//         bottomLeft: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_67.png")}),
//         topRight: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_41.png")}),
//         right: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_62.png")}),
//         bottomRight: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_68.png")}),
//         ceiling: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_15.png")})
//     },
//     backgroundMusic: require("../../../../../resources/wize/audio/Prelude in F  Minor (with Accompaniment).mp3"),
//     doorFrame: new Frame({src: require("../../../../../resources/wize/doors/castle/door1.png"), hitBoxes: [{x: 30, y: 60, h: 40, w: 40 }]})
// };

RoomThemes[RoomBackgroundTheme.Cave] = {
    key: RoomBackgroundTheme.Cave,
    primaryColour: "black",
    secondaryColour: "#472d3c",
    floorColour: "black",
    horizontalBackgroundImage: new Frame({src: require("../../../../../resources/wize/backgrounds/cave/Bright/Background.png")}),
    verticalBackgroundImage: new Frame({src: require("../../../../../resources/wize/backgrounds/cave/Bright/Background-vertical.png")}),
    platformTiles: {
        left: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile1.png")}),
        center: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile2.png")}),
        right: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile3.png")}),
        leftSide: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile4.png")}),
        rightSide: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile6.png")}),
        bottomLeft: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile9.png")}),
        bottomRight: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile7.png")}),
        bottom: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile8.png")}),
        fill: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile5.png")}),
    },
    backgroundTiles: [
        new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_inside.png")}),
        new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_vertical_tile_left.png")}),
        new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_vertical_tile_right.png")}),
    ],
    wallTiles: {
        topLeft: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile25.png")}),
        left: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile35.png")}),
        bottomLeft: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile35.png")}),
        topRight: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile26.png")}),
        right: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile35.png")}),
        bottomRight: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile35.png")}),
        ceiling: new Frame({src: require("../../../../../resources/wize/tiles/cave/tile27.png")}),
    },
    damageZoneTiles: {
        left: new Frame({src: require("../../../../../resources/wize/tiles/cave/lava_tile8.png")}),
        center: new Frame({src: require("../../../../../resources/wize/tiles/cave/lava_tile9.png")}),
        right: new Frame({src: require("../../../../../resources/wize/tiles/cave/lava_tile10.png"), width_extend: 20}),
    },
    backgroundMusic: require("../../../../../resources/wize/audio/Cave 1.mp3"),
    doorFrame: new Frame({src: require("../../../../../resources/wize/doors/cave/door.png"), hitBoxes: [{x: 30, y: 60, h: 40, w: 40 }]})
}

RoomThemes[RoomBackgroundTheme.Autumn] = {
    key: RoomBackgroundTheme.Autumn,
    primaryColour: "orange",
    secondaryColour: "yellow",
    floorColour: "brown",
    horizontalBackgroundImage: new Frame({src: require("../../../../../resources/wize/backgrounds/autumn/background.png")}),
    platformTiles: {
        left: new Frame({src: require("../../../../../resources/wize/tiles/autumn/03.png")}),
        center: new Frame({src: require("../../../../../resources/wize/tiles/autumn/04.png")}),
        right: new Frame({src: require("../../../../../resources/wize/tiles/autumn/02.png")}),
    },
    backgroundMusic: require("../../../../../resources/wize/audio/Cave 1.mp3"),
    doorFrame: new Frame({src: require("../../../../../resources/wize/doors/castle/door1.png"), hitBoxes: [{x: 30, y: 60, h: 40, w: 40 }]})
};

export { RoomBackgroundTheme, RoomTheme, RoomThemes };
