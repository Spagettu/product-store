import React from "react";
import styled from "styled-components";

export const Footer = () => {
  return <FooterContainer>Footer</FooterContainer>;
};

const FooterContainer = styled.div({
  width: "100%",
  height: "60px",
  position: "relative",
  bottom: 0,
  left: 0,
  backgroundColor: "rgb(78,8,86)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
