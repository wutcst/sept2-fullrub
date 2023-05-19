import FpsText from '../objects/fpsText'
import { GameScene } from './gameScene'
import { createBtn } from '../objects/btn'
import remove from './../../../../../lodash-master/remove'
import initCloneObject from './../../../../../lodash-master/.internal/initCloneObject'
export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    let w = this.cameras.main.width
    let h = this.cameras.main.height
    this.fpsText = new FpsText(this)
    // display the Phaser.VERSION
    //setOrigin是设置基于的原点的位置,百分比，这里使用小数
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: 'white',
        fontSize: '24px'
      })
      .setOrigin(1, 0)

    //diplay the Logo
    this.add.image(w / 2, h / 3, 'bg')

    //display btns
    let btnY = h - 200
    let space = 100
    let loginGame, registerGame, newGame, reloadGame, quitGame
    const initBtns = () => {
      loginGame = createBtn(this, { x: w / 2 - space, y: btnY, text: '登录' })
      registerGame = createBtn(this, { x: w / 2 + space, y: btnY, text: '注册' })
      loginGame.addListener('click')
      loginGame.on('click', () => {
        //弹出登录窗口
        //登录成功则执行afterLogin()
        console.log('dfdf')
        GameBtnsInit()
      })
    }
    const removeInitBtns = () => {
      //移除登录，注册按钮
      loginGame.removeElement()
      registerGame.removeElement()
    }
    const GameBtnsInit = () => {
      removeInitBtns()
      newGame = createBtn(this, { x: w / 2 - space * 2, y: btnY, text: '新的游戏' })
      reloadGame = createBtn(this, { x: w / 2, y: btnY, text: '读取存档' })
      quitGame = createBtn(this, { x: w / 2 + space * 2, y: btnY, text: '退出游戏' })
      //添加事件
      newGame.addListener('click')
      quitGame.addListener('click')
      newGame.on('click', () => {
        //跳转场景
        this.scene.start('GameScene')
      })

      quitGame.on('click', () => {
        removeGameBtns()
        initBtns()
      })
    }
    const removeGameBtns = () => {
      newGame.removeElement()
      reloadGame.removeElement()
      quitGame.removeElement()
    }

    initBtns()
  }

  update() {
    this.fpsText.update()
  }
}
