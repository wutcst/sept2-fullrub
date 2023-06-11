import ItemInfo from "./ItemInfo";
import { itemKind } from "~/constant";
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
  constructor(health = 3, maxWeight = 20) {
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
}
