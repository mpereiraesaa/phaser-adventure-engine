import Phaser from 'phaser'
import PNCAdventure from "../../engine/PNCAdventure"
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'Loading Main Level', { font: '16px Arial', fill: '#fff', align: 'center' })
    text.anchor.setTo(0.5, 0.5)
    
    // load initial assets
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')

    // Load base skins
    this.load.text('skins', './assets/skins/skins.txt')
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
