// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
/**
 * 物品格子，背包栏
 */
export default class ItemBlock extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    super(scene, x ?? 0, y ?? 0);

    // container
    const container = scene.add.container(0, 0);
    this.add(container);

    // rectangle
    const rectangle = scene.add.rectangle(0, 0, 128, 128);
    rectangle.scaleX = 0.6006538157466538;
    rectangle.scaleY = 0.5134862302943727;
    rectangle.setOrigin(0, 0);
    rectangle.isFilled = true;
    rectangle.fillColor = 4520603;
    container.add(rectangle);

    // image
    const image = scene.add.image(39, 33, "weapon_knife");
    image.scaleX = 2.5;
    image.scaleY = 2.5;
    container.add(image);

    this.rectangle = rectangle;
    this.image = image;
    this.container = container;

    /* START-USER-CTR-CODE */
    // Write your code here.

    /* END-USER-CTR-CODE */
  }

  private rectangle: Phaser.GameObjects.Rectangle;
  private image: Phaser.GameObjects.Image;
  private container: Phaser.GameObjects.Container;
  public myTexture: string = "";

  /* START-USER-CODE */
  created() {}

  setMyTexture(texture: string) {
    this.myTexture = texture;
  }
  // Write your code here.

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
