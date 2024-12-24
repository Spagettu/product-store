interface A {
  fillColor?: string;
}

export const SVGStarSmall = ({ fillColor = "white" }: A) => {
  return (
    <svg width="20px" height="20px">
      <polygon
        stroke="white"
        fill={fillColor}
        strokeWidth="1px"
        points="
        7 0
        10 6
        15 6
        11 10
        13 15 
        7 12
        3 15
        4 10
        0 6
        6 6
        "
      ></polygon>
    </svg>
  );
};
