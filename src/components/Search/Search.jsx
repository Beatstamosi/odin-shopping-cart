import ProductCard from "../Product Card/ProductCard";
import { useProducts } from "../productsContext";
import styles from "./Search.module.css";
import { useLocation, Link } from "react-router-dom";

function Search() {
  const products = useProducts();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");

  const filteredProducts = q
    ? products.filter((product) =>
        product.title.toLowerCase().includes(q.toLowerCase())
      )
    : products;

  return (
    <div data-testid="search">
      <div className={styles.backToProducts}>
        <Link to="/products">
          <span> ← Back to all Products</span>
        </Link>
      </div>
      <div className={styles.containerProducts}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Search;
