/* globals __DEV__ */
import Phaser from 'phaser'
// import Player from '../sprites/Player'
import PlayerActor from '../engine/PlayerActor'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Prototype'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    let shape = game.cache.getJSON('map')
    let navmeshPoints = []

    shape.layers[1].objects.map(point => {
      for(let i = 0;i< point.polyline.length; i++){
        navmeshPoints.push({ "x":point.x + point.polyline[i].x, "y": point.y + point.polyline[i].y })
      }
    })

    let sceneDefinition = {
      bg: './assets/images/salt_lake.png',
      navmeshPoints: navmeshPoints,
      shape: this.game.cache.getJSON('salt_lake_shape_1')
    }

    // creates a scene and immediately switches to it
    let room = this.game.pncPlugin.addScene('lobby', sceneDefinition, true)

    // adds actor using PlayerActor prototype which adds listeners for movement input
    var actor = this.game.pncPlugin.addActor(room, {
        x: 200,
        y: 600,
        image: 'player',
        type: PlayerActor
    })

    // this.map = game.add.tilemap('tilemap')

    // const navMesh = navMeshPlugin.buildMeshFromTiled(this.map, "walkable", 5.5)

    // navMesh.enableDebug() // Creates a Phaser.Graphics overlay on top of the screen
    // navMesh.debugClear() // Clears the overlay
    // // Visualize the underlying navmesh
    // navMesh.debugDrawMesh({
    //     drawCentroid: true, drawBounds: false, drawNeighbors: true, drawPortals: true
    // })

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
