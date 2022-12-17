import React from "react";
import styles from "../../styles/PizzaList.module.css";
import PizzaCard from "./components/PizzaCard";

const PizzaList = ({ pizzaData }) => {
  return (
    <div className={styles.PizzaListCon}>
      <h1 className={styles.title}>THE BEST PIZZA IN INDIA</h1>
      <p className={styles.desc}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore sequi
        cumque numquam et, dignissimos aperiam similique aliquid eveniet dicta
        cum harum recusandae tenetur fuga nisi voluptas animi magni deserunt
        quisquam?
      </p>
      <div className={styles.wrapper}>
        {pizzaData && pizzaData.length > 0
          ? pizzaData.map((item, index) => (
              <PizzaCard key={index} data={item} />
            ))
          : null}
      </div>
    </div>
  );
};

export default PizzaList;
