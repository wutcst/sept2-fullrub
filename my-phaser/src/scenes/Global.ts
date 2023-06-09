import DataManager from "~/data/DataManager";
import preloadAssetPackUrl from "../../static/assets/preload-asset-pack.json";
import PlayerData from "../data/PlayerData";
interface GlobalData {
  player: PlayerData;
  dataManager: DataManager;
}
export default class Global extends Phaser.Scene {
  constructor() {
    super("Global");
    //创建全局的对象
    const dataManager = new DataManager();
    const playerData = new PlayerData();
    dataManager.printf();
    this.dataManage = dataManager;
    this.playerData = playerData;
  }

  playerData: PlayerData;
  dataManage: DataManager;

  preload() {
    this.load.pack("pack", preloadAssetPackUrl);
  }

  create() {
    //Global要一直保持，不被销毁
    this.scene.launch("Preload");
  }
}
