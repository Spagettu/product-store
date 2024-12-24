/* eslint-disable no-extra-boolean-cast */
import { FilterValueProps } from "./../props/product-props";
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { create } from "zustand";
import { asyncGetProduct } from "../bff";
import { ProductProps } from "../props";
import { initialFilterListProps } from "../constants/products";

type ParametersProps = [
  key: Extract<keyof ProductProps, "publishedAt" | "score" | "price">,
  increasing: "+" | "-" | ""
];

interface ProductStoreProps {
  productList: ProductProps[];
  filteredProductList: ProductProps[];
  filtersData: FilterValueProps;

  getAllProducts: () => void;
  // deleteProduct: (id:number) =>void
  addNewProduct: (product: ProductProps) => void;
  filterProducts: () => void;

  setFilters: (filtersData: FilterValueProps) => void;
}

export const useProductStore = create<ProductStoreProps>((set, get) => ({
  productList: [],
  filteredProductList: [],
  filtersData: initialFilterListProps,

  getAllProducts: async () => {
    const product = await asyncGetProduct();
    set({
      productList: product,
      filteredProductList: product,
    });
  },

  // deleteProduct:()=>set((state)=>),
  addNewProduct: (product) =>
    set((state) => ({ productList: [...state.productList, product] })),

  filterProducts: () => {
    const {
      score: userScore,
      price: userPrice,
      categories: userCategories,
      sortingType,
      query,
    } = get().filtersData;

    let newArray;

    newArray = get().productList.filter(
      ({ score, price, categories }) =>
        valueInRange(Number(price), userPrice.min, userPrice.max) &&
        valueInRange(Number(score), userScore.min, userScore.max) &&
        matchCategory(userCategories, categories)
    );

    if (query) {
      newArray = newArray.filter(({ title }) =>
        RegExp(query, "gim").test(title)
      );
    }

    if (sortingType === "unsorted") {
      set({ filteredProductList: newArray });
    } else {
      const sortingTypeArray = sortingType.split("|");
      const [key, insreasing]: ParametersProps = sortingTypeArray;
      const sortedProductList = newArray.sort((a, b) =>
        insreasing == "+"
          ? Number(a[key]) - Number(b[key])
          : Number(b[key]) - Number(a[key])
      );

      set({ filteredProductList: sortedProductList });
    }
  },

  setFilters: (params) => set({ filtersData: params }),
}));

function matchCategory(
  userCategories: string[],
  categories: string[]
): boolean {
  if (userCategories.length === 0) {
    return true;
  }

  const categoryIsInclude = !!categories.find((el) =>
    userCategories.includes(el)
  );

  return categoryIsInclude;
}

function valueInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
