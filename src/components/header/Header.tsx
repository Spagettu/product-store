import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserStore } from "../../store/UserStore";
import { CustomButton } from "../customButton/CustomButton";
import { sessions } from "../../utils";

export const Header = () => {
  const {
    userData: { login, hash },
    deleteUserData,
  } = useUserStore((state) => state);

  const { cartIsOpen } = useUserStore((state) => state);

  const handleLogOut = () => {
    sessions.remove(hash);
    deleteUserData();
    localStorage.removeItem("userData");
  };

  const style = { paddingRight: cartIsOpen ? "320px" : "120px" };
  return (
    <HeaderContainer style={style}>
      <Logo>LPS</Logo>
      <Link to="/">Главная</Link>
      <Link to="/companyInfo">О нас</Link>
      {login ? (
        <div className="login">
          <Link to="/user">
            <h4> {login}</h4>
          </Link>
          <CustomButton onClick={handleLogOut}>Выйти</CustomButton>
        </div>
      ) : (
        <Link to="/login">Войти</Link>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div({
  width: "100%",
  height: "100px",
  backgroundColor: "#fbb40b",
  boxShadow: "0 -1px 7px 2px white",

  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 6,

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 120px 0 60px",

  fontSize: "28px",
  textShadow: "0 0 6px black",
  fontFamily: "fantasy, Copperplate",

  transitionDuration: ".4s",

  ".login": {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    paddingTop: "10px",

    button: {
      margin: 0,
    },
    h4: {
      textAlign: "center",
    },
  },
});

const Logo = styled.div({
  fontSize: "60px",
  fontFamily: "cursive,Lucida Handwriting",
});
