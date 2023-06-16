// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Player from "../prefabs/Player";
import CollideDector from "../prefabs/CollideDector";
import AlertText from "../prefabs/AlertText";
import OpenScript from "../script-nodes/OpenScript";
/* START-USER-IMPORTS */
import inject from "~/utils/inject";
import { createSpeechBubble } from "~/game";
import SceneInOut from "../script-nodes/SceneInOut";
/* END-USER-IMPORTS */

export default class BaseScene extends Phaser.Scene {
  constructor() {
    super("BaseScene");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // tilemap
    const tilemap = this.add.tilemap("same-scene");
    tilemap.addTilesetImage("dungeon", "dungeon_tiles");

    // ground_1
    tilemap.createLayer("ground", ["dungeon"], -13, -91);

    // wall_1
    tilemap.createLayer("wall", ["dungeon"], -13, -91);

    // player
    const player = new Player(this, 279, 320);
    this.add.existing(player);

    // container_1
    const container_1 = this.add.container(0, 0);

    // collideDector_1
    const collideDector_1 = new CollideDector(this, 329, 419);
    collideDector_1.alpha = 0;
    collideDector_1.alphaTopLeft = 0;
    collideDector_1.alphaTopRight = 0;
    collideDector_1.alphaBottomLeft = 0;
    collideDector_1.alphaBottomRight = 0;
    container_1.add(collideDector_1);

    // collideDector
    const collideDector = new CollideDector(this, 500, 287);
    collideDector.alpha = 0;
    collideDector.alphaTopLeft = 0;
    collideDector.alphaTopRight = 0;
    collideDector.alphaBottomLeft = 0;
    collideDector.alphaBottomRight = 0;
    container_1.add(collideDector);

    // collideDector_2
    const collideDector_2 = new CollideDector(this, 147, 286);
    collideDector_2.alpha = 0;
    collideDector_2.alphaTopLeft = 0;
    collideDector_2.alphaTopRight = 0;
    collideDector_2.alphaBottomLeft = 0;
    collideDector_2.alphaBottomRight = 0;
    container_1.add(collideDector_2);

    // collideDector_3
    const collideDector_3 = new CollideDector(this, 330, 177);
    collideDector_3.alpha = 0;
    collideDector_3.alphaTopLeft = 0;
    collideDector_3.alphaTopRight = 0;
    collideDector_3.alphaBottomLeft = 0;
    collideDector_3.alphaBottomRight = 0;
    container_1.add(collideDector_3);

    // north_1
    tilemap.createLayer("north", ["dungeon"], -14, -100);

    // west_1
    tilemap.createLayer("west", ["dungeon"], -17, -96);

    // east_1
    tilemap.createLayer("east", ["dungeon"], -8, -91);

    // south_1
    tilemap.createLayer("south", ["dungeon"], -11, -91);

    // text_1
    const text_1 = this.add.text(295.5, 111, "", {});
    text_1.text = "xxxx";
    text_1.setStyle({ align: "center", color: "#ebf935ff", fontSize: "20px" });

    // alertText
    const alertText = new AlertText(this, 281.5, 54);
    this.add.existing(alertText);
    alertText.setStyle({ color: "#f62222ff", fontSize: "20px" });

    // openScript
    new OpenScript(this);

    // collideDector_1 (prefab fields)
    collideDector_1.direaction = "south";
    collideDector_1.newX = 331;
    collideDector_1.newY = 236;

    // collideDector (prefab fields)
    collideDector.direaction = "east";
    collideDector.newX = 190;
    collideDector.newY = 284;

    // collideDector_2 (prefab fields)
    collideDector_2.direaction = "west";
    collideDector_2.newX = 463;
    collideDector_2.newY = 281;

    // collideDector_3 (prefab fields)
    collideDector_3.direaction = "north";
    collideDector_3.newX = 336;
    collideDector_3.newY = 381;

    this.player = player;
    this.container_1 = container_1;
    this.text_1 = text_1;
    this.alertText = alertText;
    this.tilemap = tilemap;

    this.events.emit("scene-awake");
  }

  private player!: Player;
  private container_1!: Phaser.GameObjects.Container;
  private text_1!: Phaser.GameObjects.Text;
  private alertText!: AlertText;
  private tilemap!: Phaser.Tilemaps.Tilemap;

  /* START-USER-CODE */
  private isOverlap = false;

  private qkeyDownAndOverlap = false;

  private itemContainer!: Phaser.GameObjects.Container;

  private tipContainer!: Phaser.GameObjects.Container | null;

  private timer: any;

  init(data: { show: boolean; x?: number; y?: number } = { show: true }) {
    console.log("data:", data);
    const { global } = inject(this);
    if (Object.keys(data).length == 0 || data.show) {
      new SceneInOut(this);
    } else if (data.x && data.y) {
      global.playerData.position.x = data.x;
      global.playerData.position.y = data.y;
    }
  }
  /**
   * 场景创建时
   */
  create() {
    console.log("create");
    this.isOverlap = false;
    this.qkeyDownAndOverlap = false;
    this.itemContainer = this.add.container();
    this.itemContainer.setDepth(10);
    this.editorCreate();
    //创建完成后
    let { global } = inject(this);
    global.dataManager.currentRoom.filterItems();

    this.player.setDepth(10);
    this.addColliderWall();
    // 监听与door的碰撞
    this.physics.add.overlap(
      this.player,
      this.container_1.list,
      (first: any, second: any) => {
        if (!this.isOverlap) {
          let dir = second.body.gameObject.direaction;
          let x = second.body.gameObject.newX;
          let y = second.body.gameObject.newY;
          this.nextRoom(dir, { x, y });
          this.isOverlap = !this.isOverlap;
        }
      }
    );
    //根据data创建场景
    this.initData();
    //监听与物品的overlap
    // 添加重叠检测
    this.physics.add.overlap(
      this.player,
      this.itemContainer.list,
      (player, item) => {
        if (this.tipContainer) this.tipContainer.destroy();
        // 重叠开始时，创建一个新的提示框
        let { x, y } = item as any;
        this.tipContainer = createSpeechBubble(
          this,
          x,
          y - 40,
          40,
          40,
          "点击Q\n拾取"
        );
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          if (this.tipContainer) {
            this.tipContainer!.destroy();
          }
        }, 200);
      }
    );
    //按q拾取
    let qKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    let overlap: Phaser.Physics.Arcade.Collider;
    qKey.on("down", () => {
      let once = false;
      console.log("注册事件");
      overlap = this.physics.add.overlap(
        this.player,
        this.itemContainer.list,
        (first, second) => {
          if (!this.qkeyDownAndOverlap) {
            //按下后,判断是否重叠，如果重叠则拾取
            let i = this.itemContainer.list.indexOf(second as any);
            let item = global.dataManager.currentRoom.items[i];
            if (item && global.playerData.addItem(item)) {
              global.dataManager.currentRoom.items[i] = null;
              second.destroy();
              this.qkeyDownAndOverlap = true;
              this.scene.restart({
                show: false,
                x: this.player.x,
                y: this.player.y,
              });
            } else {
              console.log("拾取失败");
              if (!once) {
                // this.alertText.alert("容量不足");
                window.$message.warning("容量不足");
                once = true;
              }
            }
          }
        }
      );
    });
    qKey.on("up", () => {
      console.log("删除事件");
      if (overlap) {
        overlap.destroy();
      }
    });
  }
  /**
   * 根据全局数据进行初始化
   */
  initData() {
    let { global } = inject(this);
    //设置游戏文本
    let room = global.dataManager.currentRoom;
    this.text_1.setText(room.description);

    //设置玩家坐标
    let { x, y } = global.playerData.position;
    this.player.setPosition(x, y);

    //设置场景地图
    let keys = ["north", "east", "south", "west"];
    for (let i = 0; i < 4; i++) {
      //为null则设置墙
      if (!room.direactions[i]) {
        this.addColliderWall(keys[i]);
      } else {
        this.setLayerInVisble(keys[i]);
      }
    }

    //设置物品
    let { items } = room;
    if (items) {
      items.forEach((item) => {
        // arcadeimage_1
        if (item) {
          let { x, y, texture, scale } = item;
          const arcadeimage_1 = this.physics.add.image(x, y, texture);

          arcadeimage_1.scaleX = scale.x;
          arcadeimage_1.scaleY = scale.y;
          arcadeimage_1.body.setSize(13, 6, false);

          this.itemContainer.add(arcadeimage_1);
        }
      });
    }
  }

  /**
   * 场景更新时
   * @param time
   * @param delta
   */
  update(time: number, delta: number): void {
    this.player.update();
  }
  /**
   * 场景重建时清理之前的场景
   */
  cleanUp() {
    console.log("摧毁");
    this.children.removeAll(true);
    this.physics.world.shutdown();
    this.input.keyboard!.removeAllListeners();
  }
  /**
   * 场景重建
   */
  restart() {
    this.cleanUp();
    this.registry.destroy();
    this.scene.restart({ show: true });
  }
  /**
   * 常见指定图层并增加碰撞
   * @param layerKey 图层的名称
   */
  addColliderWall(layerKey = "wall") {
    const wall = this.tilemap.getLayer(layerKey)?.tilemapLayer;
    if (wall) {
      //   this.physics.add.existing(wall);
      //必须两个都存在才行
      wall?.setCollisionByProperty({ collides: true });
      this.physics.add.collider(this.player, wall);
    }
  }
  /**
   * 设置door layer不可见
   */
  setLayerInVisble(layerKey: string) {
    const wall = this.tilemap.getLayer(layerKey)?.tilemapLayer;
    if (wall) {
      wall.setVisible(false);
    }
  }
  /**
   * 下一个房间
   * @param direaction 方向
   */
  nextRoom(direaction: string, newPosition: { x: number; y: number }) {
    const { global } = inject(this);
    global.dataManager.goNext(direaction);
    global.playerData.setNewPosition(newPosition);
    this.restart();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
