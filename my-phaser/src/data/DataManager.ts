//software test
import Room, { Direaction } from "./Room";
import ItemInfo from "./ItemInfo";
import { itemArea } from "~/config";
import { itemKind } from "~/constant";
import { doorPosition } from "~/constant";
import Itemfactory from "../utils/Itemfactory";
interface RoomDirection {
  room: Room;
  direction: "north" | "south" | "east" | "west";
}

export default class DataManager {
  rooms: Room[];
  currentRoom: Room;
  history: RoomDirection[] = [];
  constructor() {
    this.rooms = [];
    this.currentRoom = new Room("entry", "这是一个初始房间");
    this.initRooms();
  }
  initRooms() {
    const room1 = new Room("1", "这是1");
    const room2 = new Room("2", "这是2");
    const room3 = new Room("3", "这是3");
    const room4 = new Room("4", "这是4");
    const overRoom = new Room("over", "这是over");

    this.initRandomItems(room1, 3);
    this.initRandomItems(room2, 3);
    this.initRandomItems(room3, 3);
    this.initRandomItems(room4, 3);

    this.rooms.push(room1);
    this.rooms.push(room2);
    this.rooms.push(room3);
    this.rooms.push(room4);
    this.rooms.push(overRoom);

    this.currentRoom = room1;

    Room.setDireactionBoth(room1, room2, Direaction.NORTH);
    Room.setDireactionBoth(room1, room4, Direaction.WEST);
    Room.setDireactionBoth(room1, room3, Direaction.EAST);
    Room.setDireactionBoth(room2, overRoom, Direaction.EAST);
    Room.setDireactionBoth(room3, overRoom, Direaction.NORTH);
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

  goNext(direaction: string) {
    let current = this.currentRoom;
    let rightDir = "";
    switch (direaction) {
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
    let _history = this.history.map((item) => item.room.id);
    return {
      rooms: _rooms,
      currentRoom: this.currentRoom.getSaveData(),
      history: _history,
    };
  }
}
