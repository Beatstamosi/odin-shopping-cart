import { useCart } from "../CartContext";
import styles from "./ShoppingCart.module.css";

function ShoppingCart() {
  const { shoppingCart, setShoppingCart } = useCart();

  const total = shoppingCart.reduce((sum, current) => sum + (current.product.price * current.quantity), 0);

  // New logic for increase, decrease --> directly change amount in shopping Cart
  // Logic for delete from Cart

  return (
    <div className={styles.containerCart}>
      <div>
        <h2>Your Cart</h2>
        <hr />
        {shoppingCart.map((item) => (
          <div>
            <div>
              <img src={item.product.image} alt="" />
              <p>{item.product.title}</p>
            </div>
            <div>
              <p>{item.product.price * item.quantity}€</p>
              <div className={styles.quantityHandler}>
                <button>-</button>
                <input type="text" value={item.quantity} readOnly />
                <button>+</button>
              </div>
              <button>x</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p>Total</p>
        <span>{total}€</span>
      </div>
    </div>
  );
}

export default ShoppingCart;
