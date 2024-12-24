/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { IDROLES, ROLES } from "../../../../constants";
import { useNavigate } from "react-router-dom";
import { asyncGetAllUsers } from "../../../../bff";
import { useUserStore } from "../../../../store/UserStore";
interface A {
  setServerError: (error: any) => void;
}

export const UsersTable = ({ setServerError }: A) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const {
    userData: { login },
  } = useUserStore((state) => state);

  useEffect(() => {
    if (!login) return;

    if (!login && localStorage.getItem("userData")) {
      return navigate("/login");
    }
    getUsers();
  }, [login]);

  const getUsers = async () => {
    setUsers(await asyncGetAllUsers().catch((r) => setServerError(r.error)));
  };
  const handleChangeRole = async (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };
  return (
    <Table>
      <TableRow>
        <p>Логин</p>
        <p>Дата Регистрации</p>
        <p>Роль</p>
      </TableRow>
      {users.length
        ? users.map(({ login, registeredAt, roleId }) => (
            <TableRow key={login}>
              <p>{login}</p>
              <p>{registeredAt || "Нет данных"}</p>
              <div>
                <select
                  defaultValue={IDROLES[roleId]}
                  onChange={(e) => handleChangeRole(e)}
                >
                  {Object.entries(ROLES).map((el) => (
                    <option key={el[0]}>{el[0]}</option>
                  ))}
                </select>
              </div>
            </TableRow>
          ))
        : "Users is loading..."}
    </Table>
  );
};

const TableRow = styled.div({
  width: "100%",
  height: "35px",

  display: "flex",
  justifyContent: "space-between",

  gap: "10px",

  border: "1px solid orange",
  borderRadius: "3px",
  "div,p": {
    fontSize: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3px",

    select: {
      color: "black",
      textAlign: "center",
    },
  },
});

const Table = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  width: "700px",
  gap: "3px",
});
