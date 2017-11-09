export default class extends Phaser.Sprite {
  /**
   * Actor object extends the Phaser.Sprite object and represents a character
   */
  constructor(game, actorDefinition) {
    if (actorDefinition === undefined) {
      actorDefinition = {
        x: 0,
        y: 0,
        image: "",
        frame: 0
      };
    }

    super(
      game,
      actorDefinition.x,
      actorDefinition.y,
      actorDefinition.image,
      actorDefinition.frame
    );

    this.anchor.setTo(0.5, 1);

    this.walkSpeed = 50;
    this.averageWalkSpeed = 100;

    console.debug("Actor initialised");
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
}