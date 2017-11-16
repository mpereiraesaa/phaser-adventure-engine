import BootState from "./Boot";
import SplashState from "./Splash";
import GameState from "./Game";

const Start = () => {
  game.state.add("TestStageBoot", BootState, false);
  game.state.add("TestStageSplash", SplashState, false);
  game.state.add("TestStageGame", GameState, false);

  // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
  if (!window.cordova) {
    game.state.start("TestStageBoot");
  }
};

const StartStageTest = Start

export default StartStageTest;