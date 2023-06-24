import DataManager from "~/data/DataManager";
import preloadAssetPackUrl from "../../static/assets/preload-asset-pack.json";
import PlayerData from "../data/PlayerData";
import { useViewStore } from "~/store";
import { getData } from "~/service";
import Itemfactory from "../utils/Itemfactory";
import Room from "../data/Room";
export default class Global extends Phaser.Scene {
  constructor() {
    super("Global");
    //创建全局的对象
    let dataManager = new DataManager();
    let playerData = new PlayerData();
    this.dataManager = dataManager;
    this.playerData = playerData;
  }

  playerData: PlayerData;
  dataManager: DataManager;
  text: Phaser.GameObjects.Text;

  preload() {
    this.load.pack("pack", preloadAssetPackUrl);
  }

  async readArchive() {
    //加载数据
    // const { archive } = useViewStore();
    let id = Number(localStorage.getItem("id"));
    if (id) {
      //请求后台读取数据构建
      console.log(id);
      getData(id).then((res) => {
        let { data } = res.data;
        let { playerData, currentRoom, history } = data.archive;
        playerData = JSON.parse(playerData);
        console.log(playerData);
        let { position, nowPosition, maxWeight, items } = playerData;
        console.log(maxWeight);
        this.playerData.position = position;
        this.playerData.nowPosition = nowPosition;
        this.playerData.maxWeight = maxWeight;
        this.playerData.items = items.map((item) =>
          Itemfactory.createByInfo(item)
        );

        let rooms = data.rooms;
        let hashMap = new Map();
        this.dataManager.rooms = rooms.map((item) => {
          let { id, name, description, items } = item;
          items = JSON.parse(items);
          let room = new Room(name, description);
          room.id = id;
          room.items = items.map((item) => Itemfactory.createByInfo(item));
          room.direactions = [];
          hashMap.set(id, room);
          return room;
        });
        this.dataManager.rooms = rooms.map((item) => {
          let { ids, id } = item;
          let theRoom = hashMap.get(id);
          let idArr = JSON.parse(ids);
          idArr.map((theId: number) => {
            if (item) theRoom.direactions.push(hashMap.get(theId));
            else theRoom.direactions.push(null);
          });
          return theRoom;
        });
        this.dataManager.currentRoom = hashMap.get(currentRoom);
        let _history = JSON.parse(history);
        console.log(_history);
        this.dataManager.history = _history.map((item) => ({
          room: hashMap.get(item.id),
          direction: item.direction,
        }));
        console.log(this.dataManager);
      });
    }
  }

  async create() {
    await this.readArchive();
    //Global要一直保持，不被销毁
    //设置全局标题
    this.text = this.add.text(216, 60, "巨洞冒险", {
      fontFamily: "Arial Black",
      fontSize: 52,
    });
    this.text.setStroke("#000000", 4);
    //  Apply the gradient fill.
    const gradient = this.text.context.createLinearGradient(
      0,
      0,
      0,
      this.text.height
    );
    gradient.addColorStop(0, "#111111");
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(0.5, "#aaaaaa");
    gradient.addColorStop(1, "#111111");

    this.text.setFill(gradient);
    this.scene.launch("Preload");
  }
}
