import { CartState } from "@/types";
import { createContext, useContext, useReducer } from "react";

const initialState: CartState = {
  products: [],
  cartItems: [],
  isCartOpen: false,
};

export const ACTION_TYPES = Object.freeze({
  GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  TOGGLE_CART: "TOGGLE_CART",
  CLEAR_CART: "CLEAR_CART",
});

type ActionType = {
  type:
    | "GET_PRODUCTS_SUCCESS"
    | "ADD_TO_CART"
    | "REMOVE_FROM_CART"
    | "TOGGLE_CART"
    | "CLEAR_CART";
  payload?: any;
};

const reducer = (state: CartState, action: ActionType): CartState => {
  switch (action.type) {
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD_TO_CART":
      const newItem = state.cartItems.find(
        (item) => item.productId === action.payload?.id
      );
      if (newItem) return state;

      const newCartItems = [
        ...state.cartItems,
        {
          id: state.cartItems.length + 1,
          productId: action.payload.id,
          price: action.payload.price,
        },
      ];
      return {
        ...state,
        cartItems: newCartItems,
      };

    case "REMOVE_FROM_CART":
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
        isCartOpen: false,
      };

    default:
      return state;
  }
};

const CartContext = createContext({});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
