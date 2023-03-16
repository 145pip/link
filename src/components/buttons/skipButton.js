import styled from "styled-components";

import { ReactComponent as SkipArrow } from "../../assets/SkipArrow.svg";

export default function SkipButton() {
  return <StyledSkipArrow />;
}

const StyledSkipArrow = styled(SkipArrow)`
  z-index: 999;
  position: absolute;
  top: 85%;
  right: 2%;
`;
