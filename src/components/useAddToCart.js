import { useCart } from "./CartContext";

function useAddToCart() {
  const { shoppingCart, setShoppingCart } = useCart();

  const addToCart = (product, quantity) => {
    const cart = [...shoppingCart];
    cart.push({ product, quantity });
    setShoppingCart(cart);
  };

  return addToCart;
}

export default useAddToCart;
