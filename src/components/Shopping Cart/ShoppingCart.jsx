import { useCart } from "../CartContext";
import styles from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const { shoppingCart, setShoppingCart } = useCart();

  const total = shoppingCart.reduce(
    (sum, current) => sum + current.product.price * current.quantity,
    0
  );

  // New logic for increase, decrease --> directly change amount in shopping Cart

  const deleteItem = (product) => {
    const updatedCart = [...shoppingCart];
    const index = updatedCart.findIndex(
      (item) => item.product.id == product.id
    );
    updatedCart.splice(index, 1);
    setShoppingCart(updatedCart);
  };

  return (
    <>
      <div className={styles.backToProducts}>
        <Link to="/products">
          <span> ← Back to all Products</span>
        </Link>
      </div>
      <div className={styles.containerCart}>
        {shoppingCart.length > 0 && (
          <>
            <div>
              <h2>Your Cart</h2>
              <hr />
              {shoppingCart.map((item) => (
                <div className={styles.containerProducts} key={item.product.id}>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteItem(item.product)}
                  >
                    x
                  </button>
                  <div className={styles.containerProduct}>
                    <img src={item.product.image} alt="" />
                    <p>{item.product.title}</p>
                  </div>
                  <div className={styles.productPricing}>
                    <p className={styles.price}>
                      {(item.product.price * item.quantity).toFixed(2)}€
                    </p>
                    <div className={styles.quantityHandler}>
                      <button>-</button>
                      <input type="text" value={item.quantity} readOnly />
                      <button>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.gridRight}>
              <p className={styles.total}>Total</p>
              <span className={styles.totalAmount}>{total}€</span>
              <button className={styles.checkoutBtn}>Checkout</button>
            </div>
          </>
        )}
        {shoppingCart.length < 1 && <p>Your Cart is empty.</p>}
      </div>
    </>
  );
}

export default ShoppingCart;
