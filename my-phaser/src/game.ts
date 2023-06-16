import { ItemInterface } from "./data/ItemInfo";
import Phaser from "phaser";
import Level from "./scenes/Level";
import Preload from "./scenes/Preload";
import InitHome from "./scenes/InitHome";
import BaseScene from "./scenes/BaseScene";
import Global from "./scenes/Global";
import BackPack from "./scenes/BackPack";

// import { useViewStore } from "./store";

async function startGame(): Promise<Phaser.Game> {
  // const viewState = useViewStore();
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
        // debug: true,
      },
    },
    scene: [Global, Preload, Level, InitHome, BaseScene, BackPack],
  });
  game.scene.start("Global");
  return new Promise((resolve, reject) => {
    game.events.on("ready", () => {
      resolve(game);
    });
  });
}

function createSpeechBubble(
  that: Phaser.Scene,
  x: number,
  y: number,
  width: number,
  height: number,
  quote: string
) {
  const container: Phaser.GameObjects.Container = that.add.container();
  const bubbleWidth = width;
  const bubbleHeight = height;
  const bubblePadding = 10;
  const arrowHeight = bubbleHeight / 4;

  const bubble = that.add.graphics({ x: x, y: y });

  //  Bubble shadow
  bubble.fillStyle(0x222222, 0.5);
  bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

  //  Bubble color
  bubble.fillStyle(0xffffff, 1);

  //  Bubble outline line style
  bubble.lineStyle(4, 0x565656, 1);

  //  Bubble shape and outline
  bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
  bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

  //  Calculate arrow coordinates
  const point1X = Math.floor(bubbleWidth / 7);
  const point1Y = bubbleHeight;
  const point2X = Math.floor((bubbleWidth / 7) * 2);
  const point2Y = bubbleHeight;
  const point3X = Math.floor(bubbleWidth / 7);
  const point3Y = Math.floor(bubbleHeight + arrowHeight);

  //  Bubble arrow shadow
  bubble.lineStyle(4, 0x222222, 0.5);
  bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

  //  Bubble arrow fill
  bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
  bubble.lineStyle(2, 0x565656, 1);
  bubble.lineBetween(point2X, point2Y, point3X, point3Y);
  bubble.lineBetween(point1X, point1Y, point3X, point3Y);

  const content = that.add.text(0, 0, quote, {
    fontFamily: "Arial",
    fontSize: 10,
    color: "#000000",
    align: "center",
    wordWrap: { width: bubbleWidth - bubblePadding * 2 },
  });

  const b = content.getBounds();

  content.setPosition(
    bubble.x + bubbleWidth / 2 - b.width / 2,
    bubble.y + bubbleHeight / 2 - b.height / 2
  );

  container.add(bubble);
  container.add(content);
  return container;
}

function createItem(
  item: ItemInterface,
  that: Phaser.Scene,
  x: number,
  y: number
) {
  let texture = item.texture;
  return that.physics.add.image(x, y, texture);
}

export { createSpeechBubble, createItem, startGame };
