import { CartModal } from "@/components/cart-modal";
import { Header } from "@/components/header";
import { Products } from "@/components/products";

export default function Home() {
  return (
    <main className="w-[90%] p-6 mx-auto flex flex-col gap-y-16">
      <Header />
      <Products />
      <CartModal />
    </main>
  );
}
