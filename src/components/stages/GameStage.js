import { useSelector } from "react-redux";
import { useState } from "react";

import StageZero from "./StageZero";
import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";
import StageFour from "./StageFour";
import StageFive from "./StageFive";

export default function GameStage() {
  const stageLevel = useSelector(state => state.stageLevel.level);
  const [isBGMOn, setIsBGMOn] = useState(true);
  const [isSoundEffectOn, setIsSouncEffectOn] = useState(true);

  const handleToggleBackgroundSoundButtonClick = () => {
    setIsBGMOn(prevState => !prevState);
  };

  const handleToggleAllSoundsButtonClick = () => {
    setIsSouncEffectOn(prevState => !prevState);
  };

  return (
    <>
      {stageLevel === 0 && (
        <StageZero
          isBGMOn={isBGMOn}
          isSoundEffectOn={isSoundEffectOn}
          handleToggleBackgroundSoundButtonClick={
            handleToggleBackgroundSoundButtonClick
          }
          handleToggleAllSoundsButtonClick={handleToggleAllSoundsButtonClick}
        />
      )}
      {stageLevel === 1 && (
        <StageOne
          isBGMOn={isBGMOn}
          isSoundEffectOn={isSoundEffectOn}
          handleToggleBackgroundSoundButtonClick={
            handleToggleBackgroundSoundButtonClick
          }
          handleToggleAllSoundsButtonClick={handleToggleAllSoundsButtonClick}
        />
      )}
      {stageLevel === 2 && (
        <StageTwo
          isBGMOn={isBGMOn}
          isSoundEffectOn={isSoundEffectOn}
          handleToggleSoundButtonClick={handleToggleBackgroundSoundButtonClick}
          handleToggleAllSoundsButtonClick={handleToggleAllSoundsButtonClick}
        />
      )}
      {stageLevel === 3 && (
        <StageThree
          isBGMOn={isBGMOn}
          isSoundEffectOn={isSoundEffectOn}
          handleToggleSoundButtonClick={handleToggleBackgroundSoundButtonClick}
          handleToggleAllSoundsButtonClick={handleToggleAllSoundsButtonClick}
        />
      )}
      {stageLevel === 4 && (
        <StageFour
          isBGMOn={isBGMOn}
          isSoundEffectOn={isSoundEffectOn}
          handleToggleSoundButtonClick={handleToggleBackgroundSoundButtonClick}
          handleToggleAllSoundsButtonClick={handleToggleAllSoundsButtonClick}
        />
      )}
      {stageLevel === 5 && (
        <StageFive
          isBGMOn={isBGMOn}
          isSoundEffectOn={isSoundEffectOn}
          handleToggleSoundButtonClick={handleToggleBackgroundSoundButtonClick}
          handleToggleAllSoundsButtonClick={handleToggleAllSoundsButtonClick}
        />
      )}
    </>
  );
}
