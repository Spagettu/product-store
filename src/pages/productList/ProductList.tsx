/* eslint-disable no-extra-boolean-cast */
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FilterList } from "./components/filterList/FilterList";

import { useProductStore } from "../../store";
import { CustomButton, CustomInput, Loader } from "../../components";
import { SortBox } from "./components/SelectsLine";

import { useUserStore } from "../../store/UserStore";
import { Link } from "react-router-dom";
import { useDebounce } from "../../hooks";
import { Pagination } from "./components/Pagination";

export const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsOnPage, setItemsOnPAge] = useState(3);

  const {
    productList,
    filteredProductList,
    filtersData,
    filterProducts,
    setFilters,
  } = useProductStore((state) => state);

  const { price, score, categories, sortingType, query } = filtersData;

  const { addProductToCart } = useUserStore((state) => state);

  const debouncedFilterProducts = useDebounce(filterProducts, 400);

  // debouncedFilterProducts();

  useEffect(() => {
    debouncedFilterProducts();
  }, [categories, price, score, sortingType, query]);

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filtersData, query: e.target.value });
  };

  const slicedFilteredProductList = filteredProductList.slice(
    currentPage * itemsOnPage - itemsOnPage,
    itemsOnPage * currentPage
  );

  return (
    <ProductContainer>
      <FilterList />
      <div className="flex">
        <CustomInput
          width="800px"
          placeholder="Искать товары тут..."
          onChange={handleChangeQuery}
        />
        <SortBox />
        <ProductListContainer>
          {!!productList.length ? (
            !!filteredProductList.length ? (
              slicedFilteredProductList.map(
                ({ photos, price, score, description, title, id }, index) => (
                  <ProductCard key={id}>
                    <div className="image">
                      <img alt={"Фото " + title} src={photos[0]} />
                    </div>
                    <Link to={`/product/${id}`}>
                      <h2>{title}</h2>
                    </Link>
                    <h2>{description}</h2>
                    <div>{"Оценка: " + score}</div>
                    <div>{"Цена: " + price}</div>
                    <CustomButton
                      onClick={() =>
                        addProductToCart({
                          ...filteredProductList[index],
                          count: 1,
                        })
                      }
                      width="200px"
                    >
                      Добавить в корзину
                    </CustomButton>
                  </ProductCard>
                )
              )
            ) : (
              <h2>Подходящих товаров не нашлось</h2>
            )
          ) : (
            <Loader />
          )}
        </ProductListContainer>
        <Pagination {...{ currentPage, setCurrentPage, itemsOnPage }} />
        {filteredProductList &&
          `Продуктов найдено: ${filteredProductList.length}`}
      </div>
    </ProductContainer>
  );
};

const ProductContainer = styled.div({
  backgroundColor: "transparent",
  width: "100%",

  display: "flex",
  justifyContent: "start",

  padding: "20px 5px",
  gap: "20px",

  ".flex": {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "calc(100% - 300px)",

    input: {
      marginBottom: "20px",
    },
  },
});

const ProductListContainer = styled.div({
  minHeight: "200px",
  width: "100%",

  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
  padding: "10px 20px",

  h2: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  color: "black",
});

const ProductCard = styled.div({
  width: "300px",
  height: "470px",
  border: "1px solid orange",
  borderRadius: "3px",

  padding: "10px 5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
  gap: "6px",

  overflow: "scroll",

  div: {
    color: "white",
    fontSize: "18px",
    fontFamily: "monospace",
  },

  ".image": {
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    width: "270px",
    height: "250px",
  },

  img: {
    display: "flex",
    alignItems: "center",

    maxWidth: "270px",
    maxHeight: "250px",
  },
});
