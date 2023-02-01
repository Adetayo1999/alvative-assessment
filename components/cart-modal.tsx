import { ACTION_TYPES, useCart } from "@/context/cart";
import { CartItemType } from "@/types";
import { convert } from "@/utils/currency-converter";
import { useEffect, useRef } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { usePaystackPayment } from "react-paystack";

const CartItem = ({ id, productId }: CartItemType) => {
  const { state, dispatch }: any = useCart();
  const cartItem = state?.products.find((item: any) => item.id === productId);
  if (!cartItem) return null;
  return (
    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
      <div className="flex gap-x-3 items-center">
        <div className="">
          <img src={cartItem.image} alt="" className="h-16 w-16  rounded" />
        </div>
        <div className="text-gray-800">
          <p className="text-sm">{cartItem.title}</p>
          <h4 className="text-sm font-semibold">{convert(cartItem.price)}</h4>
        </div>
      </div>
      <div className="">
        <button
          onClick={() => {
            dispatch({
              type: ACTION_TYPES.REMOVE_FROM_CART,
              payload: { id },
            });
          }}
        >
          <FaTimesCircle className="text-red-500" fontSize={20} />
        </button>
      </div>
    </div>
  );
};

export const CartModal = () => {
  const { state, dispatch }: any = useCart();
  const cartContainer = useRef<HTMLDivElement>(null);
  const isCartOpen = state.isCartOpen;

  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      cartContainer.current?.classList.add("cart__active");
      cartContainer.current?.parentElement?.classList.add(
        "cart__container__active"
      );
    } else {
      cartContainer.current?.classList.remove("cart__active");
      cartContainer.current?.parentElement?.classList.remove(
        "cart__container__active"
      );
    }
  }, [isCartOpen]);

  const totalAmount =
    state.cartItems.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue.price,
      0
    ) || 0;

  const config = {
    email: "adetayoomotomiwa99@gmail.com",
    amount: totalAmount * 100,
    publicKey: "pk_test_b1b82484108dfaa600331b6d067485ea288c7e82",
    firstname: "Omotomiwa",
    lastname: "Adetayo",
  };

  const onSuccess = () => {
    dispatch({
      type: ACTION_TYPES.CLEAR_CART,
    });
  };

  const onClose = () => {
    console.log("Pop Up Closed");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div
      className="cart__container"
      onClick={() => {
        dispatch({
          type: ACTION_TYPES.TOGGLE_CART,
        });
      }}
    >
      <div
        ref={cartContainer}
        className="cart"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute">
          <button
            onClick={() => {
              dispatch({
                type: ACTION_TYPES.TOGGLE_CART,
              });
            }}
          >
            <FaTimesCircle className="" fontSize={25} />
          </button>
        </div>
        <h3 className="text-center font-semibold text-xl mb-6">CART</h3>
        <div className="flex flex-col gap-y-4 mb-8">
          {state?.cartItems?.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        {Boolean(totalAmount) && (
          <>
            <div className="flex gap-x-6  text-gray-800 justify-center mb-5">
              <p>TOTAL:</p>
              <h4 className="font-bold">{convert(totalAmount)}</h4>
            </div>

            <div className="">
              <button
                className="bg-emerald-700 px-6 py-3 rounded-md w-full text-gray-100 text-sm font-bold"
                onClick={() => initializePayment(onSuccess, onClose)}
              >
                Pay {convert(totalAmount)}
              </button>
            </div>
          </>
        )}
        {state?.cartItems?.length === 0 && (
          <div className="text-gray-400 text-center">
            <p>NO ITEMS IN CART</p>
          </div>
        )}
      </div>
    </div>
  );
};
