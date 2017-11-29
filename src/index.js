import {Lobby} from "./states/Lobby/Index"
import {Selector} from "./states/Selector/Index"
import {TestStage} from "./states/TestStage/Index"

import 'script-loader!../assets/lib/spriter/spriter.min.js';

const Start = (game) => {
  game.state.add("SelectorBoot", Selector.BootState, false);
  game.state.add("SelectorSplash", Selector.SplashState, false);
  game.state.add("SelectorGame", Selector.GameState, false);

  game.state.add("TestStageBoot", TestStage.BootState, false);
  game.state.add("TestStageSplash", TestStage.SplashState, false);
  game.state.add("TestStageGame", TestStage.GameState, false);

  game.state.add("LobbyBoot", Lobby.BootState, false);
  game.state.add("LobbySplash", Lobby.SplashState, false);
  game.state.add("LobbyGame", Lobby.GameState, false);

  game.state.start("LobbyBoot");
};

export default Start;