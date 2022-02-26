import { StaticElementType } from "../background-elements/StaticElement";
import { KYeezy } from "../main-character/KYeezyCharacter";
import { Powerup } from "../Powerup";
import { Room } from "../Room";
import { RoomBuilder } from "../RoomBuilder";
import { Coin } from "../sprites/Coin";
import { MonsterType } from "../sprites/Monster";
import { RoomBackgroundTheme } from "../tiles/RoomThemes";

let doubleJump: Powerup = {
    coin: new Coin({ x: 950, y: 200 }),
    name: "Double Jump",
    method: (character: KYeezy) => {
        character.maxJmpCnt = 2;
    }
};


let StoryModeRooms: Array<Room> = [
    new RoomBuilder({ h: 750, w: 1000 })
        .withTheme(RoomBackgroundTheme.Outside)
        .withFloor()
        .withDoor({ x: 900, y: 660, destRoom: 1, destX: 125, destY: 225 })
        .withMonster({monsterType: MonsterType.Vulture, x: 0, y: 600, w: 1000, h: 20 })
        .withFountain({ x: 500, y: 650 })
        .withStaticElement({type: StaticElementType.Tree3, x: -240, y: 380, inFrontOfPlatforms: true, scale: 2})
        .withStaticElement({type: StaticElementType.Stone1, x: 350, y: 743})
        .build(),
    new RoomBuilder({ h: 2400, w: 500 })
        .withTheme(RoomBackgroundTheme.Castle)
        .withFloor()
        .withCeiling()
        .withPlatform({ x: 0, y: 300, h: 50, w: 300 })
        .withDoor({ x: 50, y: 210, destRoom: 0, destX: 840, destY: 750 })
        .withPlatform({ x: 200, y: 500, h: 50, w: 300 })
        .withMonster({ monsterType: MonsterType.Scorpion, plat: 2 })
        .withPlatform({ x: 0, y: 800, h: 50, w: 300 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 3 })
        .withPlatform({ x: 200, y: 1100, h: 50, w: 300 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 4 })
        .withPlatform({ x: 0, y: 1400, h: 50, w: 300 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 5 })
        .withDoor({ x: 50, y: 2310, destRoom: 2, destX: 1900, destY: 150 })
        .build(),
    new RoomBuilder({ h: 100, w: 2000 })
        .withTheme(RoomBackgroundTheme.Cave)
        .withFloor()
        .withCeiling()
        .withDoor({ x: 1950, y: 10, destRoom: 1, destX: 150, destY: 2350 })
        .withDoor({ x: -10, y: 10, destRoom: 3, destX: 870, destY: 2170 })
        .build(),
    new RoomBuilder({ h: 2200, w: 1000 })
        .withFloor()
        .withCeiling()
        .withTheme(RoomBackgroundTheme.Cave)
        .withDoor({ x: 940, y: 2110, destRoom: 2, destX: 100, destY: 50 })
        .withPlatform({ x: 0, y: 2100, w: 100, h: 50 })
        .withPlatform({ x: 0, y: 2000, w: 100, h: 50 })
        .withPlatform({ x: 0, y: 1900, w: 100, h: 50 })
        .withPlatform({ x: 220, y: 1800, w: 100, h: 50 })
        .withPlatform({ x: 440, y: 1700, w: 100, h: 50 })
        .withPlatform({ x: 660, y: 1600, w: 100, h: 50 })
        .withPlatform({ x: 880, y: 1500, w: 100, h: 50 })
        .withPlatform({ x: 660, y: 1400, w: 100, h: 50 })
        .withPlatform({ x: 880, y: 1300, w: 100, h: 50 })
        .withPlatform({ x: 660, y: 1200, w: 100, h: 50 })
        .withPlatform({ x: 880, y: 1100, w: 100, h: 50 })
        .withPlatform({ x: 660, y: 1000, w: 100, h: 50 })
        .withPlatform({ x: 440, y: 1000, w: 100, h: 50 })
        .withPlatform({ x: 150, y: 1050, w: 200, h: 50 })
        .withPlatform({ x: 0, y: 950, w: 100, h: 50 })
        .withPlatform({ x: 220, y: 850, w: 100, h: 50 })
        .withPlatform({ x: 0, y: 750, w: 100, h: 50 })
        .withPlatform({ x: 220, y: 650, w: 100, h: 50 })
        .withPlatform({ x: 0, y: 550, w: 100, h: 50 })
        .withPlatform({ x: 220, y: 450, w: 100, h: 50 })
        .withPlatform({ x: 440, y: 350, w: 200, h: 50 })
        .withPlatform({ x: 760, y: 450, w: 100, h: 50 })
        .withPlatform({ x: 900, y: 350, w: 100, h: 50 })
        .withPlatform({ x: 900, y: 250, w: 100, h: 50 })
        .withPlatform({ x: 0, y: 150, w: 450, h: 50 })
        .withPowerup(doubleJump)
        .withDoor({ x: 20, y: 60, destRoom: 4, destX: 1800, destY:50 })
        .build(),
    new RoomBuilder({h: 600, w: 2000})
        .withTheme(RoomBackgroundTheme.Cave)
        .withDamageZoneFloor()
        .withPlatform({x: 1700, y: 150, w: 300, h: 50})
        .withPlatform({x: 1900, y: 330, w: 100, h: 50})
        .withPlatform({x: 1900, y: 510, w: 100, h: 50})
        .withCeiling()
        .build(),
    new RoomBuilder({h: 600, w: 2000})
        .withDamageZoneFloor()
        .withCeiling()
        .build()
];

export { StoryModeRooms }