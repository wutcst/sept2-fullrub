// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SceneInOut extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Container) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__SceneInOut"] = this;

		/* START-USER-CTR-CODE */
    // Write your code here.

    /* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Container): SceneInOut {
		return (gameObject as any)["__SceneInOut"];
	}

	private gameObject: Phaser.GameObjects.Container;
	public inEase: string = "";
	public outEase: string = "";
	public inTime: number = 0;
	public outTime: number = 0;

	/* START-USER-CODE */

  // Write your code here.
  protected awake(): void {
    //该方法应该添加到场景创建时开始时就执行
    this.createTransition();
  }

  createTransition() {
    const scene = this.gameObject.scene;
    const startingTween = scene.add.tween({
      targets: [this.gameObject],
      duration: 800,
      ease: "Bounce.easeOut",
      props: {
        x: {
          from: -scene.scale.width,
          to: 0,
        },
        alpha: {
          from: 0,
          to: 1,
        },
      },
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
