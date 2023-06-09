import Item from "./Item";
export default class PlayerData {
  position: {
    x: number;
    y: number;
  };
  health: number;
  maxWeight: number;
  items: Item[];
  constructor(health = 3, maxWeight = 20) {
    this.position = {
      x: 100,
      y: 100,
    };
    this.health = health;
    this.maxWeight = maxWeight;
    this.items = [];
  }
}
