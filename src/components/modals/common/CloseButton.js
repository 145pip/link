import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function CloseButton({ handleModalClose }) {
  return (
    <ButtonClose type="button" onClick={handleModalClose}>
      X
    </ButtonClose>
  );
}

const ButtonClose = styled.button`
  font-weight: 800;
  border: none;
  background: none;
  font-size: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`;

CloseButton.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
};
