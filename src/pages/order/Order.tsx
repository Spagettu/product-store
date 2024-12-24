import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useUserStore } from "../../store/UserStore";
import { CustomButton } from "../../components";
import { ButtonCountChange } from "./components/ButtonCountChange";
import { useNavigate } from "react-router-dom";

const paymentMaxOffset = 155;
type PaymentTypes =
  | "СберБанк"
  | "АльфаБанк"
  | "СБП"
  | "Т-банк"
  | "ВТБ"
  | "Халва"
  | "PayPal"
  | "WebMoney"
  | "РосСельхозБанк"
  | "Юмани"
  | "QIWI";

const arrayPaymentTypes: PaymentTypes[] = [
  "СберБанк",
  "АльфаБанк",
  "СБП",
  "Т-банк",
  "ВТБ",
  "Халва",
  "PayPal",
  "WebMoney",
  "РосСельхозБанк",
  "Юмани",
  "QIWI",
];

export const Order = () => {
  const [notice, setNotice] = useState("");
  const [selectedPaymentSystem, setSelectedPaymentSystem] = useState<
    PaymentTypes | "none"
  >("none");
  const paymentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { cart, editCart, clearCart } = useUserStore((state) => state);

  const totalPrice = cart.reduce(
    (acc, { count, price }) => Number(price) * count + acc,
    0
  );

  const canbeOrder =
    !cart.filter((el) => el.count > 0).length ||
    !(selectedPaymentSystem != "none");

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

  const swipeLeft = () => {
    let interval: number,
      totalOffset = 0;

    interval = setInterval(() => {
      if (totalOffset >= paymentMaxOffset) {
        clearInterval(interval);
        interval = NaN;
      }
      totalOffset += 5;
      if (paymentRef.current) {
        paymentRef.current.scrollLeft -= 5;
      }
    }, 10);
  };

  const swipeRight = () => {
    let interval: number,
      totalOffset = 0;

    interval = setInterval(() => {
      if (totalOffset >= paymentMaxOffset) {
        clearInterval(interval);
        interval = NaN;
      }
      totalOffset += 5;
      if (paymentRef.current) {
        paymentRef.current.scrollLeft += 5;
      }
    }, 10);
  };

  const placeOrder = () => {
    setNotice("Заказ оформлен");

    setTimeout(() => {
      clearCart();
      setNotice("");
      if (window.location.pathname === "/order") {
        navigate("/");
      }
    }, 2000);
  };

  return (
    <OrderContainer>
      {notice && <div className="notice">{notice}</div>}

      <div className="pay block">
        <h2>Способы оплаты</h2>
        <div onClick={swipeLeft} className="arrow left">
          {"<"}
        </div>
        <div onClick={swipeRight} className="arrow right">
          {">"}
        </div>
        <div ref={paymentRef} className="swipeBox">
          <div className="swipe">
            {arrayPaymentTypes.map((el) => (
              <PaymentSystem
                key={el}
                onClick={() => setSelectedPaymentSystem(el)}
              >
                {el}
              </PaymentSystem>
            ))}
          </div>
        </div>
      </div>
      <div className="summary block">
        <p
          style={{
            borderBottom:
              selectedPaymentSystem != "none" ? "transparent" : "1px solid red",
          }}
        >
          {"Выбранный способ оплаты: "}
          {selectedPaymentSystem == "none"
            ? " Не выбран"
            : selectedPaymentSystem}
        </p>
        <p>{`Сумма заказа без скидки: ${totalPrice}`}</p>
      </div>
      <div className="products block">
        <h2>Выбранные товары</h2>
        {cart.length > 0
          ? cart.map(({ title, count, price, photos }, id) => (
              <ProductCard key={title}>
                <img height="40px" width="60px" alt={title} src={photos[0]} />
                <p>{`Цена: ${price}`}</p>
                <div className="count">
                  <ButtonCountChange
                    sign="-"
                    onClick={() => handleDecreaseCountProduct(id)}
                  />
                  <p>{`Количество: ${count}`}</p>
                  <ButtonCountChange
                    sign="+"
                    onClick={() => handleIncreaseCountProduct(id)}
                  />
                </div>
                <p>{`Суммарная цена товара: ${Number(price) * count}`}</p>
              </ProductCard>
            ))
          : "Корзина пуста"}
      </div>
      <div className="placeOrder">
        <CustomButton width="50%" disabled={canbeOrder} onClick={placeOrder}>
          Заказать
        </CustomButton>
      </div>
    </OrderContainer>
  );
};

const OrderContainer = styled.div({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "start",
  alignItems: "start",
  gap: "20px",
  paddingTop: "60px",

  h2: {
    marginBottom: "20px",
  },

  ".notice": {
    position: "fixed",
    top: "100px",
    left: "50%",
    transform: "translateX(-50%)",

    zIndex: 10,

    backgroundColor: "green",
    color: "whtie",

    height: "100px",
    width: "100%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  ".block": {
    padding: "10px",
    borderRadius: "3px",
  },
  ".pay": {
    position: "relative",
    width: "70%",
    boxShadow: "0 0 5px 1px orange inset",

    zIndex: 2,

    ".arrow": {
      position: "absolute",
      top: "80px",

      zIndex: 3,

      width: "50px",
      height: "100px",

      borderRadius: "3px",
      boxShadow: "0 0 10px 1px white inset",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    ".arrow.right": {
      right: "5px",
    },
    ".arrow.left": {
      left: "5px",
    },
  },
  ".swipeBox": {
    overflow: "scroll",

    ".swipe": {
      gap: "10px",
      display: "inline-flex",
    },
  },

  ".summary": {
    padding: "20px 10px 10px",
    overflow: "scroll",
    width: "20%",
    minHeight: "400px",
    boxShadow: "0 0 15px 0 black inset",
    "*": {
      marginBottom: "20px",
    },
  },
  ".products": {
    width: "100%",
    textAlign: "center",

    img: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    p: {
      minWidth: "20%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },

    ".count": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  ".placeOrder": {
    display: "flex",
    justifyContent: "center",

    width: "100%",
  },
});

const ProductCard = styled.div({
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  padding: "5px 10px",
  borderBottom: "1px solid #b5a085",

  ".count": {
    display: "flex",
    gap: "5px",
  },
});

const PaymentSystem = styled.div({
  width: "150px",
  height: "150px",

  borderRadius: "5px",
  border: "1px solid white",
  padding: "10px",

  display: "flex",

  "&:hover": {
    boxShadow: "0 0 8px 1px white inset",
  },
});
