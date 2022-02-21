import { Frame } from "../Frames";

enum RoomBackgroundTheme {
    Empty,
    Castle,
    UnderGround,
    Cave,
};

type RoomTheme = {
    key: RoomBackgroundTheme,
    primaryColour: string,
    secondaryColour: string,
    floorColour: string,
    platformTiles: { left: Frame, center: Frame, right: Frame }
    backgroundTiles: Array<Frame>,
    wallTiles: { topLeft: Frame, left: Frame, bottomLeft: Frame, topRight: Frame, right: Frame, bottomRight: Frame, ceiling: Frame },
    horizontalBackgroundImage: Frame,
    verticalBackgroundImage: Frame,
    repeatBackgroundImage: boolean,
    backgroundMusic: string,
};

let RoomThemes = {};

RoomThemes[RoomBackgroundTheme.Empty] = {
    key: RoomBackgroundTheme.Empty,
    primaryColour: "#33beff",
    secondaryColour: "white",
    floorColour: "#302c2e",
    horizontalBackgroundImage: new Frame({src: require("../../../../../resources/wize/backgrounds/day/5.png")}),
    repeatBackgroundImage: true,
    platformTiles: {
        left: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_left_corner.png")}),
        center: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_tile.png")}),
        right: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_right_corner.png")}),
    },
    backgroundTiles: [],
    backgroundMusic: require("../../../../../resources/wize/audio/Prelude in F  Minor (with Accompaniment).mp3")
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
    },
    backgroundTiles: [
        new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile13.png")}),
        new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile4.png")}),
        new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile10.png")}),
    ],
    wallTiles: {
        topLeft: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile61.png")}),
        left: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile58.png")}),
        bottomLeft: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile35.png")}),
        topRight: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile49.png")}),
        right: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile56.png")}),
        bottomRight: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile24.png")}),
        ceiling: new Frame({src: require("../../../../../resources/wize/tiles/medieval/tile59.png")})
    },
    backgroundMusic: require("../../../../../resources/wize/audio/Prelude in F  Minor (with Accompaniment).mp3")
}


RoomThemes[RoomBackgroundTheme.UnderGround] = {
    key: RoomBackgroundTheme.UnderGround,
    primaryColour: "#302c2e",
    secondaryColour: "#472d3c",
    floorColour: "#302c2e",
    platformTiles: {
        left: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_left_corner.png")}),
        center: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_tile.png")}),
        right: new Frame({src: require("../../../../../resources/wize/tiles/platforms/grass_plat_right_corner.png")}),
    },
    backgroundTiles: [
        new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_inside.png")}),
        new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_vertical_tile_left.png")}),
        new Frame({src: require("../../../../../resources/wize/tiles/platforms/plat_vertical_tile_right.png")}),
    ],
    wallTiles: {
        topLeft: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_53.png")}),
        left: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_61.png")}),
        bottomLeft: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_67.png")}),
        topRight: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_41.png")}),
        right: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_62.png")}),
        bottomRight: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_68.png")}),
        ceiling: new Frame({src: require("../../../../../resources/wize/tiles/green-zone/Tile_15.png")})
    },
    backgroundMusic: require("../../../../../resources/wize/audio/Prelude in F  Minor (with Accompaniment).mp3")
};

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
    backgroundMusic: require("../../../../../resources/wize/audio/Prelude in F  Minor (with Accompaniment).mp3")
}

export { RoomBackgroundTheme, RoomTheme, RoomThemes };
