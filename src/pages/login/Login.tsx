import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { CustomButton, CustomInput } from "../../components";
import { authorize } from "../../bff/authorize";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    setUserData,
    userData: { login: storeLogin },
  } = useUserStore((state) => state);

  if (storeLogin) {
    return <Navigate to="/" />;
  }

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const asyncLogIn = async () => {
    await authorize({ authLogin: login, authPassword: password }).then(
      ({ res, error }) => {
        if (error) {
          console.log(error);
        } else {
          setUserData({
            login: res.login,
            hash: res.session,
            roleId: res.roleId,
          });

          localStorage.setItem("userData", JSON.stringify(res));
          navigate("/");
        }
      }
    );
  };

  return (
    <SignUpContainer>
      <h2>Вход в аккаунт</h2>
      <CustomInput
        placeholder="логин"
        value={login}
        onChange={handleChangeLogin}
      />
      <CustomInput
        placeholder="пароль"
        value={password}
        onChange={handleChangePassword}
      />

      <CustomButton
        disabled={!login || password.length < 4}
        onClick={asyncLogIn}
      >
        {" "}
        Войти
      </CustomButton>
      <div>
        У вас еще нет аккаунта? <Link to="/register">Создать аккаунт</Link>
      </div>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "5px",
  padding: "20px",

  h2: {
    marginBottom: "10px",
  },
  a: {
    textDecoration: "underline",
  },
});
