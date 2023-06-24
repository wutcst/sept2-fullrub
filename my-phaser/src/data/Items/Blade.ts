import ItemInfo from "../ItemInfo";
/**
 * 物品Blade
 * 基本信息
 */
export class Blade extends ItemInfo {
  constructor() {
    super("刀", 10, "一把飞刀", "blade", undefined, {
      x: 1,
      y: 1,
    });
  }
}
