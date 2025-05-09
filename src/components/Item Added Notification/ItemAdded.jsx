import styles from "./ItemAdded.module.css";

function ItemAdded() {
  return (
    <div className={styles.container} data-testid="notificationItemAdded">
      <p>Item Added to Cart!</p>
    </div>
  );
}

export default ItemAdded;
