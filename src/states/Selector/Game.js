/* globals __DEV__ */
import Phaser from "phaser";

/* Import Slick-UI GUI Plugin */
import "../../plugins/slick-ui/src/Core";

import ScrollableArea from "../../plugins/phaser-scrollable";

export default class extends Phaser.State {
  init() {}

  preload() {}

  func(scroller, el) {
    scroller.stop();
    game.state.start(el.data.state);
  }

  drawSelectorBox(menuX, menuY) {
    let scrollGroup = this.game.add.group();
    let group = this.game.make.group(null);
    let g = this.game.add.graphics(0, 0, group);
    let box = this.add.sprite(menuX, menuY, "selector-box");
    let boxWOffset = box.width - 65;
    let boxHOffset = menuY - 5;
    let i = 0;
    let style = { font: "14px Arial", fill: "#fff" };
    let data = [{ text: "Stage Test 00", state: "TestStageBoot" },
                { text: "Stage Test 01", state: "TestStageBoot" },
                { text: "Stage Test 02", state: "TestStageBoot" },
                { text: "Stage Test 03", state: "TestStageBoot" },
                { text: "Stage Test 04", state: "TestStageBoot" },
                { text: "Stage Test 05", state: "TestStageBoot" },
                { text: "Stage Test 06", state: "TestStageBoot" },
                { text: "Stage Test 07", state: "TestStageBoot" },
                { text: "Stage Test 08", state: "TestStageBoot" },
                { text: "Stage Test 09", state: "TestStageBoot" },
                { text: "Stage Test 10", state: "TestStageBoot" },
                { text: "Stage Test 11", state: "TestStageBoot" },
                { text: "Stage Test 12", state: "TestStageBoot" },
                { text: "Stage Test 13", state: "TestStageBoot" },
                { text: "Stage Test 14", state: "TestStageBoot" },
                { text: "Stage Test 15", state: "TestStageBoot" },
                { text: "Stage Test 16", state: "TestStageBoot" },
                { text: "Stage Test 17", state: "TestStageBoot" },
                { text: "Stage Test 18", state: "TestStageBoot" },
                { text: "Stage Test 19", state: "TestStageBoot" },
                { text: "Stage Test 20", state: "TestStageBoot" },
                { text: "Stage Test 21", state: "TestStageBoot" }];

    let scroller = game.add.existing(
      new ScrollableArea(menuX + 25, menuY + 25, box.width, box.height -60, {
        horizontalScroll: false,
        horizontalWheel: false,
        kineticMovement: false,
        verticalWheel: true
      })
    );

    for (; i < data.length; i++) {
      g
        .beginFill(Phaser.Color.hexToRGB("#8c1be2"))
        .drawRect(0, 0, boxWOffset, boxHOffset / 2 + (i * 20));

      let txt = this.game.add.text(
        boxWOffset / 3,
        boxHOffset / 3 + (i * 20),
        data[i].text,
        style,
        group
      );

      txt.anchor.set(0.5);

      let img = this.game.add.image(0, 0, group.generateTexture());
      img.data = { id: 1, state: data[i].state };

      img.inputEnabled = true;
      img.input.useHandCursor = true;
      img.events.onInputDown.add(el => this.func(scroller, el), this);

      scroller.addChildren(img);
    }

    scroller.start();

    scrollGroup.add(box);
    scrollGroup.add(scroller);
  }

  create() {
    this.drawSelectorBox(55, 45);
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