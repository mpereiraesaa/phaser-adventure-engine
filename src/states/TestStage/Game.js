/* globals __DEV__ */
import Phaser from 'phaser'
import PlayerActor from '../../engine/PlayerActor'
import Hud from '../../sprites/Hud'

export default class extends Phaser.State {
  init () {}

  preload () {}

  shutdown(){
    this.game.pncPlugin.destroyScene()
  }

  create () {
    let shape = game.cache.getJSON('map')
    let points = game.cache.getJSON('salt_lake_points')
    let navmeshPoints = []
    this.key = 'test-bg'

    shape.layers[1].objects.map(point => {
      for(let i = 0;i< point.polyline.length; i++){
        navmeshPoints.push({ "x":point.x + point.polyline[i].x, "y": point.y + point.polyline[i].y })
      }
    })

    /* navmeshPoints => Draws the full walk zone, shape => means every blocked zone,
    // points => Are some points that are drawn onto the navmesh to make more natural the paths.
    */
    let sceneDefinition = {
      bg: './assets/images/salt_lake.png',
      navmeshPoints: navmeshPoints,
      shape: this.game.cache.getJSON('salt_lake_shape_1'), 
      points: points
    }

    // creates a scene and immediately switches to it
    let room = this.game.pncPlugin.addScene(this.key, sceneDefinition, true)

    // adds actor using PlayerActor prototype which adds listeners for movement input
    var actor = this.game.pncPlugin.addActor(room, {
        x: 200,
        y: 600,
        image: 'player',
        type: PlayerActor
    })

    const bannerText = 'Press W to enter debug background mode.'
    let banner = new Phaser.Text(game, this.world.centerX, this.game.height - 30, bannerText);
    banner.padding.set(10, 16)
    banner.fontSize = 20
    banner.fill = '#000'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    let hud = new Hud(game)

    this.game.pncPlugin.addObject(room, banner)
    this.game.pncPlugin.addObject(room, hud)

    // this.game.add.existing(hud)

    // let bg = this.game.add.tileSprite(0,0, this.cache.getImage("background").width, this.cache.getImage("background").height, 'background')    // Stretch to fill all space as background

    // this.player = new Player({
    //   game: this.game,
    //   x: 250,
    //   y: 150,
    //   asset: 'player',
    //   frame: 18
    // })

    // this.game.add.existing(this.player)
    // this.game.physics.enable(this.player, Phaser.Physics.ARCADE)

    // this.game.input.onDown.add(this.player.moveCharacter, this);
    // this.bgGroup.scale.setTo(this.game.width / bg.width, this.game.height / bg.height)
  }

  update(){}

  render(){
    if (__DEV__) {
      // this.game.debug.inputInfo(32, 32);
      // this.game.debug.spriteInfo(this.player, 32, 32)
      // this.game.debug.body(this.player)
    }
  }
}
