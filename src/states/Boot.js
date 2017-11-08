import Phaser from 'phaser'
import PNCAdventure from "../engine/PNCAdventure"
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EEE'
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

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)
    
    // load your assets
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    // this.load.spritesheet('player', 'assets/images/player.png', 64, 64)

    this.load.image('player', './assets/images/p1_front.png')
    this.load.json('map', 'assets/tilemaps/maps/salt_lake_v1.json')
    // this.load.image('salt_lake', './assets/images/salt_lake.png')
    // this.load.tilemap('tilemap', 'assets/tilemaps/maps/salt_lake.json', null, Phaser.Tilemap.TILED_JSON);
  }

  create(){
    // Register the plugin with Phaser
    this.game.pncPlugin = this.game.plugins.add(PNCAdventure)
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
