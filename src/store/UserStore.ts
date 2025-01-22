import { create } from "zustand";
import { ProductProps } from "../props";

interface UserProps {
  login: string | "";
  hash: string | "";
  roleId: number;
}

interface CartProps extends ProductProps {
  count: number;
}

interface UserStoreProps {
  cart: CartProps[] | [];
  userData: UserProps;
  cartIsOpen: boolean;

  setCartIsOpen: () => void;

  addProductToCart: (product: CartProps) => void;
  deleteProduct: (id: number) => void;
  clearCart: () => void;
  editCart: (product: CartProps, index: number) => void;

  setUserData: (userData: UserProps) => void;
  deleteUserData: () => void;
}

const initialUser = { login: "", hash: "", roleId: 3 };

export const useUserStore = create<UserStoreProps>((set, get) => ({
  cart: [],
  userData: initialUser,
  cartIsOpen: false,

  setCartIsOpen: () => set({ cartIsOpen: !get().cartIsOpen }),

  addProductToCart: (newProduct) => {
    const { title: newProductTitle } = newProduct;

    const newProductTitleIndex = get().cart.findIndex(
      ({ title }) => title === newProductTitle
    );

    if (newProductTitleIndex == -1) {
      set({ cart: [...get().cart, newProduct] });
    } else if (newProductTitleIndex > -1) {
      const newCart = get().cart;
      newCart[newProductTitleIndex].count += 1;
      set({ cart: newCart });
    }
  },

  deleteProduct: (index) => {
    const newCart = get().cart;
    newCart.splice(index, 1);
    set({ cart: newCart });
  },

  editCart: (product, index) => {
    const cart = get().cart;
    cart[index] = product;
    set({ cart: cart });
  },

  clearCart: () => set({ cart: [] }),

  setUserData: (userData) => set(() => ({ userData })),

  deleteUserData: () => set(() => ({ userData: initialUser })),
}));
