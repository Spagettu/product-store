import styled from "styled-components";

import { ChangeEvent, useState } from "react";
import { useProductStore } from "../../store";
import { TranslatedFilters } from "../../constants/products";
import { ExctractedFilterFieldRU } from "../../props";

interface SliderProps {
  title: ExctractedFilterFieldRU;
  max: number;
  min: number;
  step?: number;
}

const thumbRadius = 20;
const sliderLength = 150;
const percent = (sliderLength - thumbRadius) / sliderLength;

export const CustomSlider = ({
  title,
  min = 0,
  max = 100,
  step = 1,
}: SliderProps) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minRange = min;
  const maxRange = max;
  const translatedTitle = TranslatedFilters[title];

  const { filtersData, setFilters } = useProductStore((state) => state);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Number(e.target.value), maxValue);
    setMinValue(newValue);

    const newStoreValue = { ...filtersData[translatedTitle], min: newValue };
    setFilters({ ...filtersData, [translatedTitle]: newStoreValue });
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(Number(e.target.value), minValue);
    setMaxValue(newValue);

    const newStoreValue = { ...filtersData[translatedTitle], max: newValue };
    setFilters({ ...filtersData, [translatedTitle]: newStoreValue });
  };

  const leftTrackOffset =
    (minValue / (maxRange - minRange)) * percent * 100 + "%";

  const rightTrackOffset =
    ((maxRange - maxValue) / (maxRange - minRange)) * percent * 100 + "%";

  const zIndexThumb = maxValue > maxRange / 2 ? "left" : "right";

  const rangeStyle = {
    left: leftTrackOffset,
    width: ((maxValue - minValue) * 150) / maxRange + "px",
  };

  const leftThumbStyle = {
    left: leftTrackOffset,
    transform: "translate(0px, -5px)",
    zIndex: zIndexThumb === "left" ? 3 : 2,
  };
  const rightThumbStyle = {
    right: rightTrackOffset,
    transform: "translate(0px, -5px)",
    zIndex: zIndexThumb === "right" ? 3 : 2,
  };

  return (
    <SliderContainer>
      <h2>{title}</h2>
      <Slider>
        <input
          style={{ zIndex: zIndexThumb === "left" ? 3 : 2 }}
          type="range"
          step={step}
          value={minValue}
          onChange={handleMinChange}
          min={minRange}
          max={maxRange}
        />

        <input
          style={{ zIndex: zIndexThumb === "right" ? 3 : 2 }}
          type="range"
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          min={minRange}
          max={maxRange}
        />
        <div className="slider">
          <div style={leftThumbStyle} className="thumb left" />
          <div style={rightThumbStyle} className="thumb right" />
          <div style={rangeStyle} className="range" />
        </div>
      </Slider>
      <div className="value">
        <input
          type="number"
          step={step}
          value={minValue}
          onChange={handleMinChange}
          min={minRange}
          max={maxRange}
        />

        <input
          type="number"
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          min={minRange}
          max={maxRange}
        />
      </div>
    </SliderContainer>
  );
};

const SliderContainer = styled.div({
  boxShadow: "0 -1px 3px  gray inset",
  borderRadius: "3px",
  padding: "7px 5px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  h2: {
    textAlign: "center",
  },

  ".value": {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "15px",

    input: {
      position: "relative",
      minWidth: "60px",
      maxWidth: "80px",
      color: "black",
    },
  },
});

const Slider = styled.div({
  width: "150px",
  height: "auto",

  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  zIndex: "5",
  position: "relative",
  margin: "20px 0",

  ".slider": {
    width: "150px",
    height: "7px",
    backgroundColor: "orange",
    borderRadius: "5px",
    margin: "0",
    padding: "0",
  },

  ".thumb": {
    width: "20px",
    height: "20px",
    background: "wheat",
    boxShadow: "0 0 6px 2px black",

    borderRadius: "50%",
    pointerEvents: "none",

    position: "absolute",
    top: 0,

    zIndex: 2,
  },

  ".range": {
    height: "7px",
    maxWidth: "150px",

    top: 0,
    backgroundColor: "rgb(130, 19, 142)",
    position: "absolute",
    pointerEvents: "none",
    borderRadius: "5px",
    zIndex: 1,
  },

  "input[type=range]": {
    position: "absolute",
    width: "150px",
    height: "7px",
    pointerEvents: "none",
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
    opacity: 0,
    // top: "20px",
  },

  "input[type=range]::-webkit-slider-thumb, ::-moz-range-thumb": {
    position: "absolute",
    pointerEvents: "all",
    width: "20px",
    height: "20px",
    border: "0 none",
    borderRadius: "50%",
    backgroundColor: "yellow",
    "-webkit-appearance": "none",
    "-moz-appearance": "none",
  },
});
