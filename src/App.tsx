import "./App.css";
import { Footer, Header, UserCart } from "./components";
import styled from "styled-components";
import { CustomRoutes } from "./routes/CustomRoutes";
import { useEffect } from "react";
import { authorize } from "./bff/authorize";
import { useUserStore } from "./store/UserStore";
import { useProductStore } from "./store";
import { useLocation } from "react-router-dom";

function App() {
  const { setUserData } = useUserStore((state) => state);
  const { getAllProducts } = useProductStore((state) => state);
  const { pathname } = useLocation();

  const autoLogin = async () => {
    const rowUser = localStorage.getItem("userData");
    if (rowUser) {
      const user = JSON.parse(rowUser);
      const { res, error } = await authorize({
        authLogin: user.login,
        authPassword: user.password,
      });

      if (error) return;

      setUserData({
        login: res.login,
        hash: res.session,
        roleId: res.roleId,
      });
    }
  };

  useEffect(() => {
    autoLogin();

    setTimeout(() => {
      getAllProducts();
    }, 2000); // demo
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <PageContainer>
      <Header />
      <Content>
        <CustomRoutes />
      </Content>
      <UserCart />
      <Footer />
    </PageContainer>
  );
}

export default App;

const PageContainer = styled.div({
  width: "100vw",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#27292d",
});

const Content = styled.div({
  width: "90vw",
  minHeight: "80vh",
  margin: "110px 0",
  display: "flex",
  justifyContent: "center",
});
