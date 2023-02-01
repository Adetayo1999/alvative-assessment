import { useState, useEffect } from "react";
import AxiosClient from "axios";
import { Product as ProductType } from "@/types";
import { convert } from "@/utils/currency-converter";
import { BsCartCheckFill } from "react-icons/bs";
import { ACTION_TYPES, useCart } from "@/context/cart";

const Product = ({ image, price, title, id }: ProductType) => {
  const { dispatch }: any = useCart();

  return (
    <div
      className="h-96 w-64 rounded-md bg-no-repeat bg-cover cursor-pointer relative p-4 flex items-end"
      style={{
        backgroundImage: `linear-gradient( to right, rgba(0,0,0,0.25), rgba(0,0,0,0.5) ), url('${image}')`,
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div className="">
          <h4 className="text-gray-100 text-lg">{title}</h4>
          <div className="">
            <p className="text-sm text-gray-200 font-semibold">
              {convert(price)}
            </p>
          </div>
        </div>
        <div className="">
          <button
            type="button"
            className="bg-emerald-700 text-gray-100 p-2 rounded-sm"
            onClick={() => {
              dispatch({
                type: ACTION_TYPES.ADD_TO_CART,
                payload: { id, price },
              });
            }}
          >
            <BsCartCheckFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export const Products = () => {
  const { state, dispatch }: any = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosClient.get("/api/products");
        dispatch({
          type: ACTION_TYPES.GET_PRODUCTS_SUCCESS,
          payload: data,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex gap-6  flex-col md:flex-row flex-wrap justify-center items-center">
      {state.products.map((product: any) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};
