// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PushActionScript from "../script-nodes/PushActionScript";
/* START-USER-IMPORTS */
import { createItem, createSpeechBubble } from "~/game";
import inject from "~/utils/inject";
/* END-USER-IMPORTS */

export default class BackPack extends Phaser.Scene {
  constructor() {
    super("BackPack");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // rectangle_1
    const rectangle_1 = this.add.rectangle(320, 323, 128, 128);
    rectangle_1.scaleX = 4.129583260508247;
    rectangle_1.scaleY = 2.8034421246791066;
    rectangle_1.alpha = 0.5;
    rectangle_1.isFilled = true;
    rectangle_1.fillColor = 8880770;

    // close
    const close = this.add.image(565, 159, "close");

    // pushActionScript_1
    const pushActionScript_1 = new PushActionScript(close);

    // rectangle_2
    const rectangle_2 = this.add.rectangle(58, 146, 128, 128);
    rectangle_2.scaleX = 3.8107501314576306;
    rectangle_2.scaleY = 0.20946718260131159;
    rectangle_2.setOrigin(0, 0);
    rectangle_2.isFilled = true;
    rectangle_2.fillColor = 9591882;

    // text_1
    const text_1 = this.add.text(307, 149, "", {});
    text_1.setOrigin(0.5, 0);
    text_1.text = "游戏背包";
    text_1.setStyle({ color: "#f2f01cff", fontSize: "20px" });

    // selected
    const selected = this.add.rectangle(216, 231, 50, 50);
    selected.isFilled = true;
    selected.fillAlpha = 0;
    selected.isStroked = true;
    selected.strokeColor = 14420747;
    selected.lineWidth = 4;

    // text_2
    const text_2 = this.add.text(110, 447, "", {});
    text_2.text = "点击Q丢弃选中的物品\n";
    text_2.setStyle({ color: "#f7f6fbff" });

    // text_3
    const text_3 = this.add.text(338, 446, "", {});
    text_3.text = "鼠标悬浮上边可以查看物品信息";

    // capacity
    const capacity = this.add.text(422, 150, "", {});
    capacity.text = "New text";

    // text
    const text = this.add.text(110, 472, "", {});
    text.text = "点击E使用物品，一些物品不能使用\n";
    text.setStyle({ color: "#f7f6fbff" });

    this.pushActionScript_1 = pushActionScript_1;
    this.close = close;
    this.selected = selected;
    this.capacity = capacity;

    this.events.emit("scene-awake");
  }

  private pushActionScript_1!: PushActionScript;
  private close!: Phaser.GameObjects.Image;
  private selected!: Phaser.GameObjects.Rectangle;
  private capacity!: Phaser.GameObjects.Text;

  /* START-USER-CODE */
  private nowSelected!: number;
  private col: number = 10;
  private numSlots: number = 50;
  private slotSize: number = 50;
  private _inventory!: Phaser.GameObjects.Container;
  private list!: Array<Phaser.GameObjects.Image | null>;
  // Write your code here

  create() {
    const { global } = inject(this);

    this.list = [];
    this.nowSelected = 0;
    this.editorCreate();
    this.selected.setDepth(10);
    this.selected.setOrigin(0);
    //pointerover事件
    this.close.setInteractive();
    this.close.on("pointerover", () => {
      this.close.setScale(1.2);
    });
    this.close.on("pointerout", () => {
      this.close.setScale(1);
    });
    //监听关闭按钮
    this.close.on("pointerdown", () => {
      this.pushActionScript_1.execute();
      setTimeout(() => {
        let { x, y } = global.playerData.nowPosition;
        this.scene.start("BaseScene", { show: false, x, y });
        this.scene.stop("BackPack");
      }, 100);
    });
    let items = global.playerData.items;
    //剔除为null的item
    items = items.filter((item) => {
      if (item) return true;
    });
    // console.log(items);
    //创建方格
    const inventory = this.add.container(71, 182);
    this._inventory = inventory;
    // const inventoryImage = this.add.image(0, 0, "weapon_knife");
    // inventory.add(inventoryImage);

    const numSlots = this.numSlots;
    const slotSize = this.slotSize;
    const col = this.col;

    for (let i = 0; i < numSlots; i++) {
      const x = (i % col) * slotSize;
      const y = Math.floor(i / col) * slotSize;
      const slot = this.add.rectangle(x, y, slotSize, slotSize, 0x000000);
      slot.setAlpha(0.6);
      slot.setOrigin(0);
      slot.setStrokeStyle(1, 0xffffff);
      slot.setInteractive();
      slot.on("pointerdown", () => {
        this.pointerDown(i);
      });
      inventory.add(slot);
    }
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let theCol = i % col;
      let theRow = Math.floor(i / col);
      let x = theCol * slotSize + slotSize / 2,
        y = theRow * slotSize + slotSize / 2;
      let image = createItem(item!.getItemInterface(), this, x, y);
      image.setScale(item.scale.x, item.scale.y);
      // image.setScale(2.5, 2.5);
      inventory.add(image);

      image.setInteractive();
      const width = 100;
      const height = 100;
      let bubble: Phaser.GameObjects.Container | null = null;
      image.on("pointerover", () => {
        if (!bubble) {
          bubble = createSpeechBubble(
            this,
            x + inventory.x,
            y + inventory.y - height - slotSize / 2,
            width,
            height,
            item!.getBackPackDes()
          );
        } else {
          bubble.setVisible(true);
        }
      });
      image.on("pointerout", () => {
        if (bubble) {
          bubble.setVisible(false);
        }
      });
      image.on("pointerdown", () => this.pointerDown(i));
      this.list.push(image);
    }
    this.updateSelected();

    let qKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    qKey?.on("down", () => {
      this.deleteItem();
    });
    let iKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    iKey?.on("down", () => {
      setTimeout(() => {
        let { x, y } = global.playerData.nowPosition;
        this.scene.start("BaseScene", { show: false, x, y });
        this.scene.stop("BackPack");
      }, 100);
    });

    let eKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    eKey?.on("down", () => {
      this.useItem();
    });
  }
  pointerDown(i: number) {
    this.nowSelected = i;
    this.updateSelected();
  }
  deleteItem() {
    let { global } = inject(this);
    let { nowPosition: position } = global.playerData;
    let items = global.playerData.items;
    if (this.nowSelected < items.length && items[this.nowSelected]) {
      let item = items[this.nowSelected];
      item!.x = position.x;
      item!.y = position.y;
      console.log(item);
      global.dataManager.currentRoom.items.push(item);
      console.log(global.dataManager.currentRoom.items);
      //赋值为null
      items[this.nowSelected] = null;
      this.list[this.nowSelected]?.destroy();
      this.list[this.nowSelected] = null;
    }
  }
  useItem() {
    let { global } = inject(this);
    global.playerData.filtersItem();
    let items = global.playerData.items;
    let canUse = false;
    console.log(items);
    if (this.nowSelected < items.length && items[this.nowSelected]) {
      let item = items[this.nowSelected];
      canUse = item.use(global.playerData);
      if (canUse) {
        items[this.nowSelected] = null;
        this.list[this.nowSelected]?.destroy();
        this.list[this.nowSelected] = null;
        window.$message.success("使用成功");
        this.scene.start("BackPack");
      } else {
        window.$message.info("该物品不能使用");
      }
    }
  }

  update(time: number, delta: number): void {
    this.showCapacity();
  }
  updateSelected() {
    const col = this.col;
    let selectedCol = this.nowSelected % col;
    let selectedRow = Math.floor(this.nowSelected / col);
    this.selected.setPosition(
      selectedCol * this.slotSize + this._inventory.x,
      selectedRow * this.slotSize + this._inventory.y
    );
  }

  showCapacity() {
    let { global } = inject(this);
    let sum = global.playerData.getSumWeight();
    this.capacity.setText(`容量:${sum}/${global.playerData.maxWeight}`);
  }
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
