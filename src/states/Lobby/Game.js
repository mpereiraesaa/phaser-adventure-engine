/* globals __DEV__ */
import Phaser from "phaser";

/* Import Slick-UI GUI Plugin */
import "../../plugins/slick-ui/src/Core";

export default class extends Phaser.State {
  init() {}

  preload() {}

  func(el) {
    game.state.start(el.data.state);
  }

  resizeIcon(img, sizeW, sizeH) {
    let w = sizeW ? sizeW : 80;
    let h = sizeH ? sizeH : 80;
    let scaleX = w / img.width;
    let scaleY = h / img.height;

    img.scale.setTo(scaleX, scaleY);
  }

  create() {
    this.margins = { left: 20, right: 50, top: 20, bottom: 220 };

    this.camera_width = this.game.camera.width;
    this.camera_height = this.game.camera.height;
    this.camera_center = new Phaser.Point(
      this.camera_width / 2,
      this.camera_height / 2
    );

    // define the HUD regions (begin and end points)
    this.regions = {
      top_left: {
        begin: { x: this.margins.left, y: this.margins.top },
        end: {
          x: this.camera_width / 3 - this.margins.right,
          y: this.margins.top
        },
        elements: []
      },
      center_top: {
        begin: {
          x: this.camera_width / 3 + this.margins.left,
          y: this.margins.top
        },
        end: {
          x: 2 * this.camera_width / 3 - this.margins.right,
          y: this.margins.top
        },
        elements: []
      },
      top_right: {
        begin: {
          x: 2 * this.camera_width / 3 + this.margins.left,
          y: this.margins.top
        },
        end: { x: this.camera_width - this.margins.right, y: this.margins.top },
        elements: []
      },
      center_right: {
        begin: {
          x: this.camera_width - this.margins.right,
          y: this.camera_height / 3 + this.margins.top
        },
        end: {
          x: this.camera_width - this.margins.right,
          y: 2 * this.camera_height / 3 + this.margins.top
        },
        elements: []
      },
      bottom_right: {
        begin: {
          x: 2 * this.camera_width / 3 + this.margins.left,
          y: this.camera_height - this.margins.bottom
        },
        end: {
          x: this.camera_width - this.margins.right,
          y: this.camera_height - this.margins.bottom
        },
        elements: []
      },
      center_bottom: {
        begin: {
          x: this.camera_width / 3 + this.margins.left,
          y: this.camera_height - this.margins.bottom
        },
        end: {
          x: 2 * this.camera_width / 3 - this.margins.right,
          y: this.camera_height - this.margins.bottom
        },
        elements: []
      },
      bottom_left: {
        begin: {
          x: this.margins.left,
          y: this.camera_height - this.margins.bottom
        },
        end: {
          x: this.camera_width / 3 - this.margins.right,
          y: this.camera_height - this.margins.bottom
        },
        elements: []
      },
      center_left: {
        begin: {
          x: this.margins.left,
          y: this.camera_height / 3 + this.margins.top
        },
        end: {
          x: this.margins.left,
          y: 2 * this.camera_height / 3 - this.margins.bottom
        },
        elements: []
      },
      center: {
        begin: {
          x: this.camera_width / 3 + this.margins.left,
          y: this.camera_center.y
        },
        end: {
          x: 2 * this.camera_width / 3 - this.margins.right,
          y: this.camera_center.y
        },
        elements: []
      }
    };

    // Group HUD / Icons
    this.hud = this.game.add.group();
    this.hudElements = this.game.add.group();

    this.myHouseIcon = this.game.add.image(
      this.regions.top_left.begin.x + 25,
      this.regions.top_left.begin.y,
      "my-house-btn"
    );
    this.OtherHousesIcon = this.game.add.image(
      this.regions.top_left.begin.x + 175,
      this.regions.top_left.begin.y,
      "view-houses-icon"
    );
    this.OtherHousesIcon.data = { state: "SelectorBoot" }
    
    this.videoRoomsIcon = this.game.add.image(
      this.regions.center_top.begin.x + 50,
      this.regions.center_top.begin.y,
      "video-room-icon"
    );
    this.chatRoomsIcon = this.game.add.image(
      this.regions.center_top.begin.x + 200,
      this.regions.center_top.begin.y,
      "chat-rooms-icon"
    );
    this.storeIcon = this.game.add.image(
      this.regions.center_top.begin.x + 350,
      this.regions.center_top.begin.y,
      "store-icon"
    );
    this.settingsIcon = this.game.add.image(
      this.regions.top_right.end.x - 100,
      this.regions.top_right.begin.y - 15,
      "settings-icon"
    );

    this.friendsIcon = this.game.add.image(
      this.regions.top_right.end.x - 125,
      this.regions.bottom_right.begin.y,
      "friends-icon"
    );

    this.background = this.game.add.sprite(0, 0, "lobby-bg");
    this.scaleX = this.game.width / this.background.width;
    this.scaleY = this.game.height / this.background.height;

    this.hudElements.add(this.chatRoomsIcon);
    this.hudElements.add(this.friendsIcon);
    this.hudElements.add(this.myHouseIcon);
    this.hudElements.add(this.OtherHousesIcon);
    this.hudElements.add(this.settingsIcon);
    this.hudElements.add(this.storeIcon);
    this.hudElements.add(this.videoRoomsIcon);

    this.hud.add(this.background);
    this.hud.add(this.hudElements)

    // Add control input to they
    this.hudElements.setAll('inputEnabled', true);
    this.hudElements.setAll('input.useHandCursor', true);

    this.myHouseIcon.events.onInputOver.add(this.listener, this);
    this.OtherHousesIcon.events.onInputOver.add(this.listener, this);
    this.videoRoomsIcon.events.onInputOver.add(this.listener, this);
    this.chatRoomsIcon.events.onInputOver.add(this.listener, this);
    this.storeIcon.events.onInputOver.add(this.listener, this);
    this.settingsIcon.events.onInputOver.add(this.listener, this);
    this.friendsIcon.events.onInputOver.add(this.listener, this);

    this.myHouseIcon.events.onInputOut.add(this.listenerOut, this);
    this.OtherHousesIcon.events.onInputOut.add(this.listenerOut, this);
    this.videoRoomsIcon.events.onInputOut.add(this.listenerOut, this);
    this.chatRoomsIcon.events.onInputOut.add(this.listenerOut, this);
    this.storeIcon.events.onInputOut.add(this.listenerOut, this);
    this.settingsIcon.events.onInputOut.add(this.listenerOut, this);
    this.friendsIcon.events.onInputOut.add(this.listenerOut, this);

    this.OtherHousesIcon.events.onInputDown.add(this.func, this)

    this.resizeIcon(this.chatRoomsIcon);
    this.resizeIcon(this.friendsIcon, 100, 70);
    this.resizeIcon(this.myHouseIcon);
    this.resizeIcon(this.OtherHousesIcon, 150, 75);
    this.resizeIcon(this.settingsIcon, 50, 50);
    this.resizeIcon(this.storeIcon);
    this.resizeIcon(this.videoRoomsIcon);

    this.hud.scale.setTo(this.scaleX, this.scaleY);

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

  listenerOut(sprite){
    sprite.scale.setTo(sprite.scale.x - 0.050, sprite.scale.y - 0.050)
  }

  listener(sprite) {
    sprite.scale.setTo(sprite.scale.x + 0.050, sprite.scale.y + 0.050)
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