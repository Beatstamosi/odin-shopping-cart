import styles from "./home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.containerHome}>
      <h1>Welcome to Fake Store</h1>
      <button>
        <Link to="products">See All Products</Link>
      </button>
    </div>
  );
}

export default Home;
