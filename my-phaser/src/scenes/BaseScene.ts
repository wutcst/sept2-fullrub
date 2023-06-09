// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Player from "../prefabs/Player";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class BaseScene extends Phaser.Scene {
  constructor() {
    super("BaseScene");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // dungeon
    const dungeon = this.add.tilemap("dungeon");
    dungeon.addTilesetImage("dungeon", "dungeon_tiles");

    // ground_1
    dungeon.createLayer("Ground", ["dungeon"], 0, 0);

    // walls_1
    dungeon.createLayer("Walls", ["dungeon"], 0, 0);

    // player
    const player = new Player(this, 188, 337);
    this.add.existing(player);

    this.player = player;
    this.dungeon = dungeon;

    this.events.emit("scene-awake");
  }

  private player!: Player;
  private dungeon!: Phaser.Tilemaps.Tilemap;

  /* START-USER-CODE */
  // Write your code here

  create() {
    this.editorCreate();
    this.inject();
    // this.player.setPosition(100, 100);
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
