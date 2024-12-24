import { useUserStore } from "../../store/UserStore";
import { checkAccess } from "../../utils";

import { ERROR } from "../../constants";
import { Error } from "../Error/Error";
import React from "react";

interface A {
  access: number[];
  serverError: string;
  children: React.ReactNode;
}

export const PrivateContent = ({ children, access, serverError = "" }: A) => {
  const {
    userData: { roleId },
  } = useUserStore((state) => state);

  const accessError = checkAccess(access, roleId) ? "" : ERROR.ACCESS_DENIED;

  const error = serverError || accessError;
  return serverError ? <Error error={error} /> : accessError ? "" : children;
};
