import { Form, Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../CartContext";

function Header() {
  const { shoppingCart, setShoppingCart } = useCart();

  const amountInShoppingCart = shoppingCart.reduce((sum, current) => sum + current.quantity, 0);

  return (
    <div className={styles.header}>
      <Link to="/"><h2>FAKE <span>STORE</span></h2></Link>
      <div className={styles.searchbar}>
        <input
          id="q"
          type="search"
          aria-label="Search product"
          name="q"
          placeholder="Search Product"
        />
        <button className={styles.searchButton}>
          <Search strokeWidth={2.75} size={30} />
        </button>
      </div>
      <div className={styles.containerShoppingCart}>
        {shoppingCart.length > 0 && 
        <div className={styles.amount}>{amountInShoppingCart}</div>
        }
        <Link to="/cart"><ShoppingCart size={40} /></Link>
      </div>
    </div>
  );
}

export default Header;
