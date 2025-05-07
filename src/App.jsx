import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet, useLoaderData } from "react-router-dom";
import styles from "./App.module.css";
import { ProductsContext } from "./components/productsContext.js";
import ScrollTop from "./components/ScrollToTop.jsx";
import { CartContext } from "./components/CartContext.js";
import { useState } from "react";

function App() {
  const products = useLoaderData();

  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
    < ProductsContext.Provider value={products}>
      <ScrollTop />
      <div className={styles.page}>
        <Header />
        <main className={styles.content}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ProductsContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
