import Phaser from "phaser";
import Level from "./scenes/Level";

import Preload from "./scenes/Preload";
import InitHome from "./scenes/InitHome";
import BaseScene from "./scenes/BaseScene";
import Global from "./scenes/Global";

window.addEventListener("load", function () {
  const game = new Phaser.Game({
    title: "proyecto_final",
    version: "1.0.1",
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    pixelArt: true,
    scale: {
      width: 640,
      height: 600,
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
      },
    },
    scene: [Global, Preload, Level, InitHome, BaseScene],
  });
  game.scene.start("Boot");
});
