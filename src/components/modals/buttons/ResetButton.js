import styled from "styled-components";

export default function ResetButton() {
  return <CommonButton type="button">Yes</CommonButton>;
}

const CommonButton = styled.button`
  width: 10vw;
  height: 5vh;
  position: relative;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  background-color: rgba(51, 153, 255, 20%);
  color: black;
  border: none;
  z-index: 20;
  cursor: pointer;
`;
