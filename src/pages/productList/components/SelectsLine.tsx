import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { useProductStore } from "../../../store";

export const SortBox = () => {
  const { setFilters, filtersData } = useProductStore((state) => state);

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortingType = e.target.value;
    setFilters({ ...filtersData, sortingType });
  };
  return (
    <SortBoxContainer>
      <select name="sort" onChange={(e) => handleSort(e)}>
        <option value="unsorted">Не сортировать</option>
        <option value="price|-">Сначала самые дорогие</option>
        <option value="price|+">Сначала самые дешевые</option>
        <option value="score|-">Сначала высокий рейтинг</option>
        <option value="score|+">Сначала низкий рейтинг</option>
      </select>
    </SortBoxContainer>
  );
};

const SortBoxContainer = styled.div({
  width: "100%",
  height: "34px",
  display: "flex",
  justifyContent: "center",

  gap: "5px",

  select: {
    color: "black",
    padding: "1px 2px",

    height: "30px",
    fontSize: "17px",
    textAlign: "center",
  },
});
