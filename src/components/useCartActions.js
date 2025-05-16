import { useCart } from "./CartContext";
import { ACTIONS } from "./shoppingCartReducer";

export default function useCartActions() {
  const { dispatch } = useCart();

  const increaseInCart = (product) => {
    dispatch({ type: ACTIONS.INCREASE, product: product });
  };

  const decreaseInCart = (product) => {
    dispatch({ type: ACTIONS.DECREASE, product: product });
  };

  const deleteItem = (product, quantity) => {
    dispatch({ type: ACTIONS.DELETE, product: product, quantity: quantity });
  };

  const addToCart = (product, quantity) => {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      product: product,
      quantity,
      quantity,
    });
  };

  return { increaseInCart, decreaseInCart, deleteItem, addToCart };
}
