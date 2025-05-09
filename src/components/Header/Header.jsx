import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../CartContext";
import { useEffect, useState } from "react";

function Header() {
  const { shoppingCart, setShoppingCart } = useCart();

  const amountInShoppingCart = shoppingCart.reduce(
    (sum, current) => sum + current.quantity,
    0
  );

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q");

  const [searchInput, setSearchInput] = useState(q || "");

  useEffect(() => {
    setSearchInput(q || "");
  }, [q]);


  return (
    <header className={styles.header} data-testid="header">
      <Link to="/">
        <h2 aria-label="store-title">
          FAKE <span>STORE</span>
        </h2>
      </Link>
      <div className={styles.searchbar}>
        <input
          id="q"
          type="search"
          aria-label="Search for product"
          name="q"
          placeholder="Search Product"
          value={searchInput}
          onChange={(e) => {
            const newQ = e.target.value;
            setSearchInput(newQ);
            const isFirstSearch = q === null;
            navigate(`/search?q=${encodeURIComponent(newQ)}`, {
              replace: !isFirstSearch,
            });
          }}
        />
        <span className={styles.searchButton}>
          <Search strokeWidth={2.75} size={30} />
        </span>
      </div>
      <div className={styles.containerShoppingCart}>
        {shoppingCart.length > 0 && (
          <div className={styles.amount}>{amountInShoppingCart}</div>
        )}
        <Link to="/cart">
          <ShoppingCart size={40} />
        </Link>
      </div>
    </header>
  );
}

export default Header;
