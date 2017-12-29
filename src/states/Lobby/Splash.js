import Phaser from 'phaser'
import { centerGameObjects } from '../../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    // Hud
    this.load.image('chat-rooms-icon', './assets/images/lobby/chat_rooms.png')
    this.load.image('friends-icon', './assets/images/lobby/friends-logo.png')
    this.load.image('grass-tex', './assets/images/lobby/grass.jpg')
    this.load.image('my-house-btn', './assets/images/lobby/house_btn.png')
    this.load.image('view-houses-icon', './assets/images/lobby/houses_rooms.png')
    this.load.image('settings-icon', './assets/images/lobby/settings-logo.png')
    this.load.image('store-icon', './assets/images/lobby/store.png')
    this.load.image('video-room-icon', './assets/images/lobby/video_rooms.png')

    // Background
    this.load.image('lobby-bg', './assets/images/lobby/lobby_bg.png')

    this.loadSkins();
  }

  loadSkins () {
    let skinsTxt = this.cache.getText('skins');
    let names = skinsTxt.split('\n');
    let i = 0;
    let skins = Object.create(Array.prototype);

    skins.getXml = function (name) {
      let skin = this.filter(skin => skin.name === name)[0]

      return skin.xml
    };

    skins.getAtlas = function (name) {
      let skin = this.filter(skin => skin.name === name)[0]

      return skin.atlas
    };

    for (; i < names.length; i++) {
      let atlasName = `${names[i]}Atlas`
      let xmlName = `${names[i]}Xml`
      let skinPath = './assets/skins/'
      let skin = {}

      this.load.atlas(atlasName,
        `${skinPath}${names[i]}/${names[i]}.png`,
        `${skinPath}${names[i]}/${names[i]}.json`
      )

      this.load.xml(xmlName, `${skinPath}${names[i]}/${names[i]}.scml`)

      skin['name'] = names[i]
      skin['atlas'] = atlasName
      skin['xml'] = xmlName

      skins.push(skin)
    }

    // Assign to game
    this.game.skins = skins
  }

  create () {
    this.state.start('LobbyGame')
  }
}
