import ItemInfo from "./ItemInfo";
import { itemKind } from "~/constant";
/**
 * 用户数据
 * 包括重量，物品，位置等等
 */
export default class PlayerData {
  position: {
    x: number;
    y: number;
  };
  nowPosition: {
    x: number;
    y: number;
  };
  health: number;
  maxWeight: number;
  items: Array<ItemInfo | null>;
  constructor(health = 3, maxWeight = 50) {
    this.position = {
      x: 279,
      y: 320,
    };
    this.nowPosition = {
      x: 279,
      y: 320,
    };
    this.health = health;
    this.maxWeight = maxWeight;
    let { blade } = itemKind;
    this.items = [
      new ItemInfo(blade?.name, blade?.weight, blade?.description, blade?.type),
      new ItemInfo(blade?.name, blade?.weight, blade?.description, blade?.type),
      new ItemInfo(blade?.name, blade?.weight, blade?.description, blade?.type),
      new ItemInfo(blade?.name, blade?.weight, blade?.description, blade?.type),
    ];
  }

  setNewPosition(position: { x: number; y: number }) {
    this.position = position;
  }

  addItem(item: ItemInfo): boolean {
    let nowSumWeight = this.getSumWeight();
    let theSum = nowSumWeight + item.weight;
    if (theSum <= this.maxWeight) {
      this.items.push(item);
      return true;
    }
    return false;
  }

  useItem(item: ItemInfo) {
    this.items = this.items.filter((i) => {
      if (i !== item) {
        return true;
      }
    });
  }

  filtersItem() {
    this.items = this.items.filter((item) => {
      if (item) return true;
    });
  }

  getSumWeight() {
    let sum = this.items.reduce((pre, item) => {
      return (pre += item?.weight ?? 0);
    }, 0);
    return sum;
  }

  getSaveData() {
    this.filtersItem();
    let itemsInfo = [];
    this.items.forEach((item) => {
      itemsInfo.push(item.getSaveData());
    });
    return {
      position: this.position,
      nowPosition: this.nowPosition,
      maxWeight: this.maxWeight ?? 50,
      items: itemsInfo,
    };
  }
}
