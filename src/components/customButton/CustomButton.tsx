import React from "react";
import styled from "styled-components";

interface ButtonProps {
  height?: string;
  width?: string;
  color?: string;
  backgroundColor?: string;
  margin?: string;
  fontSize?: string;
  padding?: string;
}

interface Button
  extends ButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any;
}

export const CustomButton = ({ children, ...props }: Button) => {
  return <CustomButtonContainer {...props}>{children}</CustomButtonContainer>;
};

const CustomButtonContainer = styled.button<ButtonProps>`
  height: ${({ height = "40px" }) => height};
  width: ${({ width = "100%" }) => width};

  margin: ${({ margin = "15px 0" }) => margin};

  font-size: ${({ fontSize = "17px" }) => fontSize};

  color: ${({ color = "black" }) => color};
  background-color: ${({ backgroundColor = "white" }) => backgroundColor};
  border-radius: 18px;
  border: none;

  text-align: center;
  padding: ${({ padding = "2px 6px" }) => padding};

  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px 2px gray inset;
  }

  &:active {
    background-color: red;
  }

  &:disabled {
    background-color: gray;
    cursor: default;
  }

  * {
    color: black;
  }
`;
