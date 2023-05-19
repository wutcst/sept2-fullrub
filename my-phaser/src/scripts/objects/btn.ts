interface BtnParam {
  x?: number
  y?: number
  text: string
}
export function createBtn(scene: Phaser.Scene, { x = 0, y = 0, text }: BtnParam) {
  let btn = scene.add.dom(x, y, 'div', null, text)
  btn.setClassName('btn')
  return btn
}
