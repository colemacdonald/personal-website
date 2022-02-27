import { AnimatedBackgroundElementType } from "../background-elements/AnimatedBackgroundElement";
import { StaticElementType } from "../background-elements/StaticElement";
import { KYeezy } from "../main-character/KYeezyCharacter";
import { Powerup } from "../Powerup";
import { Room } from "../Room";
import { RoomBuilder } from "../RoomBuilder";
import { Coin } from "../sprites/Coin";
import { MonsterType } from "../sprites/Monster";
import { RoomBackgroundTheme } from "../tiles/RoomThemes";

let StoryModeRooms: Array<Room> = [
    new RoomBuilder({ h: 750, w: 1000 })
        .withTheme(RoomBackgroundTheme.Outside)
        .withFloor()
        .withDoor({ x: 900, y: 660, destRoom: 1, destX: 125, destY: 225 })
        .withMonster({monsterType: MonsterType.Vulture, x: 0, y: 600, w: 1000, h: 20 })
        .withAnimatedElement({ x: 500, y: 650, type: AnimatedBackgroundElementType.Fountain, scale: 1.5 })
        .withStaticElement({type: StaticElementType.Tree3, x: -240, y: 380, inFrontOfPlatforms: true, scale: 2})
        .withStaticElement({type: StaticElementType.Stone1, x: 350, y: 743})
        .build(),
    new RoomBuilder({ h: 2400, w: 500 })
        .withTheme(RoomBackgroundTheme.Castle)
        .withFloor()
        .withCeiling()
        // entrance
        .withPlatform({ x: 0, y: 300, h: 50, w: 300 })
        .withDoor({ x: 50, y: 210, destRoom: 0, destX: 840, destY: 750 })
        // zig zag with monsters
        .withPlatform({ x: 200, y: 500, h: 50, w: 300 })
        .withMonster({ monsterType: MonsterType.Scorpion, plat: 2 })
        .withPlatform({ x: 0, y: 800, h: 50, w: 300 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 3 })
        .withPlatform({ x: 200, y: 1100, h: 50, w: 300 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 4 })
        .withPlatform({ x: 0, y: 1400, h: 50, w: 300 })
        .withMonster({ monsterType: MonsterType.Scorpion, plat: 5 })
        .withPlatform({ x: 200, y: 1700, h: 50, w: 150 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 6 })
        .withPlatform({ x: 350, y: 1700, h: 50, w: 150 })
        .withMonster({ monsterType: MonsterType.Scorpion, plat: 7 })
        .withPlatform({ x: 0, y: 2000, h: 50, w: 150 })
        .withMonster({ monsterType: MonsterType.Scorpion, plat: 8 })
        .withPlatform({ x: 150, y: 2000, h: 50, w: 150 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 9 })
        .withDoor({ x: 50, y: 2310, destRoom: 2, destX: 1900, destY: 150 })
        .withMonster({monsterType: MonsterType.Scorpion, x: 0, y: 2400, w: 500, h: 50})
        .build(),
    new RoomBuilder({ h: 100, w: 2000 })
        .withTheme(RoomBackgroundTheme.Cave)
        .withFloor()
        .withMonster({monsterType: MonsterType.OneEyedBat, x: 0, y: 60, w: 1000})
        .withMonster({monsterType: MonsterType.OneEyedBat, x: 1000, y: 60, w: 1000})
        .withMonster({monsterType: MonsterType.Centipede, x: 500, y: 100, w: 1000})
        .withCeiling()
        .withDoor({ x: 1950, y: 10, destRoom: 1, destX: 150, destY: 2350 })
        .withDoor({ x: -10, y: 10, destRoom: 3, destX: 870, destY: 2170 })
        .build(),
    new RoomBuilder({ h: 2200, w: 1000 })
        .withFloor()
        .withCeiling()
        .withTheme(RoomBackgroundTheme.Cave)
        .withDoor({ x: 940, y: 2110, destRoom: 2, destX: 100, destY: 50 })
        // First 3 to get height
        .withPlatform({ x: 0, y: 2100, w: 100, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 1 })
        .withPlatform({ x: 0, y: 2000, w: 100, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 2 })
        .withPlatform({ x: 0, y: 1900, w: 100, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 3 })
        // over and up
        .withPlatform({ x: 220, y: 1800, w: 100, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 4 })
        .withPlatform({ x: 440, y: 1700, w: 100, h: 50 })
        .withMonster({ x: 50, y: 1650, w: 900, h: 50, monsterType: MonsterType.OneEyedBat})
        .withPlatform({ x: 660, y: 1600, w: 100, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 6 })
        .withPlatform({ x: 880, y: 1500, w: 100, h: 50 })
        // zig zag
        .withPlatform({ x: 660, y: 1400, w: 100, h: 50 })
        .withMonster({ x: 50, y: 1350, w: 900, h: 50, monsterType: MonsterType.OneEyedBat})
        .withPlatform({ x: 880, y: 1300, w: 100, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 9 })
        .withPlatform({ x: 660, y: 1200, w: 100, h: 50 })
        .withPlatform({ x: 880, y: 1100, w: 100, h: 50 })
        // over and up
        .withPlatform({ x: 660, y: 1000, w: 100, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 12 })
        .withPlatform({ x: 440, y: 1000, w: 100, h: 50 })
        .withPlatform({ x: 150, y: 1050, w: 200, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 14 })
        .withPlatform({ x: 0, y: 950, w: 100, h: 50 })
        // zig zag
        .withPlatform({ x: 220, y: 850, w: 100, h: 50 })
        .withPlatform({ x: 0, y: 750, w: 100, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 17 })
        .withPlatform({ x: 220, y: 650, w: 100, h: 50 })
        .withPlatform({ x: 0, y: 550, w: 100, h: 50 })
        // over with drop
        .withPlatform({ x: 220, y: 450, w: 100, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 20 })
        .withMonster({ x: 50, y: 400, w: 900, h: 50, monsterType: MonsterType.OneEyedBat})
        .withPlatform({ x: 440, y: 350, w: 200, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 21 })
        .withPlatform({ x: 760, y: 450, w: 100, h: 50 })
        .withMonster({ monsterType: MonsterType.Centipede, plat: 22 })
        .withPlatform({ x: 900, y: 350, w: 100, h: 50 })
        // doubleJump
        .withPlatform({ x: 900, y: 250, w: 100, h: 50 })
        .withPlatform({ x: 0, y: 150, w: 450, h: 50 })
        .withPowerup(Powerup.IncreaseJumps(950, 200, 2, "Double Jump"))
        .withDoor({ x: 20, y: 60, destRoom: 4, destX: 1800, destY: 270 })
        .build(),
    new RoomBuilder({h: 800, w: 2000})
        .withTheme(RoomBackgroundTheme.Cave)
        .withDamageZoneFloor()
        .withCeiling()
        // entrace
        .withPlatform({x: 1700, y: 350, w: 300, h: 50})
        .withAnimatedElement({x: 1750, y: 370, type: AnimatedBackgroundElementType.LavaDrop1_Top, scale: 1})
        .withDoor({x: 1900, y: 253, destRoom: 3, destX: 120, destY: 80})
        .withAnimatedElement({x: 1840, y: 270, type: AnimatedBackgroundElementType.Torch1, scale: 1})
        .withAnimatedElement({x: 1770, y: 270, type: AnimatedBackgroundElementType.Torch1, scale: 1})
        .withAnimatedElement({x: 1700, y: 270, type: AnimatedBackgroundElementType.Torch1, scale: 1})
        // way out of lava
        .withPlatform({x: 1800, y: 530, w: 100, h: 50})
        .withPlatform({x: 1800, y: 710, w: 100, h: 50})
        .withAnimatedElement({x: 1750, y: 690, type: AnimatedBackgroundElementType.LavaDrop1_Drop, scale:1})
        // long jumps across
        .withPlatform({x: 1050, y: 540, w: 200, h: 50})
        .withMonster({ monsterType: MonsterType.Centipede, plat: 3 })
        .withPlatform({x: 520, y: 710, w: 100, h: 50})
        .withMonster({ monsterType: MonsterType.Centipede, plat: 4 })
        // climb up
        .withPlatform({x: 100, y: 700, w: 100, h: 50})
        .withPlatform({x: 100, y: 520, w: 100, h: 50})
        .withMonster({ monsterType: MonsterType.Centipede, plat: 6 })
        .withPlatform({x: 100, y: 340, w: 100, h: 50})
        .withPlatform({x: 0, y: 140, w: 200, h: 50})
        .withDoor({x: 0, y: 43, destRoom: 5, destX: 500, destY: 1870})
        .build(),
    new RoomBuilder({h: 2000, w: 600})
        .withTheme(RoomBackgroundTheme.Cave)
        .withDamageZoneFloor()
        .withCeiling()
        // entrance
        .withPlatform({x: 440, y: 1950, w: 200, h: 50})
        .withDoor({x: 555, y: 1853, destRoom: 4, destX: 100, destY: 50})
        .withPlatform({x: 100, y: 1800, w: 100, h: 50})
        .withPlatform({x: 400, y: 1600, w: 150, h: 50})
        .withMonster({ monsterType: MonsterType.Centipede, plat: 2 })
        .withMonster({x: 0, y: 1700, w: 600, h: 50, monsterType: MonsterType.OneEyedBat})
        .withPlatform({x: 500, y: 1400, w: 100, h: 50})
        .withPlatform({x: 250, y: 1200, w: 100, h: 50})
        .withPlatform({x: 0, y: 1000, w: 100, h: 50})
        .build()
];

export { StoryModeRooms }