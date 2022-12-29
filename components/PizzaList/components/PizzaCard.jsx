import React from "react";
import styles from "../../../styles/PizzaCard.module.css";
import Image from "next/image";
import Link from "next/Link";

function PizzaCard({ key, data }) { 
  return (
    <div className={styles.cardContainer} key={key}>
      <Link href={`/pizza/${data._id}`}>
        <Image src={data.image} alt="pizza" width={260} height={260} />
      </Link>
      <h1 className={styles.pizzaTitle}>{data.title}</h1>
      <span className={styles.pizzaPrice}>₹{data.prices[0]}</span>
      <p className={styles.pizzaDesc}>{data.desc}</p>
    </div>
  );
}

export default PizzaCard;
