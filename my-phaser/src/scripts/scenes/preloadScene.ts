export default class PreloadScene extends Phaser.Scene {
  constructor() {
    //定义该场景的key，方便跳转
    super({ key: 'PreloadScene' })
  }

  preload() {
    //加载一些图片纹理，可以在全局进行使用
    // this.load.image('phaser-logo', '../../assets/img/phaser-logo.png')
    this.load.image('bg', '../../assets/img/judong.jpg')

    //加载一些css，可以在全局设置类名等
    this.load.css('mycss', '../../assets/css/index.css')
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
