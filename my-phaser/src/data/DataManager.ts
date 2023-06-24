//software test
import Room, { Direaction } from "./Room";
import { itemArea } from "~/config";
import { itemKind } from "~/constant";
import { doorPosition } from "~/constant";
import Itemfactory from "../utils/Itemfactory";
interface RoomDirection {
  room: Room;
  direction: "north" | "south" | "east" | "west";
}
/**
 * 数据管理类
 * 在全局的数据管理，博爱阔房间，当前房间和历史记录
 */
export default class DataManager {
  rooms: Room[];
  currentRoom: Room;
  history: RoomDirection[] = [];
  constructor() {
    this.rooms = [];
    // this.currentRoom = new Room("entry", "这是一个初始房间");
    // this.initRooms();
  }
  initRooms() {
    const room1 = new Room("1号", "这是1");
    const room2 = new Room("2号", "这是2");
    const room3 = new Room("3号", "这是3");
    const room4 = new Room("4号", "这是4");
    const room5 = new Room("5号", "这是5");
    const room6 = new Room("6号", "这是6");
    const room7 = new Room("7号", "这是7");
    const room8 = new Room("8号", "这是8");
    const room9 = new Room("9号", "这是9");

    this.initRandomItems(room1, Math.floor(Math.random() * 4));
    this.initRandomItems(room2, Math.floor(Math.random() * 4));
    this.initRandomItems(room3, Math.floor(Math.random() * 4));
    this.initRandomItems(room4, Math.floor(Math.random() * 4));
    this.initRandomItems(room5, Math.floor(Math.random() * 4));
    this.initRandomItems(room6, Math.floor(Math.random() * 4));
    this.initRandomItems(room7, Math.floor(Math.random() * 4));
    this.initRandomItems(room8, Math.floor(Math.random() * 4));

    this.rooms.push(room1);
    this.rooms.push(room2);
    this.rooms.push(room3);
    this.rooms.push(room4);
    this.rooms.push(room5);
    this.rooms.push(room6);
    this.rooms.push(room7);
    this.rooms.push(room8);
    this.rooms.push(room9);

    this.rooms = this.rooms.map((item, index) => {
      item.id = index + 1;
      return item;
    });

    this.currentRoom = room1;

    Room.setDireactionBoth(room1, room2, Direaction.WEST);
    Room.setDireactionBoth(room1, room3, Direaction.EAST);
    Room.setDireactionBoth(room1, room4, Direaction.NORTH);
    Room.setDireactionBoth(room4, room5, Direaction.WEST);
    Room.setDireactionBoth(room4, room6, Direaction.EAST);
    Room.setDireactionBoth(room4, room8, Direaction.NORTH);
    Room.setDireactionBoth(room9, room8, Direaction.WEST);
    Room.setDireactionBoth(room7, room8, Direaction.EAST);
    Room.setDireactionBoth(room6, room9, Direaction.NORTH);
  }
  initRandomItems(room: Room, num: number) {
    let list = [];
    for (let i = 0; i < num; i++) {
      let keys = Object.keys(itemKind);

      let index = Math.floor(Math.random() * keys.length);
      let key = keys[index] as string;
      console.log(key);
      let info = itemKind[key];
      let item = Itemfactory.create(info.type);
      item.x =
        Math.floor(
          Math.random() * (itemArea.rightBottomX - itemArea.leftTopX)
        ) + itemArea.leftTopX;
      item.y =
        Math.floor(
          Math.random() * (itemArea.rightBottomY - itemArea.leftTopY)
        ) + itemArea.leftTopY;
      list.push(item);
    }
    room.items = list;
  }

  printf() {
    this.rooms.forEach((room) => {
      console.log("--------------" + room.name + "--------------", ":");
      let ans = "";
      room.direactions.forEach((dir, index) => {
        ans +=
          index == 0
            ? "上"
            : index == 1
            ? "右"
            : index == 2
            ? "下"
            : index == 3
            ? "左"
            : "";
        ans += ":";
        ans += dir?.name;
        ans += "  ";
      });
      console.log(ans);
      room.items.forEach((item) => {
        console.log(item!.toString());
      });
    });
  }

  goNext(direction: string) {
    let current = this.currentRoom;
    let rightDir = "";
    switch (direction) {
      case "north":
        this.currentRoom = this.currentRoom.getNorth()!;
        rightDir = "south";
        break;
      case "south":
        this.currentRoom = this.currentRoom.getSouth()!;
        rightDir = "north";
        break;
      case "east":
        this.currentRoom = this.currentRoom.getEast()!;
        rightDir = "west";
        break;
      case "west":
        rightDir = "east";
        this.currentRoom = this.currentRoom.getWest()!;
        break;
    }
    this.recording(current, rightDir);
  }

  recording(room: Room, direction: any) {
    this.history.push({
      room,
      direction,
    });
  }

  back(): {
    x?: number;
    y?: number;
    isOk: boolean;
  } {
    console.log(this.history);
    if (this.history.length > 0) {
      let roomDireaciton = this.history.pop();
      this.currentRoom = roomDireaciton.room;
      let theDir = doorPosition[roomDireaciton.direction];
      return {
        x: theDir[0],
        y: theDir[1],
        isOk: true,
      };
    }
    return {
      isOk: false,
    };
  }

  getSaveData() {
    let _rooms = this.rooms.map((item) => item.getSaveData());
    let _history = this.history.map((item) => ({
      id: item.room.id,
      direction: item.direction,
    }));
    return {
      rooms: _rooms,
      currentRoom: this.currentRoom.getSaveData(),
      history: _history,
    };
  }
}
