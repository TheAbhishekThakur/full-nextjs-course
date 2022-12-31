import React, { useState, useEffect } from "react";
import PizzaCard from "../../components/PizzaList/components/PizzaCard";
import axios from "axios";
import styles from "../../styles/Products.module.css";
import Loader from "../../components/common/Loader";

function ProductList({ pizzaData }) {
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (pizzaData !== null) {
      setLoader(false);
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.searchInput}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button}>Search</button>
      </div>
      <div className={styles.searchString}>
        <h1>Search Results For “olive”</h1>
      </div>
      <div className={styles.wrapper}>
        {pizzaData && pizzaData.length > 0
          ? pizzaData.map((item, index) => (
              <PizzaCard key={index} data={item} />
            ))
          : null}
      </div>
      <div className={styles.viewBtn}>
        <button className={styles.button}>View More</button>
      </div>
      {loader && <Loader />}
    </div>
  );
}

export default ProductList;

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/pizza");
  return {
    props: {
      pizzaData: res.data.data,
    },
  };
};
