import { sessions } from "../utils";
import { asyncGetUserData } from "./get-user-data";

export const authorize = async ({ authLogin, authPassword }) => {
  const user = await asyncGetUserData({ login: authLogin });

  if (!user) {
    return {
      res: null,
      error: "Пользователь не найден",
    };
  }

  const { password } = user;

  if (authPassword != password) {
    return {
      res: null,
      error: "Неверный пароль",
    };
  }

  const session = sessions.create(user);

  return {
    res: { ...user, session },
    error: null,
  };
};
