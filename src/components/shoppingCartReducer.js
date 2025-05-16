export const ACTIONS = {
  ADD_TO_CART: "add-to-cart",
  INCREASE: "increase",
  DECREASE: "decrease",
  DELETE: "delete",
};

export default function shoppingCartReducer(shoppingCart, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const cart = [...shoppingCart];
      cart.push({ product: action.product, quantity: action.quantity });
      return cart;
    }
    case ACTIONS.INCREASE: {
      return shoppingCart.map((item) =>
        item.product.id == action.product.id
          ? { product: item.product, quantity: item.quantity + 1 }
          : item
      );
    }
    case ACTIONS.DECREASE: {
      return shoppingCart.map((item) =>
        item.product.id == action.product.id
          ? {
              product: item.product,
              quantity: item.quantity - 1 >= 1 ? item.quantity - 1 : 1,
            }
          : item
      );
    }
    case ACTIONS.DELETE: {
      const updatedCart = [...shoppingCart];
      const index = updatedCart.findIndex(
        (item) =>
          item.product.id == action.product.id &&
          item.quantity == action.quantity
      );
      updatedCart.splice(index, 1);
      return updatedCart;
    }
  }
}
