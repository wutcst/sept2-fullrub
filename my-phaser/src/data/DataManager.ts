//software test
import Room, { Direaction } from "./Room";
import Item from "./Item";
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

  printf() {
    this.rooms.forEach((item) => {
      console.log("--------------" + item.name + "--------------", ":");
      let ans = "";
      item.direactions.forEach((dir, index) => {
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
