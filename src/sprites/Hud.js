import Phaser from "phaser";

export default class Hud extends Phaser.Group {
  constructor(game) {
    super(game, null);

    this.margins = { left: 20, right: 50, top: 20, bottom: 220 };

    this.camera_width = game.camera.width;
    this.camera_height = game.camera.height;
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

    // Hud Components
    this.myHouseIcon = new Phaser.Image(game, 
      this.regions.top_left.begin.x,
      this.regions.top_left.begin.y,
      "my-house-btn"
    );

    this.OtherHousesIcon = new Phaser.Image(game, 
      (this.regions.top_left.begin.x) + (this.myHouseIcon.width) + 30,
      this.regions.top_left.begin.y,
      "view-houses-icon"
    );

    this.videoRoomsIcon = new Phaser.Image(game, 
      this.OtherHousesIcon.x + this.OtherHousesIcon.width + 30,
      this.regions.center_top.begin.y,
      "video-room-icon"
    );

    this.chatRoomsIcon = new Phaser.Image(game, 
      this.videoRoomsIcon.x + this.videoRoomsIcon.width + 30,
      this.regions.center_top.begin.y,
      "chat-rooms-icon"
    );

    this.storeIcon = new Phaser.Image(game, 
      this.chatRoomsIcon.x + this.chatRoomsIcon.width + 30,
      this.regions.center_top.begin.y,
      "store-icon"
    );

    this.settingsIcon = new Phaser.Image(game, 
      this.storeIcon.x + this.storeIcon.width + 30,
      this.regions.top_right.begin.y - 15,
      "settings-icon"
    );

    this.friendsIcon = new Phaser.Image(game, 
      0 + this.game.width,
      this.regions.bottom_right.begin.y,
      "friends-icon"
    );

    // Add data state info to handle state switch
    this.OtherHousesIcon.data = { state: "SelectorBoot" };

    // Add to itself
    this.add(this.chatRoomsIcon);
    this.add(this.friendsIcon);
    this.add(this.myHouseIcon);
    this.add(this.OtherHousesIcon);
    this.add(this.settingsIcon);
    this.add(this.storeIcon);
    this.add(this.videoRoomsIcon);    

    // Add control input to they
    this.setAll("inputEnabled", true);
    this.setAll("input.useHandCursor", true);

    this.onChildInputOver.add(this.zoomIn, this);
    this.onChildInputOut.add(this.zoomOut, this);
    this.OtherHousesIcon.events.onInputDown.add(this.runState, this);

    this.resizeIcon(this.chatRoomsIcon);
    this.resizeIcon(this.friendsIcon, 100, 70);
    this.resizeIcon(this.myHouseIcon);
    this.resizeIcon(this.OtherHousesIcon, 150, 75);
    this.resizeIcon(this.settingsIcon, 50, 50);
    this.resizeIcon(this.storeIcon);
    this.resizeIcon(this.videoRoomsIcon);
  }

  resizeIcon(img, sizeW, sizeH) {
    let w = sizeW ? sizeW : 80;
    let h = sizeH ? sizeH : 80;
    let scaleX = w / img.width;
    let scaleY = h / img.height;

    img.scale.setTo(scaleX, scaleY);
  }

  runState(el) {
    game.state.start(el.data.state);
  }

  zoomOut(sprite) {
    sprite.scale.setTo(sprite.scale.x - 0.05, sprite.scale.y - 0.05);
  }

  zoomIn(sprite) {
    sprite.scale.setTo(sprite.scale.x + 0.05, sprite.scale.y + 0.05);
  }
}