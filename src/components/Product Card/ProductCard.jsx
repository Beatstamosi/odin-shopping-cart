import useQuantity from "../useQuantity";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import useCartActions from "../useCartActions";

function ProductCard({ product }) {
  const { quantity, increase, decrease } = useQuantity();
  const { addToCart } = useCartActions();

  return (
    <div className={styles.containerProductCard}>
      <div className={styles.imgContainer}>
        <img src={product.image} alt="" />
      </div>
      <p className={styles.title}>{product.title}</p>
      <p>{parseFloat(product.price).toFixed(2)}€</p>
      <div className={styles.quantityHandler}>
        <button onClick={() => decrease()}>-</button>
        <input type="text" value={quantity} readOnly />
        <button onClick={() => increase()}>+</button>
      </div>
      <div className={styles.containerButtons}>
        <button
          className={styles.addToCart}
          onClick={() => addToCart(product, quantity)}
        >
          Add to Cart
        </button>
        <Link to={`/products/${product.id}`}>
          <button className={styles.viewMore}>View More</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
