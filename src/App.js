import { useSelector } from "react-redux";
import styled from "styled-components";

import Main from "./components/pages/Main";
import GameStage from "./components/stages/GameStage";
import StageSelection from "./components/stages/StageSelection";
import { SCREEN_MODE } from "./utils/constants";
import "./reset.css";

export default function App() {
  const screenMode = useSelector(state => state.screenMode.mode);

  const screenComponents = {
    [SCREEN_MODE.MAIN]: <Main />,
    [SCREEN_MODE.GAME_STAGE]: <GameStage />,
    [SCREEN_MODE.STAGE_SELECTION]: <StageSelection />,
  };

  return <AppWrapper>{screenComponents[screenMode]}</AppWrapper>;
}

const AppWrapper = styled.div`
  height: 100vh;
`;
