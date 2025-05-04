import { Form } from "react-router-dom";
import styles from "./header.module.css";
import { ShoppingCart, Search } from 'lucide-react';

function Header() {
  return (
    <div className={styles.header}>
      <h2>
        FAKE <span>STORE</span>
      </h2>
      <div className={styles.searchbar}>
          <input id="q" type="search" aria-label="Search product" name="q" placeholder="Search Product"/>
          <button className={styles.searchButton}><Search strokeWidth={2.75} size={30} /></button>
      </div>
      <div className={styles.containerShoppingCart}>
        <div className={styles.amount}>
          10
        </div>
        <ShoppingCart size={40}/>
      </div>
    </div>
  );
}

export default Header;
