import { json } from "stream/consumers";
import ItemInfo from "./ItemInfo";
export enum Direaction {
  NORTH,
  SOUTH,
  WEST,
  EAST,
}
interface Direactions {
  west?: Room | null;
  east?: Room | null;
  north?: Room | null;
  south?: Room | null;
}
/**
 * 房间数据
 * 包括房间中的物品
 * 房间的方向
 *
 */
export default class Room {
  id: number;
  name: string;
  description: string;
  direactions: Array<Room | null>;
  items: Array<ItemInfo | null>;

  constructor(name: string, description: string) {
    (this.name = name), (this.description = description);
    this.direactions = [null, null, null, null];
    this.items = [];
  }

  setDireactions({
    north = null,
    east = null,
    south = null,
    west = null,
  }: Direactions): void {
    this.direactions = [north, east, south, west];
  }
  /**
   *
   * @param room1
   * @param room2
   * @param direaction room1到room2的方向
   */
  static setDireactionBoth(room1: Room, room2: Room, direaction: Direaction) {
    //仅设置north和west,另外两个方向交换一下即可
    if (direaction == Direaction.SOUTH || direaction == Direaction.EAST) {
      let room = room1;
      room1 = room2;
      room2 = room;
    }

    //room1的north是room2
    if (direaction == Direaction.SOUTH || direaction == Direaction.NORTH) {
      room1.direactions[0] = room2;
      room2.direactions[2] = room1;
    }
    //room1的west是room2
    else {
      room1.direactions[3] = room2;
      room2.direactions[1] = room1;
    }
  }

  getNorth() {
    return this.direactions[0];
  }
  getEast() {
    return this.direactions[1];
  }
  getSouth() {
    return this.direactions[2];
  }
  getWest() {
    return this.direactions[3];
  }

  filterItems() {
    this.items = this.items.filter((item) => {
      if (item) {
        return true;
      }
    });
  }

  getSaveData() {
    let itemsInfo = [];
    this.items.forEach((item) => {
      itemsInfo.push(item.getSaveData());
    });
    let ids = [];
    this.direactions.forEach((item) => {
      if (!item || item.id == null || item.id == undefined) {
        ids.push(null);
      } else ids.push(item?.id);
    });
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      ids: JSON.stringify(ids),
      items: JSON.stringify(itemsInfo),
    };
  }
}
