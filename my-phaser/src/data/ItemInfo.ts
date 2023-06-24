import { Interface } from "readline";
import PlayerData from "./PlayerData";
interface Scale {
  x: number;
  y: number;
}
export interface ItemInterface {
  name: string;
  weight: number;
  description: string;
  type: Kind;
  texture: string;
  scale: Scale;
}
export type Kind = "blade" | "magicWater" | "exit";
export type ItemKind = {
  [k in Kind]?: ItemInterface;
};
/**
 * 物品信息，包括重量以及use()
 */
export default class ItemInfo {
  x: number;
  y: number;
  isSelected: boolean;
  name: string;
  description: string;
  weight: number;
  texture: string;
  scale: Scale;
  /**物品的种类，根据type创建对应类 */
  type: Kind;
  constructor(
    name = "物品",
    weight = 10,
    description = "这是一个物品",
    type: Kind = "blade",
    texture: string = "weapon_knife",
    scale: {
      x: number;
      y: number;
    } = {
      x: 1,
      y: 1,
    }
  ) {
    this.x = 0;
    this.y = 0;
    this.isSelected = false;
    this.weight = weight;
    this.name = name;
    this.description = description;
    this.type = type;
    this.texture = texture;
    this.scale = scale;
  }
  getItemInterface(): ItemInterface {
    return {
      name: this.name,
      weight: this.weight,
      description: this.description,
      type: this.type,
      texture: this.texture,
      scale: this.scale,
    };
  }

  use(player: PlayerData): boolean {
    return false;
  }

  getBackPackDes(): string {
    return `name:${this.name}\ntype:${this.type}\n${this.description}\nweight:${this.weight}`;
  }

  toString(): string {
    return `x:${this.x},y:${this.y},type:${this.type}`;
  }

  getSaveData() {
    return {
      x: this.x,
      y: this.y,
      name: this.name,
      description: this.description,
      weight: this.weight,
      type: this.type,
    };
  }
}
