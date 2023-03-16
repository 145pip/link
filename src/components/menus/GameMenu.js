import styled, { css } from "styled-components";

import { ReactComponent as Reload } from "../../assets/icon/Reload.svg";
import { ReactComponent as Sound } from "../../assets/icon/Sound.svg";
import { ReactComponent as StageSelection } from "../../assets/icon/StageSelection.svg";

export default function GameMenu() {
  return (
    <>
      <StyledReload />
      <StyledStageSelection />
      <StyledSound />
    </>
  );
}

const commonStyles = css`
  z-index: 999;
  position: absolute;
  top: 8vh;
`;

const StyledReload = styled(Reload)`
  ${commonStyles};
  right: 13vw;
`;

const StyledSound = styled(Sound)`
  ${commonStyles};
  right: 2vw;
  top: 7.5vh;
`;

const StyledStageSelection = styled(StageSelection)`
  right: 8vw;
  ${commonStyles};
`;
