interface A {
  fillColor?: string;
  onClick?: () => void;
}

export const SVGStar = ({ fillColor = "yellow", ...props }: A) => {
  return (
    <div {...props}>
      <svg width="40px" height="40px">
        <polygon
          stroke="white"
          strokeWidth="1px"
          fill={fillColor}
          points="
       15 0
       19 12
       30 12
       23 19
       26 30 
       15 24
       6 30
       8 19
       0 12
       12 12
       "
        ></polygon>
      </svg>
    </div>
  );
};
