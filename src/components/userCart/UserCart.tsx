import React, { useEffect } from "react";
import styled from "styled-components";
import { useUserStore } from "../../store/UserStore";
import { CustomButton } from "../customButton/CustomButton";
import { Link } from "react-router-dom";

export const UserCart = () => {
  const {
    setCartIsOpen,
    cartIsOpen,
    deleteProduct,
    clearCart,
    cart,
    editCart,
  } = useUserStore((state) => state);

  const handleMouseEnter = () => {
    document.body.style.overflow = "hidden";
  };

  const handleMouseLeave = () => {
    document.body.style.overflow = "scroll";
  };

  const handleDecreaseCountProduct = (index: number) => {
    const count = cart[index].count;
    const editedProduct = {
      ...cart[index],
      count: count === 0 ? 0 : cart[index].count - 1,
    };
    editCart(editedProduct, index);
  };

  const handleIncreaseCountProduct = (index: number) => {
    const editedProduct = { ...cart[index], count: cart[index].count + 1 };
    editCart(editedProduct, index);
  };

  const totalPrice = cart.reduce(
    (acc, { count, price }) => acc + Number(price) * count,
    0
  );

  const totalCount = cart.reduce((acc, { count }) => acc + count, 0);

  const cartOffset = { right: cartIsOpen ? "0" : "-250px" };

  const verticalTitleBoxStyle = { opacity: cartIsOpen ? 0 : 1 };

  return (
    <UserCartContainer
      style={cartOffset}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="verticalTitleBox" style={verticalTitleBoxStyle}>
        <div className="circle">{totalCount}</div>
        <h2 className="verticalTitle">Корзина</h2>
      </div>

      <h2>Корзина</h2>

      <div className="content">
        {cart.length > 0
          ? cart.map(({ price, title, count }, id) => (
              <ProductContainer key={title}>
                <CustomButton
                  padding="0 0 15px"
                  fontSize="30px"
                  width="40px"
                  onClick={() => handleDecreaseCountProduct(id)}
                  disabled={count === 0}
                >
                  -
                </CustomButton>
                <div className="info">
                  <h3>{title}</h3>
                  <h3>{price}</h3>
                  <h3>{count}</h3>
                </div>
                <CustomButton
                  padding="0 0 15px"
                  fontSize="30px"
                  width="40px"
                  onClick={() => handleIncreaseCountProduct(id)}
                >
                  +
                </CustomButton>

                <CustomButton margin="0" onClick={() => deleteProduct(id)}>
                  Удалить
                </CustomButton>
              </ProductContainer>
            ))
          : "Корзина пуста"}
        <h3 className="price">{"Суммарная цена: " + totalPrice}</h3>

        <CustomButton width="90%" disabled={!cart.length} onClick={clearCart}>
          Очистить корзину
        </CustomButton>

        <Link to="/order" style={{ width: "95%", cursor: "default" }}>
          <CustomButton onClick={setCartIsOpen} disabled={!cart.length}>
            Оформить заказ
          </CustomButton>
        </Link>
      </div>

      <div className="open">
        <CustomButton width="40px" onClick={setCartIsOpen}>
          {cartIsOpen ? "->" : "<-"}
        </CustomButton>
      </div>
    </UserCartContainer>
  );
};

const UserCartContainer = styled.div({
  position: "fixed",
  top: 0,
  zIndex: 7,

  height: "100%",
  width: "300px",

  backgroundColor: "rgb(83,5,91)",
  borderRadius: "3px",

  padding: "20px 0 80px",

  transitionDuration: ".4s",

  overflow: "hidden",

  ".verticalTitleBox": {
    position: "absolute",
    transitionDuration: ".4s",

    left: 0,
    top: 0,

    height: "100%",
    width: "50px",
    zIndex: "10",

    ".circle": {
      position: "absolute",
      marginLeft: "5px",

      width: "40px",
      height: "40px",

      backgroundColor: "#333",
      color: "white",
      borderRadius: "50%",
      fontSize: "20px",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    ".verticalTitle": {
      width: "100%",
      height: "100%",
      writingMode: "vertical-rl",
      textOrientation: "upright",

      backgroundColor: "rgb(83,5,91)",
      letterSpacing: "40px",
      boxShadow: "0 0 200px 0px rgb(83,5,91)",

      transitionDuration: ".4s",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  ".content": {
    maxHeight: "100%",
    overflow: "scroll",
    padding: "10px 0",

    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "5px",
  },

  ".open": {
    position: "absolute",
    bottom: "0",
    width: "100%",
    backgroundColor: "#333",
    height: "60px",
    padding: "0 5px 30px",
    zIndex: "11",
  },
});

const ProductContainer = styled.div({
  width: "90%",
  height: "auto",

  borderRadius: "5px",
  padding: "7px 5px",
  boxShadow: " 0 0 8px 1px rgb(56,46,57) inset",

  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});
