export const ROLES = {
  ADMIN: 0,
  MODERATOR: 1,
  USER: 2,
  GUEST: 3,
};

export const IDROLES: { [key in number]: string } = {
  0: "ADMIN",
  1: "MODERATOR",
  2: "USER",
  3: "GUEST",
};
