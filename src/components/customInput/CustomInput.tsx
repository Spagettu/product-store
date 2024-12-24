/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
interface InputProps {
  backgroundColor?: string;
  color?: string;
  width?: string;
}

export const CustomInput = ({ ...children }) => {
  return <InputContainer {...children} />;
};

const InputContainer = styled.input<InputProps>`
  min-height: 36px;
  min-width: 250px;
  width: ${({ width = "250px" }) => width};
  border-radius: 8px;

  background-color: ${({ backgroundColor = "white" }) => backgroundColor};
  color: ${({ color = "black" }) => color};
  padding: 2px 3px;
  text-align: center;
  font-size: 16px;

  word-wrap: break-word;
  word-break: break-all;
`;
