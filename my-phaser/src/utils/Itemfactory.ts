import { Kind } from "../data/ItemInfo";
import { MagicWater } from "../data/Items/MagicWater";
import { Blade } from "../data/Items/Blade";
import ItemInfo from "../data/ItemInfo";
export default class Itemfactory {
  static create(type: Kind): ItemInfo {
    let obj = null;
    switch (type) {
      case "magicWater":
        obj = new MagicWater();
        break;
      case "blade":
        obj = new Blade();
    }
    return obj;
  }
}
