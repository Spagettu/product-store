import React, { ChangeEvent, useState } from "react";

import styled from "styled-components";
import { CategoryTypes, ProductProps } from "../../../../props";
import { useProductStore } from "../../../../store";
import { categorySheet, initialProductList } from "../../../../constants";
import { asynPostProduct } from "../../../../bff";

export const NewProductPanel = () => {
  const [values, setValues] = useState<ProductProps>(initialProductList[0]);
  const [categories, setCategories] = useState<CategoryTypes[]>([]);

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
    setCategories([]);
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

  const handleRemoveCategory = (id: number) => {
    const newCategories = [
      ...categories.slice(0, id),
      ...categories.slice(id + 1, categories.length),
    ];

    console.log(newCategories);

    setCategories(newCategories);
  };

  return (
    <AddNewProductContainer>
      <div className="row">
        <label>title</label>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={values.title}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="row">
        <label htmlFor="">photos</label>
        <input
          type="text"
          placeholder="photos"
          name="photos"
          value={values.photos}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="row">
        <label htmlFor="">price</label>
        <input
          type="text"
          placeholder="price"
          name="price"
          value={values.price}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="row">
        <label htmlFor="">score</label>
        <input
          type="text"
          placeholder="score"
          name="score"
          value={values.score}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="row">
        <label htmlFor="">description</label>
        <input
          type="text"
          placeholder="description"
          name="description"
          value={values.description}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="row">
        <div style={{ width: "100%" }} className="row">
          <label htmlFor="">categories</label>
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
        </div>
        <div className="row">
          {categories.map((el, id) => (
            <div key={el} className="row category">
              <p>{el}</p>
              <button onClick={() => handleRemoveCategory(id)}>x</button>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleClick}> add</button>
    </AddNewProductContainer>
  );
};

const AddNewProductContainer = styled.div({
  width: "100%",
  height: "500px",
  zIndex: "10",

  top: "20px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "5px",
  padding: "0 30px",

  label: {
    color: "white",
    width: "max",
  },

  "select,label,p,button": {
    fontSize: "18px",
  },

  "select,button,input": {
    color: "black",
  },

  input: {
    width: "100%",
  },

  ".row": {
    display: "flex",
    // flexWrap: "wrap",
    justifyContent: "start",
    maxWidth: "400px",
    gap: "10px",
    padding: "3px 2px",
  },

  ".category": {
    border: "1px solid white",
    borderRadius: "3px",
    padding: "4px 2px 2px",
  },

  button: {
    padding: "0 5px",
  },
});
