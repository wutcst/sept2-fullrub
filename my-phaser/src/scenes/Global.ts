import DataManager from "~/data/DataManager";
import preloadAssetPackUrl from "../../static/assets/preload-asset-pack.json";
import PlayerData from "../data/PlayerData";
import { useViewStore } from "~/store";
export default class Global extends Phaser.Scene {
  constructor() {
    super("Global");
    //创建全局的对象
    let dataManager = new DataManager();
    let playerData = new PlayerData();
    //加载数据
    const { archive } = useViewStore();
    if (archive) {
      console.log(archive.id);
      //请求后台读取数据构建
    }
    this.dataManager = dataManager;
    this.playerData = playerData;
  }

  playerData: PlayerData;
  dataManager: DataManager;
  text: Phaser.GameObjects.Text;
  preload() {
    this.load.pack("pack", preloadAssetPackUrl);
  }

  create() {
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
