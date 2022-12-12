/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "../../styles/PizzaDetails.module.css";
import Image from "next/image";

const PizzaDetails = () => {
  const [size, setSize] = useState(0);
  const pizza = {
    id: 1,
    img: "/img/pizza.png",
    name: "Cheese Pizza",
    price: [10, 20, 30],
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit suscipit autem earum rerum accusantium non dolorem, ad eius id dolores voluptatibus eligendi praesentium ducimus repudiandae. Architecto quaerat perspiciatis ullam consectetur?",
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.left}>
        <div className={styles.imgCon}>
          <img src={pizza.img} alt="pizza" className={styles.pizzaImg} />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>{`₹${pizza.price[size]}`}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose} style={{ marginBottom: "40px" }}>
          Choose Your Size
        </h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src="/img/size.png" alt="size" width={100} height={100} />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src="/img/size.png" alt="size" width={100} height={100} />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image src="/img/size.png" alt="size" width={100} height={100} />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose Additional Ingredients</h3>
        <div className={styles.ingredients}>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="double"
              name="double"
              className={styles.checkbox}
            />
            <label htmlFor="double">Double Ingredients</label>
          </div>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="cheese"
              name="cheese"
              className={styles.checkbox}
            />
            <label htmlFor="cheese">Extra Cheese</label>
          </div>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="spicy"
              name="spicy"
              className={styles.checkbox}
            />
            <label htmlFor="spicy">Spicy Sauce</label>
          </div>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="garlic"
              name="garlic"
              className={styles.checkbox}
            />
            <label htmlFor="garlic">Garlic Sauce</label>
          </div>
        </div>
        <div className={styles.add}>
          <input type="number" defaultValue={1} className={styles.quantity} />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;
