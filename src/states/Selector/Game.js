/* globals __DEV__ */
import Phaser from "phaser";

/* Import Slick-UI GUI Plugin */
import "../../plugins/slick-ui/src/Core";

import ScrollableArea from "../../plugins/phaser-scrollable";

export default class extends Phaser.State {
  init() {}

  preload() {}

  func(el) {
    this.scroller.stop()
    game.state.start(el.data.state)
  }

  create() {
    /* Scroll box group */
    this.scrollGroup = this.game.add.group();

    this.menuX = 55
    this.menuY = 45

    this.box = this.add.sprite(this.menuX, this.menuY, 'selector-box')
    var boxW = this.box.width - 80;
    var boxH = 40;

    this.scroller = game.add.existing(
      new ScrollableArea(this.menuX + 25, this.menuY + 25, this.box.width, this.box.height, {
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
      (boxH / 3),
      "Stage Test",
      { font: "14px Arial", fill: "#fff" },
      group
    );

    txt.anchor.set(0.5);
    var img = this.game.add.image(0, 0, group.generateTexture());
    img.data = { id: 1, state: "TestStageBoot" };

    img.inputEnabled = true;
    img.input.useHandCursor = true;
    img.events.onInputDown.add(this.func, this);

    this.scroller.addChildren(img);

    this.scroller.start();

    this.scrollGroup.add(this.box);
    this.scrollGroup.add(this.scroller);
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