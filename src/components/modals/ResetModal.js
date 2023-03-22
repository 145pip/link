import React, { useState } from "react";
import styled from "styled-components";
import ResetFunction from "./function/ResetFunction";

export default function ResetModal() {
  const [closed, setClosed] = useState(false);
  const handleClick = () => {
    setClosed(true);
  };

  if (!closed) {
    return (
      <ModalWrapper onClick={handleClick}>
        <PopUpModal>
          <ResetFunction />
        </PopUpModal>
      </ModalWrapper>
    );
  }
}

const PopUpModal = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 300px;
  height: 200px;
  border: 1px solid lightgray;
  border-radius: 8.5px;
  z-index: 20;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);

  h4 {
    text-align: center;
    font-size: 20px;
    position: relative;
    top: 8vh;
  }
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;
