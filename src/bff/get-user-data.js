import axios from "axios";

const url =
  "https://anime-ops-eds-default-rtdb.europe-west1.firebasedatabase.app/demoLPSUsersData.json";

export const asyncGetUserData = async ({ login }) => {
  const users = await axios.get(url).then((r) => r.data);

  const index = users.findIndex((el) => el.login === login);

  return index > -1 ? users[index] : null;
};
