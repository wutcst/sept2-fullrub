// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface CollideDector {
  body: Phaser.Physics.Arcade.Body;
}
/**
 * 碰撞监测
 * 设置碰撞的方向，进而决定触发进入下一个房间
 */
export default class CollideDector extends Phaser.Physics.Arcade.Image {
  constructor(
    scene: Phaser.Scene,
    x?: number,
    y?: number,
    texture?: string,
    frame?: number | string
  ) {
    super(scene, x ?? 0, y ?? 0, texture || "__DEFAULT", frame);

    scene.physics.add.existing(this, false);
    this.body.setSize(32, 32, false);

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  public direaction: string = "";
  public newX: number = 0;
  public newY: number = 0;

  /* START-USER-CODE */

  // Write your code here.

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
