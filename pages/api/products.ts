import { Product } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

const products: Product[] = [
  {
    id: 1,
    title: "Samsung",
    image: "/images/1.jpg",
    price: 50000,
  },
  {
    id: 2,
    title: "Iphone",
    image: "/images/3.jpg",
    price: 20000,
  },
  {
    id: 3,
    title: "Infinix",
    image: "/images/3.jpg",
    price: 30000,
  },
  {
    id: 4,
    title: "Samsung",
    image: "/images/4.jpg",
    price: 50000,
  },
];

export default function hander(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).send(products);
}
