import styled from "styled-components";

const circles = ["", "", "", ""];

interface CircleProps {
  index: number;
}

export const Loader = () => {
  return (
    <LoaderContainer>
      {circles.map((_, id) => (
        <Circle key={id} index={id} />
      ))}
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div({
  minWidth: "100%",
  height: "200px",

  padding: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
});

const Circle = styled.div<CircleProps>`
  border-radius: 50%;
  background-color: white;
  width: 12px;
  height: 12px;

  animation: jump 0.8s ease ${({ index }) => index * 0.15}s infinite;

  @keyframes jump {
    0% {
      transform: translateY(0px);
      background-color: transparent;
      box-shadow: none;
    }

    50% {
      transform: translateY(-10px);
      box-shadow: 0 8px 2px -1px gray;
      background-color: white;
    }

    100% {
      transform: translateY(0px);
      background-color: transparent;
      box-shadow: none;
    }
  }
`;
