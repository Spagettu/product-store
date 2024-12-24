/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";

export const ButtonCountChange = ({ sign, onClick }) => {
  return (
    <ButtonCountChangeContainer onClick={onClick}>
      {sign}
    </ButtonCountChangeContainer>
  );
};

const ButtonCountChangeContainer = styled.div({
  width: "20px",
  height: "20px",

  boxShadow: "0 0 3px 1px black inset",
  borderRadius: "3px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  userSelect: "none",

  "&:hover": {
    boxShadow: "0 0 3px 1px white inset",
    cursor: "pointer",
  },

  "&:active": {
    backgroundColor: "wheat",
    color: "black",
  },
});
