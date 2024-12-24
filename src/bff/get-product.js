import axios from "axios";

const url = "http://localhost:3005/productList";

export const asyncGetProduct = async () =>
  await axios.get(url).then((r) => r.data);
