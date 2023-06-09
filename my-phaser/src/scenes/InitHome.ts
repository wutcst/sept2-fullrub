// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Player from "../prefabs/Player";
import SceneInOut from "../script-nodes/SceneInOut";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class InitHome extends Phaser.Scene {
  constructor() {
    super("BaseHome");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // space
    const space = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // map
    const map = this.add.tilemap("init-scene");
    map.addTilesetImage("dungeon", "dungeon_tiles");

    // ground_1
    map.createLayer("ground", ["dungeon"], 0, 0);

    // wall_1
    map.createLayer("wall", ["dungeon"], 0, 0);

    // door_1
    map.createLayer("door", ["dungeon"], 0, 0);

    // ellipse_1
    const ellipse_1 = this.add.ellipse(336, 284, 128, 128);
    ellipse_1.scaleX = 0.41521475468259583;
    ellipse_1.scaleY = 0.36636199163825234;
    ellipse_1.alpha = 0;
    ellipse_1.isFilled = true;

    // player
    const player = new Player(this, 305, 392);
    this.add.existing(player);

    // sceneInOut
    const sceneInOut = new SceneInOut(this);

    this.ellipse_1 = ellipse_1;
    this.player = player;
    this.sceneInOut = sceneInOut;
    this.space = space;
    this.map = map;

    this.events.emit("scene-awake");
  }

  private ellipse_1!: Phaser.GameObjects.Ellipse;
  private player!: Player;
  private sceneInOut!: SceneInOut;
  private space!: Phaser.Input.Keyboard.Key;
  private map!: Phaser.Tilemaps.Tilemap;

  /* START-USER-CODE */
  // Write your code here

  create() {
    this.editorCreate();
    this.inject();

    const wall = this.map.getLayer("wall")?.tilemapLayer;
    if (wall) {
      //   this.physics.add.existing(wall);
      //必须两个都存在才行
      wall?.setCollisionByProperty({ collides: true });
      this.physics.add.collider(this.player, wall, () => console.log("你好"));
    }
    this.physics.add.existing(this.ellipse_1);
    this.physics.add.overlap(this.player, this.ellipse_1, () => {
      this.scene.start("BaseScene");
    });
  }
  update(time: number, delta: number): void {
    this.player.update();
  }
  inject() {
    //全局注入
    const global = this.scene.get("Global") as unknown as Global;
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
