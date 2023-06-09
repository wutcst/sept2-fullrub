// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SceneInOut extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
  time = 1000;

  protected awake(): void {
    console.log("awake");
    this.execute(true);
  }
  execute(...args: any[]): void {
    console.log(args);
    let [fadIn] = args;
    //添加入场动画
    const scene = this.scene;
    const rect = scene.add
      .rectangle(
        0,
        0,
        scene.sys.canvas.width,
        scene.sys.canvas.height,
        0x000000
      )
      .setOrigin(0);
    if (fadIn) {
      scene.add.tween({
        targets: [rect],
        duration: this.time,
        props: {
          alpha: {
            from: 1,
            to: 0,
          },
        },
      });
    } else {
      scene.add.tween({
        targets: [rect],
        duration: this.time,
        props: {
          alpha: {
            from: 0,
            to: 1,
          },
        },
        onComplete: () => {
          console.log("场景关闭");
          scene.scene.stop();
        },
      });
    }
  }

  //场景关闭
  out(callback: Function) {
    this.execute(false);
    setTimeout(() => {
      callback();
    }, this.time);
  }
  // Write your code here.

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
