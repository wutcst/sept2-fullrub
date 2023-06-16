import ItemInfo from "../ItemInfo";
import PlayerData from "../PlayerData";
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
