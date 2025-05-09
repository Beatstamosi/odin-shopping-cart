import { useCart } from "./CartContext";

function useAddToCart() {
  const { shoppingCart, setShoppingCart } = useCart();

  const addToCart = (product, quantity) => {
    setShoppingCart([...shoppingCart, {...product, quantity}]);
  };

  return addToCart;
}

export default useAddToCart;
