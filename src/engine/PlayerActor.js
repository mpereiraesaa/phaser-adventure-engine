import Actor from './Actor'

export default class extends Actor {
  constructor(game, actorDefinition) {
    super(game, actorDefinition);
    console.debug("PlayerActor initialised");
    this.initSignalListeners();
  }

  lookAt(pointer){
    let angle =
      (Phaser.Math.angleBetween(
        this.x,
        this.y,
        pointer.x,
        pointer.y
      ) *
      180) /
      Math.PI;

    console.log(`Angulo del puntero direccion en Grados: ${angle}`)

    if(angle > -100 && angle < -80){
      console.log("ANGULO SUPERIOR")
    } else if(angle < -10 && angle > -80){
      console.log("ANGULO SUPERIOR DERECHO")
    } else if(angle < -110 && angle > -170){
      console.log("ANGULO SUPERIOR IZQUIERDO")
    } else if(angle > -10 && angle < 10){
      console.log("ANGULO DERECHO")
    } else if( (angle > -180 && angle < -170) || ( angle > 170 && angle < 180) || angle === 180){
      console.log("ANGULO IZQUIERDO")
    } else if(angle > 80 && angle < 100){
      console.log("ANGULO INFERIOR")
    } else if(angle > 10 && angle < 80){
      console.log("ANGULO INFERIOR DERECHO")
    } else if(angle > 100 && angle < 170){
      console.log("ANGULO INFERIOR IZQUIERDO")
    }
  }

  initSignalListeners() {
    this.game.pncPlugin.signals.sceneTappedSignal.add(function(
      pointer,
      navmesh
    ) {
      console.debug("Movement signal received");
      if (!navmesh) {
        return;
      }

      if (this.walkTween && this.walkTween.isRunning) {
        this.walkTween.stop();
      }

      this.walkTween = this.game.add.tween(this);

      this.lookAt(pointer)

      var outOfBounds = navmesh.isPointerOutOfBounds(pointer)

      if(outOfBounds){
        return false
      }

      var path = navmesh.findPath();
      console.log(path);

      var pointer;
      for (var i = 0; i < path.length; i++) {
        pointer = path[i];
        var distance = Phaser.Math.distance(
          path[i - 1] != undefined ? path[i - 1].x : this.x,
          path[i - 1] != undefined ? path[i - 1].y : this.y,
          pointer.x,
          pointer.y
        );
        this.walkTween.to({ x: pointer.x, y: pointer.y }, distance * 4);
      }

      this.walkTween.start();
    },
    this);
  }
}