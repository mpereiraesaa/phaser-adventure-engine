import Navmesh from './Navmesh'
import Actor from './Actor'

export default class Scene extends Phaser.State {
  constructor(key, sceneDefinition) {
    super()
    this.key = key;
    this.sceneDefinition = sceneDefinition;
    this.preloadItems = [];
    this.actors = [];
  }

  preload() {
    /*
    Hacky implementation for now - need to standardise scenedef and process this separately
     */
    if (this.sceneDefinition.bg) {
      this.game.load.image(this.key + "bg", this.sceneDefinition.bg);
    }
    if (this.sceneDefinition.player) {
      this.game.load.image(
        this.sceneDefinition.player.image,
        this.sceneDefinition.player.image
      );
    }
  }

  create() {
    console.debug("Scene initialised");
    this.createSceneHierarchy();
    if (this.sceneDefinition.bg) {
      this.initBackground();
    }
    if (this.actors.length > 0) {
      for (var i = 0; i < this.actors.length; i++) {
        this.actors[i] = this.addActorToScene(this.actors[i]);
      }
    }

    if (Navmesh) {
      this.navmesh = new Navmesh(game);
      if (this.sceneDefinition.navmeshPoints) {
        this.navmeshPoints = this.sceneDefinition.navmeshPoints;
        this.navmesh.loadPolygonFromNodes(this.navmeshPoints);
      }
    }
  }

  update() {
    if (this.background.input.pointerOver()) {
      this.navmesh.updatePointerLocation(
        this.background.input.pointerX(),
        this.background.input.pointerY()
      );
    }
    this.navmesh.updateCharacterLocation(this.actors[0].x, this.actors[0].y);
  }

  setNavGraph(graph) {
    this.graph = graph;
  }

  addNavmeshPoly(poly) {
    this.navmesh.push(poly);
  }

  setNavmeshPolys(navmeshPolys) {
    this.navmesh = navmeshPolys;
  }

  loadJSONPolyData(data) {
    this.navmesh = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i]._points) {
        data[i].points = data[i]._points;
        data[i]._points = null;
      }

      var poly = new Phaser.Polygon(data[i].points);
      poly.centroid = data[i].centroid;

      this.navmesh.push(poly);
    }
    if (!data.length && data[0].points) {
      return;
    }
  }

  addLayer(name) {
    if (this.layers === undefined) {
      this.layers = {};
    } else if (this.layers[name] !== undefined) {
      console.error("Layer " + name + " already exists");
      return;
    }
    console.debug("Layer " + name + " added");
    this.layers[name] = this.game.add.group();
    this.sceneGroup.add(this.layers[name]);
    return this.layers[name];
  }

  createSceneHierarchy() {
    this.sceneGroup = this.game.add.group();

    this.addLayer("background");
    this.addLayer("actors");
  }

  /**
   * initBackground - create the background sprite
   */
  initBackground() {
    this.background = this.game.add.sprite(0, 0, this.key + "bg");
    this.layers.background.add(this.background);
    this.background.inputEnabled = true;
    this.background.events.onInputUp.add(function(sprite, pointer, g) {
      console.log(`x: ${pointer.x}, y: ${pointer.y}`)
      this.game.pncPlugin.signals.sceneTappedSignal.dispatch(
        pointer,
        this.navmesh
      );
    }, this);
  }

  /**
   * initialises an actor into the scene. This does not directly create an actor object.
   * If scene is active, it is added immediately. If inactive, adds to actors array to be added later.
   * @param  {[type]} actorDefinition [description]
   * @return {[type]}                 [description]
   */
  initActor(actorDefinition) {
    // if this state is not active defer actor creation until it is
    if (!this.state) {
      this.actors.push(actorDefinition);
    } else {
      this.addActorToScene(actorDefinition);
    }
  }

  /**
   * Creates the actor object and adds to the actors layer.
   * @param {Object} actorDefinition - the actor definition data
   */
  addActorToScene(actorDefinition) {
    var actor;

    if (actorDefinition.type === undefined) {
      actor = new Actor(game, actorDefinition);
      this.layers.actors.add(actor);
    } else {
      actor = new actorDefinition.type(game, actorDefinition);
      this.layers.actors.add(actor);
    }

    return actor;
  }
}