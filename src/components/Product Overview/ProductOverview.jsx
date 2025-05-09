import { useParams, Link } from "react-router-dom";
import styles from "./ProductOverview.module.css";
import { useProducts } from "../productsContext";
import useQuantity from "../useQuantity";
import useAddToCart from "../useAddToCart";

function ProductOverview() {
  const params = useParams();
  const products = useProducts();
  const product = products.find((product) => params.id == product.id);

  const { quantity, increase, decrease } = useQuantity();

  const addToCart = useAddToCart();

  return (
    <div data-testid="productOverview">
      <div className={styles.backToProducts}>
        <Link to="/products">
          <span> ← Back to all Products</span>
        </Link>
      </div>
      <div className={styles.containerOverview}>
        <div className={styles.imgContainer}>
          <img src={product.image} alt="" />
        </div>
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{parseFloat(product.price).toFixed(2)}€</p>
          <div className={styles.quantityHandler}>
            <button onClick={() => decrease()}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={() => increase()}>+</button>
          </div>
          <button className={styles.addToCart} onClick={() => addToCart(product, quantity)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductOverview;
