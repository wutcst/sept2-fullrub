// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PreloadBarUpdaterScript from "../script-nodes/PreloadBarUpdaterScript";
/* START-USER-IMPORTS */
import assetPackUrl from "../../static/assets/asset-pack.json";
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // container_1
    const container_1 = this.add.container(140.60021713006, -290.6670139635124);

    // loadingText_1
    const loadingText_1 = this.add.text(
      175.41184997558594,
      559.6669921875,
      "",
      {}
    );
    loadingText_1.text = "Loading...";
    loadingText_1.setStyle({
      color: "#e0e0e0",
      fontFamily: "arial",
      fontSize: "20px",
    });
    container_1.add(loadingText_1);

    // progressBarBg_1
    const progressBarBg_1 = this.add.rectangle(
      91.4118423461914,
      591.6669921875,
      256,
      20
    );
    progressBarBg_1.setOrigin(0, 0);
    progressBarBg_1.fillColor = 14737632;
    progressBarBg_1.isStroked = true;
    container_1.add(progressBarBg_1);

    // progressBar_1
    const progressBar_1 = this.add.rectangle(
      91.4118423461914,
      591.6669921875,
      256,
      20
    );
    progressBar_1.setOrigin(0, 0);
    progressBar_1.isFilled = true;
    progressBar_1.fillColor = 14737632;
    container_1.add(progressBar_1);

    // preloadUpdater
    new PreloadBarUpdaterScript(progressBar_1);

    // guapen_1
    const guapen_1 = this.add.image(
      45.411842346191406,
      590.6669921875,
      "guapen"
    );
    guapen_1.scaleX = 0.32715486817515643;
    guapen_1.scaleY = 0.32715486817515643;
    container_1.add(guapen_1);

    this.events.emit("scene-awake");
  }

  /* START-USER-CODE */

  // Write your code here

  preload() {
    this.editorCreate();

    this.load.pack("asset-pack", assetPackUrl);
  }

  create() {
    // if (process.env.NODE_ENV === "development") {

    // 	const start = new URLSearchParams(location.search).get("start");

    // 	if (start) {

    // 		console.log(`Development: jump to ${start}`);
    // 		this.scene.start(start);

    // 		return;
    // 	}
    // }

    this.scene.start("Level");
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
