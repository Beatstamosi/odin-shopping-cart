import { Link } from "react-router-dom";
import styles from "./BackToProducts.module.css"

function BackToProducts() {
  return (
    <div className={styles.backToProducts}>
      <Link to="/products">
        <span> ← Back to all Products</span>
      </Link>
    </div>
  );
}

export default BackToProducts;
