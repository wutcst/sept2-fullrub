import DataManager from "~/data/DataManager";
import preloadAssetPackUrl from "../../static/assets/preload-asset-pack.json";
import PlayerData from "../data/PlayerData";
export default class Global extends Phaser.Scene {
  constructor() {
    super("Global");
    //创建全局的对象
    const dataManager = new DataManager();
    const playerData = new PlayerData();
    dataManager.printf();
    this.dataManager = dataManager;
    this.playerData = playerData;
  }

  playerData: PlayerData;
  dataManager: DataManager;
  preload() {
    this.load.pack("pack", preloadAssetPackUrl);
  }

  create() {
    //Global要一直保持，不被销毁
    //设置全局标题
    const text = this.add.text(216, 60, "巨洞冒险", {
      fontFamily: "Arial Black",
      fontSize: 52,
    });
    text.setStroke("#000000", 4);
    //  Apply the gradient fill.
    const gradient = text.context.createLinearGradient(0, 0, 0, text.height);
    gradient.addColorStop(0, "#111111");
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(0.5, "#aaaaaa");
    gradient.addColorStop(1, "#111111");

    text.setFill(gradient);
    this.scene.launch("Preload");
  }
}
