import "script-loader!../../assets/lib/spriter/spriter.js";
import ActorConfig from './ActorConfig'

export default class PlayerActor extends Spriter.SpriterGroup {
  constructor(game, actorDefinition) {
    super(
      game,
      actorDefinition.spriterData,
      actorDefinition.textureKey,
      ActorConfig.ENTITY,
      ActorConfig.START_ANIMATION_INDEX
    );

    if (actorDefinition.isSmall) {
      this.scaleX = 90 / this.width;
      this.scaleY = 120 / this.height;

      this.scale.setTo(this.scaleX, this.scaleY);
    }

    console.debug("PlayerActor initialised");
    this.initSignalListeners();

    window.player = this;
    this._animationSpeed = 0.6;

    // player bounds - circle
    this.drawBounds();
  }

  drawBounds() {
    this.bounds = null;
    this.boundsGrp = this.game.make.group(null);
    let bmd = this.game.make.bitmapData(60, 60);
    let maskBitmap = this.game.make.bitmapData(60, 60);

    bmd.circle(30, 30, 30, "rgba(43, 41, 42, 0.3)");
    bmd.circle(30, 30, 20, "rgba(43, 41, 42, 0.7)");

    maskBitmap.circle(30, 30, 30, "rgba(224, 119, 44, 0.5)");

    this.maskImg = this.game.make.image(0, 0, maskBitmap);
    this.maskImg.width = this.maskImg.width + this.maskImg.width;
    this.maskImg.anchor.set(0.5);
    this.maskImg.visible = false;

    this.bounds = this.game.make.sprite(0, 0, bmd);
    this.bounds.width = this.bounds.width + this.bounds.width;
    this.bounds.anchor.set(0.5);

    this.boundsGrp.add(this.bounds);
    this.boundsGrp.add(this.maskImg);

    // Add input
    this.bounds.inputEnabled = true;
    this.bounds.input.useHandCursor = true;

    this.bounds.events.onInputOver.add(sprite => {
      this.maskImg.visible = true;
    }, this);

    this.bounds.events.onInputOut.add(sprite => {
      this.maskImg.visible = false;
    }, this);

    window.boundsGrp = this.boundsGrp;

    this.addAt(this.boundsGrp, 0);
  }

  update() {
    this.updateAnimation();

    if (this.walkTween && this.walkTween.isRunning) {
      this.calcAngle(this.xyPoint);

      if (this.angleTo != this.walkTween.angleToBegin) {
        this.lookAt()
      }
    }
  }

  walkTo(point, walkSpeed) {
    if (!walkSpeed) {
      walkSpeed = this.walkSpeed;
    }
    if (this.walkingTween) {
      this.walkingTween.stop();
      this.walkingTween = null;
    }
    var distance = Phaser.Math.distance(this.x, this.y, point.x, point.y);
    this.walkingTween = this.game.add
      .tween(this)
      .to(
        {
          x: point.x,
          y: point.y
        },
        distance * this.averageWalkSpeed * (1 / walkSpeed)
      )
      .start();
  }

  walkPath(path, polys, finalPoint, walkSpeed) {
    if (!walkSpeed) {
      walkSpeed = this.walkSpeed;
    }
    if (this.walkingTween) {
      this.walkingTween.stop();
      this.walkingTween = null;
    }
    this.walkingTween = this.game.add.tween(this);

    for (var i = 0; i < path.length; i++) {
      var point = polys[path[i]].centroid;
      var distance = Phaser.Math.distance(this.x, this.y, point.x, point.y);
      if (
        i == path.length - 1 &&
        polys[path[i]].contains(finalPoint.x, finalPoint.y)
      ) {
        this.walkingTween.to(
          {
            x: finalPoint.x,
            y: finalPoint.y
          },
          distance * walkSpeed / 10,
          Phaser.Easing.Linear.None
        );
      } else {
        if (distance != 0) {
          this.walkingTween.to(
            {
              x: point.x,
              y: point.y
            },
            distance * walkSpeed / 10,
            Phaser.Easing.Linear.None
          );
        }
      }
    }

    this.walkingTween.start();
  }

  calcAngle(pointer) {
    if (pointer) {
      this.angleTo =
        Phaser.Math.angleBetween(this.x, this.y, pointer.x, pointer.y) *
        180 /
        Math.PI;
    }

    if (this.angleTo > -100 && this.angleTo < -80) {
      this.angleTo = "UPPER";
    } else if (this.angleTo < -10 && this.angleTo > -80) {
      this.angleTo = "UPPER_RIGHT";
    } else if (this.angleTo < -110 && this.angleTo > -170) {
      this.angleTo = "UPPER_LEFT";
    } else if (this.angleTo > -10 && this.angleTo < 10) {
      this.angleTo = "RIGHT";
    } else if (
      (this.angleTo > -180 && this.angleTo < -170) ||
      (this.angleTo > 170 && this.angleTo < 180) ||
      this.angleTo === 180
    ) {
      this.angleTo = "LEFT";
    } else if (this.angleTo > 80 && this.angleTo < 100) {
      this.angleTo = "LOWER";
    } else if (this.angleTo > 10 && this.angleTo < 80) {
      this.angleTo = "LOWER_RIGHT";
    } else if (this.angleTo > 100 && this.angleTo < 170) {
      this.angleTo = "LOWER_LEFT";
    }
  }

  lookAt() {
    if (this.angleTo == "UPPER") {
      this.playAnimationById(ActorConfig.BACK_IDLE_INDEX);
      console.log("ANGULO SUPERIOR");
    } else if (this.angleTo == "UPPER_RIGHT") {
      this.playAnimationById(ActorConfig.BACKRIGHT_ANIMATION_INDEX);
      console.log("ANGULO SUPERIOR DERECHO");
    } else if (this.angleTo == "UPPER_LEFT") {
      this.playAnimationById(ActorConfig.BACKLEFT_ANIMATION_INDEX);
      console.log("ANGULO SUPERIOR IZQUIERDO");
    } else if (this.angleTo == "RIGHT") {
      this.playAnimationById(ActorConfig.RIGHT_ANIMATION_INDEX);
      console.log("ANGULO DERECHO");
    } else if (this.angleTo == "LEFT") {
      this.playAnimationById(ActorConfig.LEFT_ANIMATION_INDEX);
      console.log("ANGULO IZQUIERDO");
    } else if (this.angleTo == "LOWER") {
      this.playAnimationById(ActorConfig.FRONT_IDLE_INDEX);
      console.log("ANGULO INFERIOR");
    } else if (this.angleTo == "LOWER_RIGHT") {
      this.playAnimationById(ActorConfig.FRONTLEFT_ANIMATION_INDEX);
      console.log("ANGULO INFERIOR DERECHO");
    } else if (this.angleTo == "LOWER_LEFT") {
      this.playAnimationById(ActorConfig.FRONTLEFT_ANIMATION_INDEX);
      console.log("ANGULO INFERIOR IZQUIERDO");
    }
  }

  stopAndLookAt(tween) {
    if (tween.angleToBegin == "UPPER") {
      this.playAnimationById(ActorConfig.BACK_IDLE_INDEX);
      console.log("ANGULO SUPERIOR");
    } else if (tween.angleToBegin == "UPPER_RIGHT") {
      this.playAnimationById(ActorConfig.BACK_IDLE_INDEX);
      console.log("ANGULO SUPERIOR DERECHO");
    } else if (tween.angleToBegin == "UPPER_LEFT") {
      this.playAnimationById(ActorConfig.BACK_IDLE_INDEX);
      console.log("ANGULO SUPERIOR IZQUIERDO");
    } else if (tween.angleToBegin == "RIGHT") {
      this.playAnimationById(ActorConfig.FRONT_IDLE_INDEX);
      console.log("ANGULO DERECHO");
    } else if (tween.angleToBegin == "LEFT") {
      this.playAnimationById(ActorConfig.FRONT_IDLE_INDEX);
      console.log("ANGULO IZQUIERDO");
    } else if (tween.angleToBegin == "LOWER") {
      this.playAnimationById(ActorConfig.FRONT_IDLE_INDEX);
      console.log("ANGULO INFERIOR");
    } else if (tween.angleToBegin == "LOWER_RIGHT") {
      this.playAnimationById(ActorConfig.FRONT_IDLE_INDEX);
      console.log("ANGULO INFERIOR DERECHO");
    } else if (tween.angleToBegin == "LOWER_LEFT") {
      this.playAnimationById(ActorConfig.FRONT_IDLE_INDEX);
      console.log("ANGULO INFERIOR IZQUIERDO");
    }
  }

  movementComplete(player, tween) {
    this.stopAndLookAt(tween);
  }

  initSignalListeners() {
    this.game.pncPlugin.signals.sceneTappedSignal.add(function(
      pointer,
      navmesh
    ) {
      var outOfBounds = navmesh.isPointerOutOfBounds(pointer);

      if (outOfBounds) {
        return false;
      }
      
      this.xyPoint = { x: pointer.x, y: pointer.y };

      console.debug("Movement signal received");
      if (!navmesh) {
        return;
      }

      if (this.walkTween && this.walkTween.isRunning) {
        this.walkTween.stop();
      }

      this.walkTween = this.game.add.tween(this);
      this.walkTween.onComplete.add(this.movementComplete, this);

      this.calcAngle(pointer);
      this.walkTween.angleToBegin = this.angleTo;

      this.lookAt();

      var path = navmesh.findPath();

      this.game.network.sendKeyMessage({
        willMove: true,
        x: pointer.x,
        y: pointer.y,
        path: path,
        clientWidth: game.width,
        clientHeight: game.height
      });

      var pointer;
      for (var i = 0; i < path.length; i++) {
        pointer = path[i];
        var distance = Phaser.Math.distance(
          path[i - 1] != undefined ? path[i - 1].x : this.x,
          path[i - 1] != undefined ? path[i - 1].y : this.y,
          pointer.x,
          pointer.y
        );
        this.walkTween.to({ x: pointer.x, y: pointer.y }, distance * 7);
      }

      this.walkTween.start();
    },
    this);
  }
}