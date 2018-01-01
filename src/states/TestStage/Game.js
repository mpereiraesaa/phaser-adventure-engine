/* globals __DEV__ */
import Phaser from "phaser";
import PlayerActor from "../../engine/PlayerActor";
import Actor from "../../engine/Actor";
import Hud from "../../sprites/Hud";

export default class extends Phaser.State {
  init() {
    this.game.renderer.renderSession.roundPixels = true; // Make the phaser sprites look smoother
  }

  preload() {}

  shutdown() {
    this.game.pncPlugin.destroyScene();
  }

  create() {
    let spriterLoader = new Spriter.Loader();
    let spriterData = 0;
    let room = 0;
    let sceneDefinition = {};
    let shape = game.cache.getJSON("map");
    let map_points = game.cache.getJSON("map_points");
    let navmeshPoints = [];
    let hud = null;
    let spriterFile = null;
    this.actor = null;
    this.key = "test-bg";
    const bannerText = "Press W to enter debug background mode.\nPress C to cycle between charmaps.";

    shape.layers[1].objects.map(point => {
      for (let i = 0; i < point.polyline.length; i++) {
        navmeshPoints.push({
          x: point.x + point.polyline[i].x,
          y: point.y + point.polyline[i].y
        });
      }
    });

    sceneDefinition = {
      bg: "./assets/images/salt_lake.png",
      navmeshPoints: navmeshPoints,
      shape: this.game.cache.getJSON("salt_lake_shape_1"),
      points: map_points
    };

    // creates a scene and immediately switches to it
    room = this.game.pncPlugin.addScene(this.key, sceneDefinition, true);

    let banner = new Phaser.Text(
      game,
      this.world.centerX + 100,
      this.game.height / 4,
      bannerText
    );

    banner.fontSize = 20;
    banner.fill = "#000";
    banner.smoothed = false;
    banner.anchor.setTo(0.5);

    hud = new Hud(game);

    this.game.pncPlugin.addObject(room, banner);
    this.game.pncPlugin.addObject(room, hud);

    spriterFile = new Spriter.SpriterXml(
      this.cache.getXML(this.game.skins.getXml('Mimi')),
      /* optional parameters */ {
        imageNameType: Spriter.eImageNameType.NAME_ONLY
      }
    );

    // Now create Player and add it onto the game
    spriterData = spriterLoader.load(spriterFile);

    // adds actor using PlayerActor prototype which adds listeners for movement input
    this.game.pncPlugin.addActor(room, {
      spriterData: spriterData,
      textureKey: this.game.skins.getAtlas('Mimi'),
      isSmall: true,
      spawnX: 200,
      spawnY: 600
    });
  }

  update() {}

  render() {
    if (__DEV__) {
      // this.game.debug.inputInfo(32, 32);
      // this.game.debug.spriteInfo(this.player, 32, 32)
      // this.game.debug.body(this.player)
    }
  }
}