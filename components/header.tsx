import { ACTION_TYPES, useCart } from "@/context/cart";
import { BsCartCheckFill } from "react-icons/bs";

export const Header = () => {
  const { state, dispatch }: any = useCart();

  return (
    <header className="flex justify-between items-center pb-6 px-6 border-b border-gray-500 border-opacity-30">
      <div className=""></div>
      <h1 className="font-pacifico text-xl  md:text-3xl text-gray-800 ">
        Ecommerce Store
      </h1>
      <div className="">
        <button
          className="relative"
          onClick={() => {
            dispatch({
              type: ACTION_TYPES.TOGGLE_CART,
            });
          }}
        >
          <BsCartCheckFill fontSize={25} className="text-gray-800" />
          {state.cartItems?.length > 0 ? (
            <span className="h-6 w-6 rounded-full bg-emerald-800 flex justify-center items-center text-xs text-white absolute -top-2 -right-3">
              {state.cartItems?.length}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
};
