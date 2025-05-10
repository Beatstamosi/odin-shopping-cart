import { useCart } from "../CartContext";
import styles from "./ShoppingCart.module.css";
import BackToProducts from "../BackToProducts/BackToProducts.jsx";

function ShoppingCart() {
  const { shoppingCart, setShoppingCart } = useCart();

  console.log(shoppingCart);

  const formatPrice = (amount) => {
    return (Math.round((amount + Number.EPSILON) * 100) / 100).toFixed(2) + "€";
  };

  const total = formatPrice(
    shoppingCart.reduce(
      (sum, current) => sum + current.product.price * current.quantity,
      0
    )
  );

  const increase = (product) => {
    const updatedCart = [...shoppingCart];
    const index = updatedCart.findIndex(
      (item) => item.product.id == product.id
    );
    updatedCart[index].quantity = updatedCart[index].quantity + 1;
    setShoppingCart(updatedCart);
  };

  const decrease = (product) => {
    const updatedCart = [...shoppingCart];
    const index = updatedCart.findIndex(
      (item) => item.product.id == product.id
    );
    updatedCart[index].quantity =
      updatedCart[index].quantity - 1 > 1 ? updatedCart[index].quantity - 1 : 1;
    setShoppingCart(updatedCart);
  };

  const deleteItem = (product, quantity) => {
    const updatedCart = [...shoppingCart];
    const index = updatedCart.findIndex(
      (item) => item.product.id == product.id && item.quantity == quantity
    );
    updatedCart.splice(index, 1);
    setShoppingCart(updatedCart);
  };

  return (
    <div data-testid="shoppingCart">
      <BackToProducts />
      <div className={styles.containerCart}>
        {shoppingCart.length > 0 && (
          <>
            <div>
              <h2>Your Cart</h2>
              <hr />
              {shoppingCart.map((item) => (
                <div
                  className={styles.containerProducts}
                  key={item.product.id}
                  data-testid={`container-product-${item.product.id}`}
                >
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteItem(item.product, item.quantity)}
                  >
                    x
                  </button>
                  <div className={styles.containerProduct}>
                    <img src={item.product.image} alt="" />
                    <p>{item.product.title}</p>
                  </div>
                  <div className={styles.productPricing}>
                    <p className={styles.price}>
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <div
                      className={styles.quantityHandler}
                      data-testid={`quantity-handler-${item.product.id}`}
                    >
                      <button onClick={() => decrease(item.product)}>-</button>
                      <input type="text" value={item.quantity} readOnly />
                      <button onClick={() => increase(item.product)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.gridRight}>
              <p className={styles.total}>Total</p>
              <span className={styles.totalAmount} data-testid="totalAmount">
                {total}
              </span>
              <button
                className={styles.checkoutBtn}
                onClick={() => {
                  alert(
                    "Didn't you see it is a Fake Store? Don't fall for online scammers! Never give out vulnerable information to strangers on the Internet!"
                  );
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
        {shoppingCart.length < 1 && <p>Your Cart is empty.</p>}
      </div>
    </div>
  );
}

export default ShoppingCart;
