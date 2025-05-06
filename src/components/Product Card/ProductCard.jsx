import { useState } from "react";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    let amount = quantity;
    setQuantity(amount + 1);
  };

  const decrease = () => {
    let amount = quantity;

    if (amount - 1 <= 1) {
      amount = 1;
    } else {
      --amount;
    }
    setQuantity(amount);
  };

  // TODO: Add to Cart functionality

  return (
    <div className={styles.containerProductCard}>
      <div className={styles.imgContainer}>
        <img src={product.image} alt="" />
      </div>
      <p className={styles.title}>{product.title}</p>
      <p>{parseFloat(product.price).toFixed(2)}€</p>
      <div className={styles.quantityHandler}>
        <button onClick={() => decrease()}>-</button>
        <input type="text" value={quantity} />
        <button onClick={() => increase()}>+</button>
      </div>
      <button className={styles.addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
