import axios from "axios";
import { ProductProps } from "../props";

const url = "http://localhost:3005/productList";

export const asynPostProduct = async (product: ProductProps) =>
  await axios.post(url, product).catch((e) => console.log(e));
