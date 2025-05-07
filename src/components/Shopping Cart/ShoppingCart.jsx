import { useCart } from "../CartContext";
import styles from "./ShoppingCart.module.css";

function ShoppingCart() {
  const { shoppingCart, setShoppingCart } = useCart();

  const total = shoppingCart.reduce(
    (sum, current) => sum + current.product.price * current.quantity,
    0
  );

  // New logic for increase, decrease --> directly change amount in shopping Cart
  // Logic for delete from Cart
  

  return (
    <div className={styles.containerCart}>
      <div>
        <h2>Your Cart</h2>
        <hr />
        {shoppingCart.map((item) => (
          <div className={styles.containerProducts}>
            <button className={styles.deleteBtn}>x</button>
            <div className={styles.containerProduct}>
              <img src={item.product.image} alt="" />
              <p>{item.product.title}</p>
            </div>
            <div className={styles.productPricing}>
              <p className={styles.price}>{(item.product.price * item.quantity).toFixed(2)}€</p>
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
    </div>
  );
}

export default ShoppingCart;
