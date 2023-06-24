import ItemInfo from "../ItemInfo";
import PlayerData from "../PlayerData";
/**
 * 物品MagicWater的基本信息
 * 重载了use方法，能够返回是否可以使用，同时也能产生相应的效果
 */
export class MagicWater extends ItemInfo {
  constructor() {
    super("魔力药水", 10, "喝了增加负重", "magicWater", "picture", {
      x: 0.042425742271886446,
      y: 0.03638708198840965,
    });
  }
  use(player: PlayerData): boolean {
    player.maxWeight *= 2;
    return true;
  }
}
