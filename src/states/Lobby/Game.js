/* globals __DEV__ */
import Phaser from "phaser";
import Hud from "../../sprites/Hud";

export default class extends Phaser.State {
  init() {}

  preload() {}

  shutdown() {
    document.getElementById("chat-container").style.display = "none";
  }

  create() {
    document.getElementById("chat-container").style.display = "block";

    this.background = this.game.add.sprite(0, 0, "lobby-bg");
    this.scaleX = this.game.width / this.background.width;
    this.scaleY = this.game.height / this.background.height;

    // Group HUD / Icons
    this.hud = this.game.add.group();

    // create Spriter loader - class that can change Spriter file into internal structure
    var spriterLoader = new Spriter.Loader();
    let spriterData = 0,
      charmapID = 0,
      animation = 0;
    let charMaps = ["Green", "Brush"];

    this.hud.add(this.background);
    this.hud.add(new Hud(game));

    // Scale background
    this.hud.scale.setTo(this.scaleX, this.scaleY);

    // create Spriter file object - it wraps XML/JSON loaded with Phaser Loader
    //var spriterFile = new Spriter.SpriterXml(this.cache.getXML("TESTXml"));
    var spriterFile = new Spriter.SpriterJSON(
      this.cache.getJSON("playerJson"),
      /* optional parameters */ {
        imageNameType: Spriter.eImageNameType.NAME_ONLY
      }
    );

    // proces Spriter file (XML/JSON) with Spriter loader - outputs Spriter animation which you can instantiate multiple times with SpriterGroup
    spriterData = spriterLoader.load(spriterFile);

    // create actual renderable object - it is extension of Phaser.Group
    this._spriterGroup = new Spriter.SpriterGroup(
      this.game,
      spriterData,
      "playerAtlas",
      "Animaciones",
      "Frontidle",
      100
    );
    this._spriterGroup.position.setTo(420, 400);

    // adds SpriterGroup to Phaser.World to appear on screen
    this.world.add(this._spriterGroup);

    // Spriter animation can send info on when sounds, events, tags, variable - here we are listening to Phaser.Signals when animation variable is set
    this._spriterGroup.onVariableSet.add((spriter, variable) => {
      this._text = variable.string;
    }, this);

    window._spriterGroup = this._spriterGroup

    // // cycle animations
    // var key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    // key.onDown.add(()=> {
    //   animation = (animation + 1) % this._spriterGroup.animationsCount;
    //   this._spriterGroup.playAnimationById(animation);
    // }, this);

    // // on C key cycle through all charmaps
    // key = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
    // key.onDown.add(()=> {
    //   if (charmapID >= this._spriterGroup.entity.charMapsLength) {
    //     this._spriterGroup.clearCharMaps();
    //     charmapID = 0;
    //   } else {
    //     this._spriterGroup.pushCharMap(charMaps[charmapID]);
    //     ++charmapID;
    //   }
    // }, this);

    // // on I key show / hide item attached to point
    // key = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
    // key.onDown.add(()=> {
    //   this._item.exists = !this._item.exists;
    // }, this);
  }

  update() {
    this._spriterGroup.updateAnimation();
  }

  render() {}
}