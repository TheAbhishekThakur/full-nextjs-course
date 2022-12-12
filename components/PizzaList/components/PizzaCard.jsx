import React from "react";
import styles from "../../../styles/PizzaCard.module.css";
import Image from "next/image";

function PizzaCard() {
  return (
    <div className={styles.cardContainer}>
      <Image src="/img/pizza.png" alt="pizza" width={260} height={260} />
      <h1 className={styles.pizzaTitle}>FIORI DI ZUCCA</h1>
      <span className={styles.pizzaPrice}>₹500</span>
      <p className={styles.pizzaDesc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
}

export default PizzaCard;
