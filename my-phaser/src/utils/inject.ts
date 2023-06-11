import Global from "../scenes/Global";
export default function inject(that: Phaser.Scene) {
  const global = that.scene.get("Global") as unknown as Global;
  return {
    global,
  };
}
