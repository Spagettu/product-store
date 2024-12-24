/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { useProductStore } from "../../../store";
import styled from "styled-components";
import { SVGStarSmall } from "../../../custom-icons";
import { Link } from "react-router-dom";

export const SuggestedProducts = () => {
  const suggestContainerRef = useRef<HTMLDivElement>(null);
  const { productList } = useProductStore((state) => state);

  const swipe = (e: any) => {
    let oldX = e.clientX;
    const swipeSpeed = 2;

    const fnc = (event: any) => {
      const newX = event.clientX;
      const offset = Math.floor(swipeSpeed * (oldX - newX));
      oldX = newX;

      if (suggestContainerRef.current) {
        suggestContainerRef.current.scrollLeft += offset;
      }
    };

    const handleMouseUp = () => {
      if (suggestContainerRef.current) {
        suggestContainerRef.current.removeEventListener("mousemove", fnc);
        suggestContainerRef.current.removeEventListener(
          "mouseup",
          handleMouseUp
        );
      }
    };

    if (suggestContainerRef.current) {
      suggestContainerRef.current.addEventListener("mousemove", fnc);
      suggestContainerRef.current.addEventListener("mouseup", handleMouseUp);
    }
  };
  return (
    <SuggestedProductsContainer>
      <div className="box" ref={suggestContainerRef}>
        <div className="shadow left"></div>
        <div className="shadow right"></div>
        <div className="insertBox" onMouseDown={(e) => swipe(e)}>
          {productList.map(({ id, title, price, score, photos }) => (
            <ProductCard key={id}>
              <img
                className="suggestedProductImage"
                alt={title}
                src={photos[0]}
              />
              <p>
                <Link to={`/product/${id}`}>{title}</Link>
              </p>
              <p>{price}</p>
              <p className="score">
                <SVGStarSmall fillColor="yellow" />
                {score}
              </p>
            </ProductCard>
          ))}
        </div>
      </div>
    </SuggestedProductsContainer>
  );
};

const SuggestedProductsContainer = styled.div({
  position: "relative",
  overflow: "hidden",

  maxWidth: "100%",

  ".box": {
    overflow: "scroll",
    zIndex: 1,

    padding: "0 20px",

    ".shadow": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",

      height: "90%",
      width: "0px",

      boxShadow: "0 0 60px 40px black",

      zIndex: 2,

      "&.left": {
        left: 0,
      },
      "&.right": {
        right: 0,
      },
    },
  },

  ".insertBox": {
    display: "inline-flex",
    gap: "10px",
  },
});

const ProductCard = styled.div({
  width: "400px",
  height: "300px",
  border: "1px solid orange",
  borderRadius: "3px",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",

  zIndex: 1,

  ".suggestedProductImage": {
    maxWidth: "200px",
    maxHeight: "100px",
  },

  "img:hover": {
    scale: 1,
  },

  ".score": {
    display: "flex",

    alignItems: "center",
  },
});
