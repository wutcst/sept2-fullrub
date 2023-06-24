// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class AlertText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x ?? 281.5, y ?? 74, "", {});

    this.text = "New text";

    /* START-USER-CTR-CODE */
    // Write your code here.
    this.setVisible(false);
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */

  timer: any = null;
  // Write your code here.
  alert(message: string) {
    this.setVisible(true);
    this.setY(0);
    this.alpha = 0;
    this.text = message;
    this.scene.tweens.add({
      targets: [this],
      alpha: {
        from: 0,
        to: 1,
      },
      y: {
        from: 0,
        to: 80,
      },
      ease: "Power1",
      duration: 1000,
    });
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setVisible(false);
    }, 2000);
  }
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
