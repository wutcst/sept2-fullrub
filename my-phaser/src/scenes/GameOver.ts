// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
/**
 * 游戏结束画面
 * 一个简单的致谢，任务
 */
export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // container_1
    const container_1 = this.add.container(234, 600);

    // text
    const text = this.add.text(0, 134, "", {});
    text.text = "开发成员:";
    text.setStyle({ fontSize: "26px" });
    container_1.add(text);

    // text_1
    const text_1 = this.add.text(0, 174, "", {});
    text_1.text = "方嘉豪";
    text_1.setStyle({ fontSize: "20px" });
    container_1.add(text_1);

    // text_6
    const text_6 = this.add.text(0, 228, "", {});
    text_6.text = "王晨宏";
    text_6.setStyle({ fontSize: "20px" });
    container_1.add(text_6);

    // text_7
    const text_7 = this.add.text(0, 281, "", {});
    text_7.text = "陈宇沥";
    text_7.setStyle({ fontSize: "20px" });
    container_1.add(text_7);

    // text_2
    const text_2 = this.add.text(0, 369, "", {});
    text_2.text = "开发任务分工:";
    text_2.setStyle({ fontSize: "26px" });
    container_1.add(text_2);

    // text_3
    const text_3 = this.add.text(0, 427, "", {});
    text_3.text =
      "方嘉豪\n 前端项目结构\n 界面玩法设计\n 游戏地图关卡设计\n 游戏开发\n 单元测试\n 前后端对接\n 相关文档编写\n王晨宏\n 后端项目结构\n 后端功能设计\n 后端功能模块编写\n 单元测试\n 相关文档编写\n陈宇沥\n 游戏数据设计\n 找游戏素材\n 数据库设计开发\n 数据库dao层编写\n 单元测试\n 相关文档编写";
    container_1.add(text_3);

    this.container_1 = container_1;

    this.events.emit("scene-awake");
  }

  private container_1!: Phaser.GameObjects.Container;

  /* START-USER-CODE */
  text!: Phaser.GameObjects.Text;
  // Write your code here

  create() {
    this.editorCreate();
    this.text = this.add.text(0, 50, "游戏结束", {
      fontFamily: "Arial Black",
      fontSize: 52,
    });
    this.text.setStroke("#000000", 4);
    //  Apply the gradient fill.
    const gradient = this.text.context.createLinearGradient(
      0,
      0,
      0,
      this.text.height
    );
    gradient.addColorStop(0, "#111111");
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(0.5, "#aaaaaa");
    gradient.addColorStop(1, "#111111");

    this.text.setFill(gradient);
    this.container_1.add(this.text);
    this.add.tween({
      targets: [this.container_1],
      duration: 1000,
      props: {
        alpha: {
          from: 0,
          to: 1,
        },
      },
    });
  }

  update(time: number, delta: number): void {
    this.container_1.y -= 1;
    if (this.container_1.y < -800) {
      this.container_1.y = 600;
    }
  }
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
