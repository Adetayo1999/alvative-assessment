export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartItemType {
  id: number;
  productId: number;
  price: number;
}

export interface CartState {
  products: Product[];
  cartItems: CartItemType[];
  isCartOpen: boolean;
}
