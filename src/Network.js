import Start from "./index";
import PubNub from 'pubnub';

export default class Network {
  constructor(game) {
    this.game = game;
    this.syncOtherPlayerFrameDelay = 0;
    this.currentChannelName = 'alpha';
    this.uniqueID = PubNub.generateUUID();
    this.updateOccupancyCounter = false;
    this.checkIfJoined = false;
    this.otherPlayers = null;
    this.player = null;
    this.scene = {};
    this.frameCounter = 0;

    // wrapped network into phaser game object
    this.game.network = this;

    // Setup your PubNub Keys
    window.pubnub = this.pubnub = new PubNub({
      publishKey: 'pub-c-83603ce4-b7ec-4da7-bb8a-9b5997f8ae7c',
      subscribeKey: 'sub-c-da7cca86-dbb5-11e7-9445-0e38ba8011c7',
      uuid: this.uniqueID
    });

    // Subscribe to the two PubNub Channels
    this.pubnub.subscribe({
      channels: [this.currentChannelName],
      withPresence: true,
    });

    this.keyMessages = [];

    this.listener = {
      status: this.listenerStatus.bind(this),
      message: this.listenerMessage.bind(this), 
      presence: this.listenerPresence.bind(this)
    };

    this.installEvents();
  }

  listenerStatus() {
    Start(this.game);
  }

  listenerMessage(messageEvent) {
    if (messageEvent.message.uuid === this.uniqueID) {
      return; // this blocks drawing a new character set by the server for ourselve, to lower latency
    }
    if (this.otherPlayers) {
      // If player exists
      if (messageEvent.channel === this.currentChannelName) {
        // If the messages channel is equal to your current channel
        if (!this.otherPlayers.has(messageEvent.message.uuid)) {
          // If the message isn't equal to your uuid
          this.game.pncPlugin.addOtherCharacter(
            this.scene,
            messageEvent.message.uuid
          );
          this.sendKeyMessage({}); // Send publish to all clients about user information
          const otherplayer = this.otherPlayers.get(messageEvent.message.uuid);
          otherplayer.position.set(
            messageEvent.message.position.x,
            messageEvent.message.position.y
          ); // set the position of each player according to x y
          otherplayer.initialRemoteFrame = messageEvent.message.frameCounter;
          otherplayer.initialLocalFrame = this.frameCounter;
          otherplayer.totalRecvedFrameDelay = 0;
          otherplayer.totalRecvedFrames = 0;
        }
        if (
          messageEvent.message.position &&
          this.otherPlayers.has(messageEvent.message.uuid)
        ) {
          // If the message contains the position of the player and the player has a uuid that matches with one in the level
          this.keyMessages.push(messageEvent);
        }
      }
    }
  }

  checkFlag() {
    let textResponse1;
    // Function that reruns until response
    if (this.otherPlayers && this.checkIfJoined === true) {
      // If the globalother heros exists and if the player joined equals true
      clearInterval(this.occupancyCounter); // Destroy the timer for that scene
      this.updateOccupancyCounter = true; // Update the variable that stops the timer from running
      // Run PubNub HereNow function that controls the occupancy
      this.pubnub.hereNow(
        {
          includeUUIDs: true,
          includeState: true
        },
        (status, response) => {
          // If I get a valid response from the channel change the text objects to the correct occupancy count
          if (typeof response.channels.alpha !== "undefined") {
            textResponse1 = response.channels.alpha.occupancy.toString();
          } else {
            textResponse1 = "0";
          }
          window.text1 = `Level 1 Occupancy: ${textResponse1}`;
        }
      );
    }
  }

  listenerPresence(presenceEvent) {
    // PubNub on presence message / event
    this.occupancyCounter;

    if (this.updateOccupancyCounter === false) {
      this.occupancyCounter = setInterval(this.checkFlag, 200); // Start timer to run the checkflag function above
    }

    debugger
    if (presenceEvent.action === "join") {
      // If we recieve a presence event that says a player joined the channel from the pubnub servers
      this.checkIfJoined = true;
      this.checkFlag();
      // text = presenceEvent.totalOccupancy.toString()
      if (presenceEvent.uuid !== this.uniqueID) {
        this.sendKeyMessage({}); // Send message of players location on screen
      }
    } else if (
      presenceEvent.action === "leave" ||
      presenceEvent.action === "timeout"
    ) {
      this.checkFlag();
      try {
        if (this.game.pncPlugin) {
          this.game.pncPlugin.removeOtherCharacter(
            this.scene,
            presenceEvent.uuid
          );
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  sendKeyMessage(keyMessage) {
    try {
      if (this.player) {
        this.pubnub.publish({
          message: {
            uuid: this.uniqueID,
            keyMessage,
            position: this.player.position,
            frameCounter: this.frameCounter
          },
          channel: this.currentChannelName,
          sendByPost: false // true to send via posts
        });
      }
      console.log("send message!")
    } catch (err) {
      console.log(err);
    }
  }

  globalUnsubscribe() {
    try {
      console.log('unsubscribing', this.currentChannelName);
      this.pubnub.unsubscribe({
        channels: [this.currentChannelName],
        withPresence: true
      });
      this.pubnub.removeListener(this.listener);
    } catch (err) {
      console.log("Failed to UnSub");
    }
  }

  installEvents() {
    // If person leaves or refreshes the window, run the unsubscribe function
    window.addEventListener("beforeunload", () => {
      navigator.sendBeacon(
        `https://pubsub.pubnub.com/v2/presence/sub_key/mySubKey/channel/ch1/leave?uuid=${
          this.uniqueID
        }`
      ); // pub
      this.globalUnsubscribe();
    });

    this.pubnub.addListener(this.listener);
  }
}