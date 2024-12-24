import React, { ChangeEvent, useState } from "react";

import styled from "styled-components";
import { ProductProps } from "../../../../props";
import { useProductStore } from "../../../../store";
import { categorySheet, initialProductList } from "../../../../constants";
import { asynPostProduct } from "../../../../bff";

export const NewProductPanel = () => {
  const [values, setValues] = useState<ProductProps>(initialProductList[0]);
  const [categories, setCategories] = useState(["none"]);

  const { productList, addNewProduct } = useProductStore((state) => state);

  const handleClick = async () => {
    const { title, photos, price, reviews, score, description } = values;
    const newProductId = productList[productList.length - 1].id;
    if (price) {
      const newProduct: ProductProps = {
        title,
        photos,
        price,
        reviews,
        categories: categories.slice(1, categories.length),
        score,
        description,
        id: Number(newProductId) + 1 + "",
      };
      await asynPostProduct(newProduct);
      addNewProduct(newProduct);
    }

    setValues(initialProductList[0]);
    setCategories(["none"]);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "categories" || name === "photos" || name === "reviews") {
      setValues((prev) => ({
        ...prev,
        [name]: [...new Set([...prev[name], value])],
      }));
    } else if (
      (name === "price" || name === "score") &&
      Number.isInteger(value)
    ) {
      setValues((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSetCategories = (e: HTMLSelectElement) => {
    setCategories((prev) => [...prev, e.value]);
  };
  return (
    <AddNewProductContainer>
      <input
        type="text"
        placeholder="title"
        name="title"
        value={values.title}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        placeholder="photos"
        name="photos"
        value={values.photos}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        placeholder="price"
        name="price"
        value={values.price}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        placeholder="reviews"
        name="reviews"
        value={values.reviews}
        onChange={(e) => handleChange(e)}
      />
      <select
        // defaultValue="none"
        name="categories"
        value={categories[categories.length - 1]}
        onChange={({ target }) => handleSetCategories(target)}
      >
        {categorySheet.map((el) => (
          <option key={el}>{el}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="score"
        name="score"
        value={values.score}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        placeholder="description"
        name="description"
        value={values.description}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={handleClick}> add</button>
    </AddNewProductContainer>
  );
};

const AddNewProductContainer = styled.div({
  width: "700px",
  height: "500px",
  zIndex: "10",
  backgroundColor: "black",
  top: "20px",
  border: "1px solid white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "5px",

  "*": { color: "black", fontSize: "16px", width: "100%", maxWidth: "200px" },
});
