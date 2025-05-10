import ProductCard from "../Product Card/ProductCard";
import { useProducts } from "../productsContext";
import styles from "./Search.module.css";
import { useLocation, Link } from "react-router-dom";
import BackToProducts from "../BackToProducts/BackToProducts.jsx";

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
      <BackToProducts />
      <div
        className={styles.containerProducts}
        data-testid="containerSearchProducts"
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Search;
