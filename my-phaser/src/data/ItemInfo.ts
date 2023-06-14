export interface ItemInterface {
  name: string;
  weight: number;
  description: string;
  type: Kind;
}
export type Kind = "blade" | "exit";
export type ItemKind = {
  [k in Kind]?: ItemInterface;
};
export default class ItemInfo {
  x: number;
  y: number;
  isSelected: boolean;
  weight: number;
  name: string;
  /**物品的种类，根据type创建对应类 */
  type: Kind;
  description: string;
  constructor(
    name = "物品",
    weight = 10,
    description = "这是一个物品",
    type: Kind = "blade"
  ) {
    this.x = 0;
    this.y = 0;
    this.isSelected = false;
    this.weight = weight;
    this.name = name;
    this.description = description;
    this.type = type;
  }
  getItemInterface(): ItemInterface {
    return {
      name: this.name,
      weight: this.weight,
      description: this.description,
      type: this.type,
    };
  }

  getBackPackDes(): string {
    return `name:${this.name}\ntype:${this.type}\n${this.description}`;
  }

  toString(): string {
    return `x:${this.x},y:${this.y},type:${this.type}`;
  }
}
