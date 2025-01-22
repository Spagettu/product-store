import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useProductStore } from "../../../store";
import { CustomButton } from "../../../components";

interface A {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemsOnPage: number;
}

export const Pagination = ({ currentPage, setCurrentPage, itemsOnPage }: A) => {
  const { productList } = useProductStore((state) => state);

  const maxPage: number = Math.floor(productList.length / itemsOnPage);
  return (
    <PaginationContainer>
      <CustomButton width="40px" onClick={() => setCurrentPage(1)}>
        1
      </CustomButton>
      <CustomButton
        width="40px"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        -1
      </CustomButton>

      <div className="block">{currentPage}</div>

      <CustomButton width="40px" onClick={() => setCurrentPage(maxPage)}>
        {maxPage}
      </CustomButton>
      <CustomButton
        width="40px"
        disabled={currentPage === maxPage}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        +1
      </CustomButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div({
  width: "100%",
  height: "50px",
  border: "1px solid red",

  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",

  ".block": {
    width: "20px",
    height: "20px",
  },
});
