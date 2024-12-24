import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserStore } from "../../store/UserStore";

import { Navigate, useNavigate } from "react-router-dom";

import { asyncGetAllUsers } from "../../bff";
import { PrivateContent } from "../../components/privateContent/PrivateContent";
import { ROLES } from "../../constants";
import { NewProductPanel } from "./components/newProductPanel/NewProductPanel";
import { UsersTable } from "./components/usersTable/UsersTable";

export const UserPage = () => {
  const [serverError, setServerError] = useState("");

  const {
    userData: { login },
  } = useUserStore((state) => state);

  if (!login && !localStorage.getItem("userData")) {
    return <Navigate to="/login" />;
  }

  return (
    <UserContainer>
      <div className="currentUser">
        <img height="400px" width="300px" alt="User Photo" />
        <div className="userData">
          <p>{"Login: " + login}</p>
        </div>
      </div>

      <PrivateContent access={[ROLES.ADMIN]} serverError={serverError}>
        <UsersTable setServerError={setServerError} />
      </PrivateContent>

      <PrivateContent access={[ROLES.ADMIN, ROLES.MODERATOR]} serverError="">
        <NewProductPanel />
      </PrivateContent>
    </UserContainer>
  );
};

const UserContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",

  gap: "30px",

  padding: "30px 0 0",

  ".currentUser": {
    display: "flex",

    gap: "30px",
  },

  img: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid wheat",
  },
  ".userData": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
  },
});
