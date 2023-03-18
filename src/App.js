import styled from "styled-components";

import Main from "./components/pages/Main";
import GameStage from "./components/stages/GameStage";
import StageSelection from "./components/stages/StageSelection";
import "./reset.css";

export default function App() {

  return (
    <AppWrapper>
      {screenMode === "Main" && <Main />}
      {screenMode === "GameStage" && <GameStage />}
      {screenMode === "StageSelection" && <StageSelection />}
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  height: 100vh;
`;
