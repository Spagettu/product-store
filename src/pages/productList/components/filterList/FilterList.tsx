import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { useProductStore } from "../../../../store";
import { CategoryTypes } from "../../../../props";
import { categorySheet } from "../../../../constants";
import { CustomSlider } from "../../../../components";
import { initialPriceState, initialScoreState } from "./constant/constant";

export const FilterList = () => {
  const { setFilters, filtersData } = useProductStore((state) => state);

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.name as CategoryTypes;
    const isChecked = e.target.checked;

    if (isChecked) {
      const newCategories = [...filtersData.categories, newValue];
      setFilters({
        ...filtersData,
        categories: newCategories,
      });
    } else {
      setFilters({
        ...filtersData,
        categories: filtersData.categories.filter((el) => el != newValue),
      });
    }
  };

  return (
    <FilterListContainer>
      <div className="categories">
        {categorySheet.map((el) => (
          <div key={el}>
            <input
              name={el}
              onChange={(e) => handleCategoryChange(e)}
              type="checkbox"
              checked={filtersData.categories.includes(el)}
            />
            <label htmlFor={el}>{el}</label>
          </div>
        ))}
      </div>

      <CustomSlider
        title="оценка"
        min={0}
        max={initialScoreState.max}
        step={0.1}
      />
      <CustomSlider title="цена" min={0} max={initialPriceState.max} />
    </FilterListContainer>
  );
};

const FilterListContainer = styled.div({
  width: "250px",
  height: "auto",

  borderRadius: "3px",

  padding: "50px 2px 5px",

  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "10px",

  ".categories": {
    maxHeight: "200px",
    overflow: "scroll",

    boxShadow: "0 -1px 5px gray inset",
    borderRadius: "3px",

    width: "100%",
    label: {
      marginLeft: "5px",
    },
  },
});
