export default class Item {
  weight: number;
  name: string;
  description: string;
  constructor(name = "物品", weight = 10, description = "这是一个物品") {
    this.weight = weight;
    this.name = name;
    this.description = description;
  }
}
