import styled from "styled-components";

import { ReactComponent as SkipArrow } from "../../assets/icon/SkipArrow.svg";

export default function SkipButton() {
  return <StyledSkipArrow />;
}

const StyledSkipArrow = styled(SkipArrow)`
  z-index: 999;
  position: absolute;
  top: 85vh;
  right: 2vw;
`;
