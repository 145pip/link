import { useSelector } from "react-redux";

import StageZero from "./StageZero";
import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";
import StageFour from "./StageFour";
import StageFive from "./StageFive";

export default function GameStage() {
  const stageLevel = useSelector(state => state.stageLevel.level);

  return (
    <>
      {stageLevel === 0 && <StageZero />}
      {stageLevel === 1 && <StageOne />}
      {stageLevel === 2 && <StageTwo />}
      {stageLevel === 3 && <StageThree />}
      {stageLevel === 4 && <StageFour />}
      {stageLevel === 5 && <StageFive />}
    </>
  );
}
