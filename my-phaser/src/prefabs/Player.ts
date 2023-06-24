// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import inject from "../utils/inject";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Player {
  body: Phaser.Physics.Arcade.Body;
}
/**
 * 玩家类
 * 玩家的物理系统，包括行走动画和位置
 */
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x?: number,
    y?: number,
    texture?: string,
    frame?: number | string
  ) {
    super(
      scene,
      x ?? 385,
      y ?? 397,
      texture || "fauna_1",
      frame ?? "walk-down-3.png"
    );

    scene.physics.add.existing(this, false);
    this.body.setSize(32, 32, false);

    /* START-USER-CTR-CODE */
    // Write your code here.
    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
    }
    /* END-USER-CTR-CODE */
  }

  public speed: number = 200;

  /* START-USER-CODE */
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  // Write your code here.
  update(...args: any[]): void {
    let { left, right, up, down } = this.cursors;
    let { global } = inject(this.scene);
    global.playerData.nowPosition = {
      x: this.x,
      y: this.y,
    };
    this.setVelocity(0, 0);
    if (left.isDown) {
      this.setVelocityX(-this.speed);
      //水平翻转
      this.setFlipX(true);
      this.play("run-side", true);
    } else if (right.isDown) {
      //水平翻转
      this.setFlipX(false);
      this.setVelocityX(this.speed);
      this.play("run-side", true);
    } else if (up.isDown) {
      this.setVelocityY(-this.speed);
      this.play("run-up", true);
    } else if (down.isDown) {
      this.setVelocityY(this.speed);
      this.play("run-down", true);
    } else {
      //强制转化为walk,也可以更具方向选择
      this.play("walk");
    }
  }
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
