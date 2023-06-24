// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {
  constructor() {
    super("Level");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // keyboard_key
    const keyboard_key = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // text_1
    const text_1 = this.add.text(320, 450, "", {});
    text_1.setOrigin(0.5, 0.5);
    text_1.text = "按下空格键开始游戏";
    text_1.setStyle({ fontSize: "30px" });

    this.text_1 = text_1;
    this.keyboard_key = keyboard_key;

    this.events.emit("scene-awake");
  }

  private text_1!: Phaser.GameObjects.Text;
  private keyboard_key!: Phaser.Input.Keyboard.Key;

  /* START-USER-CODE */

  // Write your code here

  create() {
    this.editorCreate();
    this.keyboard_key.on("down", () => {
      this.scene.start("BaseHome");
    });
    var colors = [0xff0000, 0x00ff00, 0x0000ff];
    var colorIndex = 0;

    this.tweens.add({
      targets: this.text_1,
      scaleX: 1.2,
      scaleY: 1.2,
      color: colors[colorIndex],
      duration: 1000,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
      onComplete: () => {
        colorIndex = (colorIndex + 1) % colors.length;
      },
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
