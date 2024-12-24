import axios from "axios";

const url =
  "https://anime-ops-eds-default-rtdb.europe-west1.firebasedatabase.app/demoLPSUsersData.json";

export const asyncGetAllUsers = async () =>
  await axios.get(url).then((r) => r.data);
