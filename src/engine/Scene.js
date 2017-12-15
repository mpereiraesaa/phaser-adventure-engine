import Navmesh from "./Navmesh";
import Actor from "./Actor";
import PlayerActor from "./PlayerActor";

export default class Scene extends Phaser.State {
  constructor(key, sceneDefinition) {
    super();
    this.key = key;
    this.sceneDefinition = sceneDefinition;
    this.preloadItems = [];
    this.actors = [];
    this.objects = [];
    this.player = null;
    this.willMove = null;

    this.spriterLoader = new Spriter.Loader();

    this.spriterFile = new Spriter.SpriterJSON(
      game.cache.getJSON("playerJson"),
      /* optional parameters */ {
        imageNameType: Spriter.eImageNameType.NAME_ONLY
      }
    );

    // Now create Player and add it onto the game
    this.spriterData = this.spriterLoader.load(this.spriterFile);
  }

  preload() {
    /*
    Hacky implementation for now - need to standardise scenedef and process this separately
     */
    // Default player
    // this.game.load.atlas("playerAtlas", "./assets/images/player/player.png", "./assets/images/player/player.json");
    // this.game.load.json("playerJson", "./assets/images/player/player.scon");

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

  shutdown() {
    document.getElementById("chat-bar").style.display = "none";
  }

  create() {
    console.debug("Scene initialised");
    document.getElementById("chat-bar").style.display = "block";
    this.camera.flash("#000000");
    this.createSceneHierarchy();
    this.game.network.scene = this;

    // Chat vars
    this.chatGroup = this.game.make.group(null);
    this.chatMessages = this.game.make.group(null);
    this.messages = [];

    // Trigger chat enter event
    this.setupChatLog();
    this.chatEvent();

    this.game.network.otherPlayers = new Map();

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

      this.navmesh.backgroundScale = { x: this.scaleX, y: this.scaleY };

      if (this.sceneDefinition.navmeshPoints) {
        this.navmeshPoints = this.sceneDefinition.navmeshPoints;
        this.navmesh.loadPolygonFromNodes(this.navmeshPoints);
      }
      if (this.sceneDefinition.shape) {
        this.navmesh.loadSolidPolygonFromNodes(this.sceneDefinition.shape);
      }
      if (this.sceneDefinition.points) {
        let nodes = this.sceneDefinition.points;
        for (var i = 0; i < nodes.length; i++) {
          this.navmesh.addPoint(nodes[i]);
        }
      }
    }

    if (this.objects.length) {
      for (var i = 0; i < this.objects.length; i++) {
        this.layers.background.add(this.objects[i]);
      }
    }
  }

  chatEvent() {
    document.getElementById("chat-bar").addEventListener("keypress", e => {
      let key = e.which || e.keyCode;
      if (key === 13) {
        // 13 is enter
        // code for enter
        let message = document.getElementById("chat-input-text").value;

        this.pushMessages({author: this.game.network.uniqueID, text: message});

        document.getElementById("chat-input-text").value = "";

        this.game.network.sendKeyMessage({
          chatbox: true,
          message: message
        });
      }
    });
  }

  animateActors() {
    let i = 0;
    for (; i < this.layers.actors.children.length; i++) {
      this.layers.actors.children[i].updateAnimation();
    }
  }

  update() {
    this.game.network.frameCounter++;
    this.handleInput();

    if (this.background.input.pointerOver()) {
      this.navmesh.updatePointerLocation(
        this.background.input.pointerX(),
        this.background.input.pointerY()
      );
    }
    this.navmesh.updateCharacterLocation(this.actors[0].x, this.actors[0].y);

    // Animate actors on screen
    this.animateActors();

    // We check for depth of players
    this.layers.actors.sort("y", Phaser.Group.SORT_ASCENDING);
  }

  findActor(id) {
    return this.actors.find(actor => {
      return actor.id == id;
    });
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

  handleKeyMessages() {
    const earlyMessages = [];
    const lateMessages = [];

    this.game.network.keyMessages.forEach(messageEvent => {
      if (this.game.network.otherPlayers) {
        if (messageEvent.channel === this.game.network.currentChannelName) {
          if (this.game.network.otherPlayers.has(messageEvent.message.uuid)) {
            this.addCharacter(messageEvent.message.uuid);

            const otherplayer = this.game.network.otherPlayers.get(
              messageEvent.message.uuid
            );
            // otherplayer.position.set(messageEvent.message.position.x, messageEvent.message.position.y);
            otherplayer.initialRemoteFrame = messageEvent.message.frameCounter;
            otherplayer.initialLocalFrame = this.game.network.frameCounter;
            this.game.network.sendKeyMessage({});
          }

          if (messageEvent.message.keyMessage.chatbox) {
            this.pushMessages({
              author: messageEvent.message.uuid,
              text: messageEvent.message.keyMessage.message
            });
          }

          if (
            messageEvent.message.position &&
            this.game.network.otherPlayers.has(messageEvent.message.uuid)
          ) {
            this.game.network.keyMessages.push(messageEvent);
            const otherplayer = this.game.network.otherPlayers.get(
              messageEvent.message.uuid
            );
            const frameDelta =
              messageEvent.message.frameCounter - otherplayer.lastKeyFrame;
            const initDelta =
              otherplayer.initialRemoteFrame - otherplayer.initialLocalFrame;
            const frameDelay =
              messageEvent.message.frameCounter -
              this.game.network.frameCounter -
              initDelta +
              this.game.network.syncOtherPlayerFrameDelay;

            if (frameDelay > 0) {
              if (!messageEvent.hasOwnProperty("frameDelay")) {
                messageEvent.frameDelay = frameDelay;
                otherplayer.totalRecvedFrameDelay += frameDelay;
                otherplayer.totalRecvedFrames++;
              }

              earlyMessages.push(messageEvent);
              return;
            } else if (frameDelay < 0) {
              otherplayer.totalRecvedFrameDelay += frameDelay;
              otherplayer.totalRecvedFrames++;
              lateMessages.push(messageEvent);
              return;
            }

            otherplayer.lastKeyFrame = messageEvent.message.frameCounter;

            if (messageEvent.message.keyMessage.willMove) {
              if (
                messageEvent.message.keyMessage.x &&
                messageEvent.message.keyMessage.y &&
                messageEvent.message.keyMessage.path
              ) {
                otherplayer.willMove = {
                  x: messageEvent.message.keyMessage.x,
                  y: messageEvent.message.keyMessage.y,
                  path: messageEvent.message.keyMessage.path,
                  clientWidth: messageEvent.message.keyMessage.clientWidth,
                  clientHeight: messageEvent.message.keyMessage.clientHeight
                };
              }
            }
          }
        }
      }
    });

    if (lateMessages.length > 0) {
      console.log({ lateMessages, earlyMessages });
    }

    this.game.network.keyMessages.length = 0;

    earlyMessages.forEach(em => {
      this.game.network.keyMessages.push(em);
    });
  }

  resetPath(path, clientRes) {
    let result = [];
    for (var i = 0; i < path.length; i++) {
      result[i] = {
        x: path[i].x / clientRes.clientWidth * this.game.width,
        y: path[i].y / clientRes.clientHeight * this.game.height
      };
    }

    return result;
  }

  handleInput() {
    this.handleKeyMessages();

    if (this.player) {
      for (const uuid of this.game.network.otherPlayers.keys()) {
        const otherplayer = this.game.network.otherPlayers.get(uuid);
        if (otherplayer.willMove) {
          let clientRes = {
            clientWidth: otherplayer.willMove.clientWidth,
            clientHeight: otherplayer.willMove.clientHeight
          };
          let path = this.resetPath(otherplayer.willMove.path, clientRes);

          otherplayer.moveTo(
            { x: otherplayer.willMove.x, y: otherplayer.willMove.y },
            path
          );
          otherplayer.willMove = null;
        }
      }
    }
  }

  /**
   * initBackground - create the background sprite
   */
  initBackground() {
    this.background = this.game.add.sprite(0, 0, this.key + "bg");
    this.scaleX = this.game.width / this.background.width;
    this.scaleY = this.game.height / this.background.height;

    this.background.scale.setTo(this.scaleX, this.scaleY);
    this.layers.background.add(this.background);
    this.background.inputEnabled = true;
    this.background.events.onInputUp.add(function(sprite, pointer, g) {
      this.game.pncPlugin.signals.sceneTappedSignal.dispatch(
        pointer,
        this.navmesh
      );
    }, this);
  }

  setupChatLog() {
    let box = null;
    let topY = 0 + 100;
    let topX = 50;

    box = this.game.make.graphics(topX, topY);
    box.drawRect(0, 0, this.game.width / 2, this.game.height / 3);
    box.inputEnabled = false;

    this.chatGroup.add(box);

    this.chatGroup.add(this.chatMessages);

    this.objects.push(this.chatGroup);
  }

  clearMessages() {
    while (this.chatMessages.children.length != 0) {
      this.chatMessages.children[0].destroy();
    }
  }

  pushMessages(msg) {
    if (this.messages.length == 5) {
      this.messages.shift();

      // Tween out that first old message.
      let endTween = game.add
        .tween(this.chatMessages.children[0])
        .to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0);

      endTween.start();

      endTween.onComplete.add(() => {
        this.chatMessages.children[0].destroy();

        this.clearMessages();
      }, this);
    }

    this.messages.push(msg);
    this.clearMessages();
    this.renderMessages();
  }

  renderMessages() {
    let i = 0;
    let textStyle = {
      font: "16px Courier",
      fill: "rgba(0,0,0,0.7)",
      fontWeight: "600",
      align: "left",
      boundsAlignH: "left"
    };

    for (; i < this.messages.length; i++) {
      let text = game.make.text(
        this.chatGroup.children[0].x,
        this.chatGroup.children[0].y + i * 24,
        `${this.messages[i].author}: ${this.messages[i].text}`,
        textStyle
      );

      text.addColor('blue', 0);
      text.addColor('blue', this.messages[i].author.length);

      text.addColor('rgba(0,0,0,0.7)', this.messages[i].author.length);
      text.addColor('rgba(0,0,0,0.7)', this.messages[i].author.length + this.messages[i].text.length);

      text.setTextBounds(16, 16, this.game.width, this.game.height);

      this.chatMessages.add(text);
    }

    this.chatMessages.children[i - 1].alpha = 0;

    let startTween = game.add
      .tween(this.chatMessages.children[i - 1])
      .to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0);

    startTween.start();
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

  addCharacter(uuid) {
    if (this.game.network.otherPlayers.has(uuid)) {
      return;
    }

    let actorDefinition = {
      spriterData: this.spriterData,
      textureKey: "playerAtlas",
      isSmall: true,
      spawnX: 200,
      spawnY: 600,
      type: Actor,
      uuid: uuid
    };

    if (!this.state) {
      this.actors.push(actorDefinition);
    } else {
      this.addActorToScene(actorDefinition);
    }
  }

  initObjects(gameObject) {
    // if this state is not active defer object creation until it is
    if (!this.state) {
      this.objects.push(gameObject);
    } else {
      this.layers.background.add(gameObject);
    }
  }

  removeCharacter(uuid) {
    if (!this.game.network.otherPlayers.has(uuid)) {
      return;
    }

    this.game.network.otherPlayers.get(uuid).destroy();
    this.game.network.otherPlayers.delete(uuid);
  }

  /**
   * Creates the actor object and adds to the actors layer.
   * @param {Object} actorDefinition - the actor definition data
   */
  addActorToScene(actorDefinition) {
    var actor;

    if (actorDefinition.type === undefined) {
      actor = new PlayerActor(game, actorDefinition);
      this.game.network.player = actor;
      this.player = actor;
    } else {
      actorDefinition.id = 1;
      actor = new actorDefinition.type(game, actorDefinition);
    }

    if (actorDefinition.uuid) {
      this.game.network.otherPlayers.set(actorDefinition.uuid, actor);
    }

    // Set spawn position for actor
    actor.position.setTo(actorDefinition.spawnX, actorDefinition.spawnY);

    actor.onVariableSet.add((spriter, variable) => {
      this._text = variable.string;
    }, this);

    this.layers.actors.add(actor);

    this.game.network.sendKeyMessage({});

    return actor;
  }
}