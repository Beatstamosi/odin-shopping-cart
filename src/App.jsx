import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet, useLoaderData } from "react-router-dom";
import styles from "./App.module.css";
import { ProductsContext } from "./components/productsContext.js";
import ScrollTop from "./components/ScrollToTop.jsx";

function App() {
  const products = useLoaderData();

  return (
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
  );
}

export default App;
