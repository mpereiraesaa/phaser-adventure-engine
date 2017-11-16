/* globals __DEV__ */
import Phaser from "phaser";

/* Import Slick-UI GUI Plugin */
import "../../plugins/slick-ui/src/Core";

import ScrollableArea from "../../plugins/phaser-scrollable";

// Import levels
import StartStageTest from "../stage_test/Index";

export default class extends Phaser.State {
  init() {}

  preload() {}

  Go() {
    StartStageTest();
  }

  func(el) {
    this.Go(el.data.id);
  }

  create() {
    /* Scroll box group */
    this.scrollGroup = this.game.add.group();

    var maskW = 200;
    var maskH = 200;
    var boxW = maskW;
    var boxH = 40;

    // let parent = this.world;
    // let bounds = new Phaser.Rectangle(60, 50, maskW, maskH);

    // Draw a custom Scroll bar.
    // var graphics = game.add.graphics(0, 0);
    // graphics.lineStyle(20, Phaser.Color.hexToRGB("#b2aeae"));
    // graphics.moveTo(bounds.x + maskW + 10, bounds.y);
    // graphics.lineTo(bounds.x + maskW + 10, bounds.y + maskH + 10);

    let c = this.game.add.graphics(0, 0);
    c
      .beginFill(Phaser.Color.hexToRGB("#eee"))
      .drawRect(60 - 5, 50 - 5, maskW + 10, maskH + 10);

    this.scroller = game.add.existing(
      new ScrollableArea(60, 50, maskW, maskH, {
        horizontalScroll: false,
        horizontalWheel: false,
        verticalWheel: true
      })
    );

    var group = this.game.make.group(null);
    var g = this.game.add.graphics(0, 0, group);
    g.beginFill(Phaser.Color.hexToRGB("#8c1be2")).drawRect(0, 0, boxW, boxH / 2);

    var txt = this.game.add.text(
      boxW / 4,
      (boxH / 3) - 1,
      "Stage Test",
      { font: "14px Arial", fill: "#fff" },
      group
    );

    txt.anchor.set(0.5);
    var img = this.game.add.image(0, 0, group.generateTexture());
    img.data = { id: 1 };

    img.inputEnabled = true;
    img.events.onInputDown.add(this.func, this);

    this.scroller.addChildren(img);

    this.scroller.start();

    this.scrollGroup.add(c);
    this.scrollGroup.add(this.scroller);

    window.scroller = this.scroller;

    const bannerText = "Prototype";
    let banner = this.add.text(
      this.world.centerX,
      this.game.height - 80,
      bannerText
    );
    banner.font = "Bangers";
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = "#77BFA3";
    banner.smoothed = false;
    banner.anchor.setTo(0.5);

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

  update() {}

  render() {
    if (__DEV__) {
      // this.game.debug.inputInfo(32, 32);
      // this.game.debug.spriteInfo(this.player, 32, 32)
      // this.game.debug.body(this.player)
    }
  }
}