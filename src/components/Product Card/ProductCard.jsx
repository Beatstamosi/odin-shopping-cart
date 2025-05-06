import { useState } from "react";
import useQuantity from "../useQuantity";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const {quantity, increase, decrease} = useQuantity();

  // TODO: Add to Cart functionality

  return (
    <Link to={`/products/${product.id}`}>
        <div className={styles.containerProductCard}>
        <div className={styles.imgContainer}>
            <img src={product.image} alt="" />
        </div>
        <p className={styles.title}>{product.title}</p>
        <p>{parseFloat(product.price).toFixed(2)}€</p>
        <div className={styles.quantityHandler}>
            <button onClick={() => decrease()}>-</button>
            <input type="text" value={quantity} readOnly/>
            <button onClick={() => increase()}>+</button>
        </div>
        <button className={styles.addToCart}>Add to Cart</button>
        </div>
    </Link>
  );
}

export default ProductCard;
