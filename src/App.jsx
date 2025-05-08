import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet, useLoaderData } from "react-router-dom";
import styles from "./App.module.css";
import { ProductsContext } from "./components/productsContext.js";
import ScrollTop from "./components/ScrollToTop.jsx";
import { CartContext } from "./components/CartContext.js";
import { useState, useRef, useEffect } from "react";
import ItemAdded from "./components/Item Added Notification/ItemAdded.jsx";

function App() {
  const products = useLoaderData();

  const [shoppingCart, setShoppingCart] = useState([]);

  // Added to Cart Notification
  const cartRef = useRef(shoppingCart);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (shoppingCart.length > cartRef.current.length) {
      setShowNotification(true);
      cartRef.current = shoppingCart;

      setTimeout(() => {
        setShowNotification(false);
      }, 1700);
    }
  }, [shoppingCart]);

  return (
    <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
      <ProductsContext.Provider value={products}>
        <ScrollTop />
        <div className={styles.page}>
          <Header />
          <main className={styles.content}>
            {showNotification && <ItemAdded />}
            <Outlet />
          </main>
          <Footer />
        </div>
      </ProductsContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
