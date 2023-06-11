//software test
import Room, { Direaction } from "./Room";
import ItemInfo from "./ItemInfo";
import { itemArea } from "~/config";
import { itemKind } from "~/constant";
export default class DataManager {
  rooms: Room[];
  currentRoom: Room;
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
      // let key = keys[index] as string;
      let info = itemKind.blade!;
      let item = new ItemInfo(info.name, info.weight, "", info.type);
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
    switch (direaction) {
      case "north":
        this.currentRoom = this.currentRoom.getNorth()!;
        break;
      case "south":
        this.currentRoom = this.currentRoom.getSouth()!;
        break;
      case "east":
        this.currentRoom = this.currentRoom.getEast()!;
        break;
      case "west":
        this.currentRoom = this.currentRoom.getWest()!;
        break;
    }
  }
}
