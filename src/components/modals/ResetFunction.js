import styled from "styled-components";

export default function ResetFunction() {
  return (
    <>
      <h4>리셋 하시겠습니까?</h4>
      <ModalButton type="button">Yes</ModalButton>
    </>
  );
}

const ModalButton = styled.button`
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
