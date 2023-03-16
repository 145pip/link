import styled, { css } from "styled-components";

import { ReactComponent as Reload } from "../../assets/icon/Reload.svg";
import { ReactComponent as Sound } from "../../assets/icon/Sound.svg";
import { ReactComponent as StageSelection } from "../../assets/icon/StageSelection.svg";

export default function CommonButtons() {
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
  top: 8%;
`;

const StyledReload = styled(Reload)`
  right: 13%;
  ${commonStyles};
`;

const StyledSound = styled(Sound)`
  ${commonStyles};
  right: 2%;
  top: 7.5%;
`;

const StyledStageSelection = styled(StageSelection)`
  right: 8%;
  ${commonStyles};
`;
