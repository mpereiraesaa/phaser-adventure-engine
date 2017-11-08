import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset, frame }) {
    super(game, x, y, asset, frame);
    this.anchor.setTo(0.5);
    this.direction = null;
    this.tween = null;
    this.isMoving = false;

    this.animations.add("UP", [0, 1, 2, 3, 4, 5, 6, 7, 8], 5, true);
    this.animations.add("DOWN", [18, 19, 20, 21, 22, 23, 24, 25, 26], 5, true);
    this.animations.add("LEFT", [17, 16, 15, 14, 13, 12, 11, 10, 9], 5, true);
    this.animations.add("RIGHT", [27, 28, 29, 30, 31, 32, 33, 34, 35], 5, true);
  }

  stopMovement() {
    this.animations.stop(null, true);
    this.tween.stop();
  }

  moveCharacter(pointer) {
    // the player is moving now!
    if (this.isMoving) {
      this.stopMovement();
    }

    this.isMoving = true;

    let targetAngle =
      360 /
        (2 * Math.PI) *
        this.game.math.angleBetween(this.x, this.y, pointer.x, pointer.y) +
      90;

    if (targetAngle > 45 && targetAngle < 135) {
      this.direction = "RIGHT";
    } else if (targetAngle > 225 && targetAngle < 315) {
      this.direction = "LEFT";
    } else if (targetAngle > 135 && targetAngle < 225) {
      this.direction = "DOWN";
    } else {
      this.direction = "UP";
    }

    // 300 means 300 pixels per second. This is the speed the sprite will move at, regardless of the distance it has to travel.
    let duration =
      this.game.physics.arcade.distanceToPointer(this, pointer) / 200 * 1000;

    // pointer.x and pointer.y are the input x and y values coming from the mouse click or tap.
    this.tween = this.game.add
      .tween(this)
      .to(
        { x: pointer.x, y: pointer.y },
        duration,
        Phaser.Easing.Linear.None,
        true
      );

    // once tween is completed, call moveCharacterComplete()
    this.tween.onComplete.add(this.moveCharacterComplete, this);

    window.player = this;
  }

  moveCharacterComplete() {
    this.isMoving = false;
    this.stopMovement();
  }

  update() {
    if (this.isMoving) {
      this.animations.play(this.direction, 10, true);
    }
  }
}
