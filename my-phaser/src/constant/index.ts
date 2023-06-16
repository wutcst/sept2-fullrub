import { ItemKind } from "../data/ItemInfo";
const COLLIDE_DIRECTION = "collide_direaction";
const doorPosition = {
  east: [190, 284],
  north: [336, 381],
  south: [331, 237],
  west: [463, 281],
};

const itemKind: ItemKind = {
  blade: {
    name: "刀",
    weight: 10,
    description: "这是一把刀",
    type: "blade",
    texture: "weapon_knife",
    scale: {
      x: 1,
      y: 1,
    },
  },
  magicWater: {
    name: "魔法药水",
    weight: 10,
    description: "使用药水能够增加负重",
    type: "magicWater",
    texture: "picture",
    scale: {
      x: 0.042425742271886446,
      y: 0.03638708198840965,
    },
  },
};
export { COLLIDE_DIRECTION, itemKind, doorPosition };
