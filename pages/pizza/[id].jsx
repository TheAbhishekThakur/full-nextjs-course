/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "../../styles/PizzaDetails.module.css";
import Image from "next/image";
import axios from "axios";

const PizzaDetails = ({ data }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(data.prices[0]);
  const [extras, setExtras] = useState([]);
  const [qty, setQty] = useState(1);

  const handleSize = (idx) => {
    const diff = data.prices[idx] - data.prices[size];
    setSize(idx);
    changePrice(diff);
  };

  const changePrice = (value) => {
    setPrice(price + value);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((ex) => ex._id !== option._id));
    }
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.left}>
        <div className={styles.imgCon}>
          <img
            src={data.image}
            alt="pizza"
            className={styles.pizzaImg}
            style={{ width: "100%", height: "500px" }}
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{data.title}</h1>
        <span className={styles.price}>{`₹${price}`}</span>
        <p className={styles.desc}>{data.desc}</p>
        <h3 className={styles.choose} style={{ marginBottom: "40px" }}>
          Choose Your Size
        </h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" alt="size" width={100} height={100} />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" alt="size" width={100} height={100} />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" alt="size" width={100} height={100} />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose Additional Ingredients</h3>
        <div className={styles.ingredients}>
          {data.extraOptions.map((option, index) => (
            <div className={styles.option} key={index}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            defaultValue={qty}
            onChange={(e) => setQty(e.target.value)}
            className={styles.quantity}
          />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;

export const getServerSideProps = async ({ params }) => {
  const pizzaId = params.id;
  const res = await axios.get(`http://localhost:3000/api/pizza/${pizzaId}`);
  return {
    props: {
      data: res.data.data,
    },
  };
};
