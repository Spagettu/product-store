import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { CustomButton, CustomInput } from "../../components";
import { Link } from "react-router-dom";

export const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  return (
    <RegisterContainer>
      <h2>Регистрация</h2>
      <CustomInput
        placeholder="логин"
        value={login}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLogin(e.target.value)
        }
      />
      <CustomInput
        placeholder="пароль"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <CustomInput
        placeholder="пароль еще раз"
        value={repeatedPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRepeatedPassword(e.target.value)
        }
      />
      <CustomButton
        width="400px"
        disabled={!login || !password || !repeatedPassword}
      >
        Зарегистрироваться
      </CustomButton>
      <div>
        У вас уже есть аккаунт? <Link to="/login"> Войти</Link>
      </div>

      <LoginData>
        <h2>
          Регистрация временно не доступна (так как это демо-версия). Но вы
          можете воспользоваться готовыми аккаунтами с разнным уровнем
          доступности контента:
        </h2>
        <div>
          <h3>Admin</h3>
          <h4>Login: admin </h4>
          <h4>Password: admin</h4>
        </div>
        <div>
          <h3>Moderator</h3>
          <h4>Login: moderator</h4>
          <h4>Password: moderator</h4>
        </div>
        <div>
          <h3>User</h3>
          <h4>Login: user</h4>
          <h4>Password: user</h4>
        </div>
      </LoginData>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div({
  width: "90%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3px",

  h2: {
    margin: "20px 0 30px",
  },
  a: {
    textDecoration: "underline",
  },
});

const LoginData = styled.div({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "15px",
  marginTop: "15px",

  h2: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  div: {
    padding: "5px 3px",
    borderRadius: "3px",
    boxShadow: "0 0 7px 1px white inset",
    width: "170px",
    textAlign: "center",
    flexWrap: "wrap",
  },
});
