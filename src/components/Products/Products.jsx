import ProductCard from "../Product Card/ProductCard";
import { useProducts } from "../productsContext";
import styles from "./Products.module.css"

function Products() {
  const products = useProducts();

  return (
    <div className={styles.containerProducts}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
