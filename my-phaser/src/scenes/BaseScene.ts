// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Player from "../prefabs/Player";
import CollideDector from "../prefabs/CollideDector";
import SceneInOut from "../script-nodes/SceneInOut";
/* START-USER-IMPORTS */
import inject from "~/utils/inject";
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
		const text_1 = this.add.text(245, 112, "", {});
		text_1.text = "xxxxxxxxxxxxxxxx";
		text_1.setStyle({ "align": "center", "fontSize": "20px" });

		// sceneInOut
		new SceneInOut(this);

		// collideDector_1 (prefab fields)
		collideDector_1.direaction = "south";

		// collideDector (prefab fields)
		collideDector.direaction = "east";

		// collideDector_2 (prefab fields)
		collideDector_2.direaction = "west";

		// collideDector_3 (prefab fields)
		collideDector_3.direaction = "north";

		this.player = player;
		this.container_1 = container_1;
		this.text_1 = text_1;
		this.tilemap = tilemap;

		this.events.emit("scene-awake");
	}

	private player!: Player;
	private container_1!: Phaser.GameObjects.Container;
	private text_1!: Phaser.GameObjects.Text;
	private tilemap!: Phaser.Tilemaps.Tilemap;

	/* START-USER-CODE */
  private isOverlap = false;
  // Write your code here

  /**
   * 场景创建时
   */
  create() {
    this.isOverlap = false;
    this.editorCreate();
    this.addColliderWall();
    // 监听与door的碰撞
    this.physics.add.overlap(
      this.player,
      this.container_1.list,
      (first: any, second: any) => {
        if (!this.isOverlap) {
          let dir = second.body.gameObject.direaction;
          this.nextRoom(dir);
          this.isOverlap = !this.isOverlap;
        }
      }
    );
    //根据data创建场景
    this.initData();
  }

  initData() {
    let { global } = inject(this);
    let room = global.dataManager.currentRoom;
    this.text_1.setText(room.description);
    // let [north, east, south, west] = room.direactions;
    // console.log([north, east, south, west]);
    let keys = ["north", "east", "south", "west"];
    for (let i = 0; i < 4; i++) {
      console.log(i);
      //为null则设置墙
      if (!room.direactions[i]) {
        this.addColliderWall(keys[i]);
      } else {
        this.setLayerInVisble(keys[i]);
      }
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
    this.scene.restart();
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
      //   this.physics.add.existing(wall);
      //必须两个都存在才行
      wall.setVisible(false);
    }
  }
  /**
   * 下一个房间
   * @param direaction 方向
   */
  nextRoom(direaction: string) {
    const { global } = inject(this);
    global.dataManager.goNext(direaction);
    this.restart();
  }
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
