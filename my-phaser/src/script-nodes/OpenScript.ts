// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ScriptNode from "../script-nodes-basic/ScriptNode";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OpenScript extends ScriptNode {
  constructor(
    parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene
  ) {
    super(parent);

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */
  protected awake(): void {
    let theScene = this.scene.scene;

    let iKey = this.scene.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.I
    );
    iKey?.on("down", () => {
      theScene.pause("BaseScene");
      theScene.launch("BackPack");
    });
  }
  // Write your code here.

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
