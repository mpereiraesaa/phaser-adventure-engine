import Phaser from 'phaser'
import PNCAdventure from "../../engine/PNCAdventure"
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'Loading Main Level', { font: '16px Arial', fill: '#000000', align: 'center' })
    text.anchor.setTo(0.5, 0.5)
    
    // load your assets
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')

    // Hud stuff
    this.load.image("chat-rooms-icon", "./assets/images/lobby/chat_rooms.png")
    this.load.image("friends-icon", "./assets/images/lobby/friends-logo.png")
    this.load.image("grass-tex", "./assets/images/lobby/grass.jpg")
    this.load.image("my-house-btn", "./assets/images/lobby/house_btn.png")
    this.load.image("view-houses-icon", "./assets/images/lobby/houses_rooms.png")
    this.load.image("settings-icon", "./assets/images/lobby/settings-logo.png")
    this.load.image("store-icon", "./assets/images/lobby/store.png")
    this.load.image("video-room-icon", "./assets/images/lobby/video_rooms.png")
    
    this.load.image("lobby-bg", "./assets/images/lobby/lobby_bg.png")

    // Player Sprites
    this.load.atlas("playerAtlas", "./assets/images/player/Girl_1/Mimi.png", "./assets/images/player/Girl_1/Mimi.json");
    this.load.xml("playerXml", "./assets/images/player/Girl_1/Mimi.scml");
  }

  create(){
    // Register the plugin with Phaser
    this.game.pncPlugin = this.game.plugins.add(PNCAdventure)
  }

  render () {
    if (this.fontsReady) {
      this.state.start('LobbySplash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
