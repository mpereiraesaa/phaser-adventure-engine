import Scene from './Scene'

export default class extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    console.debug("Point and click adventure plugin initialised");
    this.scenes = {};
    this.initSignals();
    this.navGraph;
  }

  initSignals() {
    this.signals = {
      sceneTappedSignal: new Phaser.Signal(),
      playerMovementSignal: new Phaser.Signal(),
      navGraphUpdated: new Phaser.Signal()
    };

    this.signals.navGraphUpdated.add(function(graph) {
      this.navGraph = graph;
    }, this);
  }

  /**
   * addScene - adds a new scene to the game
   * @param {String} key - the name to refer to this scene
   * @param {Object} sceneDefinition - JSON object with scene data
   * @param {boolean} switchTo - whether to switch to this scene immediately or not
   * @return {Phaser.Plugin.PNCAdventure.Scene} the resulting scene state object
   */
  addScene(key, sceneDefinition, switchTo) {    
    if (this.scenes[key] !== undefined) {
      console.error("Scene " + key + " already exists");
      return false;
    }
    this.scenes[key] = new Scene(
      key,
      sceneDefinition
    );
    this.game.state.add("PNC." + key, this.scenes[key], switchTo);
    return this.scenes[key];
  }

  /**
   * adds an actor to the scene
   * @param {Phaser.Plugin.PNCAdventure.Scene} scene - the scene to add the actor to
   * @param {Object} actorDefinition - json data for this actor
   */
  addActor(scene, actorDefinition) {
    return scene.initActor(actorDefinition);
  }
}