import BootState from "./Boot";
import SplashState from "./Splash";
import GameState from "./Game";

const Start = (game) => {
  game.state.add("StartBoot", BootState, false);
  game.state.add("StartSplash", SplashState, false);
  game.state.add("StartGame", GameState, false);

  game.state.start("StartBoot");
};

export default Start;