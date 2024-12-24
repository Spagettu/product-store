import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useProductStore } from "../../store";
import { SVGStar, SVGStarSmall } from "../../custom-icons";
import { CustomButton, Loader } from "../../components";
import { NewReview } from "./components/NewReview";
import { useUserStore } from "../../store/UserStore";
import { SuggestedProducts } from "./components/SuggestedProducts";

export const ProductPage = () => {
  const params = useParams();

  const { productList } = useProductStore((state) => state);
  const { addProductToCart } = useUserStore((state) => state);
  const { id } = params;

  const index = productList.findIndex((el) => el.id == id);

  if (!productList.length) {
    return <Loader />;
  }
  const { photos, title, price, score, reviews, description } =
    productList[index];

  return (
    <ProductContainer>
      <div style={{ display: "flex", gap: "80px" }}>
        <div className="image">
          {photos[0] ? (
            <img className="mainProductPhoto" src={photos[0]} />
          ) : (
            "Нет фото"
          )}
        </div>
        <div className="productInfo">
          <h2>{title}</h2>
          <p>{`Цена: ${price}`}</p>
          <div className="score">
            <SVGStar /> {score}
          </div>
          <div className="description">{description}</div>
          <CustomButton
            onClick={() =>
              addProductToCart({ ...productList[index], count: 1 })
            }
          >
            Добавить в корзину
          </CustomButton>
        </div>
      </div>
      <div className="suggest">
        <h2>Посмотрите так же:</h2>
        <SuggestedProducts />
      </div>
      <div className="reviews">
        {reviews.length > 0
          ? reviews.map(({ author, publishedAt, text, score }, index) => (
              <Review key={index}>
                <div className="authorInfo">
                  <p>{author}</p>
                  <p>{publishedAt}</p>
                </div>
                <div className="score">
                  {new Array(5).fill("").map((_, id: number) => (
                    <SVGStarSmall
                      key={id}
                      fillColor={id < Number(score) ? "yellow" : "white"}
                    />
                  ))}
                </div>
                <div className="content">{text}</div>
              </Review>
            ))
          : "Отзывов пока нет..."}
      </div>
      <NewReview />
    </ProductContainer>
  );
};

const ProductContainer = styled.div({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "50px",
  flexDirection: "column",

  fontSize: "20px",

  width: "100%",

  marginTop: "40px",

  ".image": {
    position: "relative",

    minWidth: "200px",
    minHeight: "100px",

    maxWidth: "400px",
    maxHeight: "500px",

    borderRadius: "3px",
    boxShadow: "0 0 5px 1px white, 0 0 6px 2px yellow",
    overflow: "hidden",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  ".mainProductPhoto": {
    maxWidth: "400px",
    maxHeight: "500px",
    borderRadius: "3px",

    transitionDuration: ".4s",
  },

  ".mainProductPhoto:hover": {
    scale: "1.3",
  },
  ".mainProductPhoto:active": {
    scale: "1.3",
  },

  ".suggest": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",

    width: "100%",
  },
  ".productInfo": {
    padding: "10px",

    h2: {
      marginBottom: "40px",
    },
  },
  h2: {
    width: "100%",
  },

  ".score": {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },

  ".reviews": {
    width: "100%",
    minHeight: "100px",
  },
});

const Review = styled.div({
  width: "100%",
  minHeight: "30px",

  backgroundColor: "#333",
  borderRadius: "5px",

  padding: "5px 10px",

  display: "flex",
  flexDirection: "column",
  gap: "20px",

  ".authorInfo": {
    display: "flex",
    justifyContent: "start",
  },
});
