import React, { useState, useEffect } from "react";
import PizzaCard from "../../components/PizzaList/components/PizzaCard";
import axios from "axios";
import styles from "../../styles/Products.module.css";
import Loader from "../../components/common/Loader";

function ProductList({ pizzaData }) {
  const [search, setSearch] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [loader, setLoader] = useState(true);
  const [pizzaList, setPizzaList] = useState(pizzaData);
  useEffect(() => {
    if (pizzaData !== null) {
      setLoader(false);
    }
  }, []);

  const callSearchApi = async () => {
    if (search) {
      const res = await axios.get(
        `http://localhost:3000/api/pizza?search=${search}`
      );
      if (res && res.status === 200) {
        setPizzaList(res.data.data);
        setSearchStr(search);
        setSearch("");
      }
    }
  };
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
        <button className={styles.button} onClick={callSearchApi}>
          Search
        </button>
      </div>
      {searchStr && (
        <div className={styles.searchString}>
          <h1>Search Results For {`"${searchStr}"`}</h1>
        </div>
      )}
      <div className={styles.wrapper}>
        {pizzaList && pizzaList.length > 0
          ? pizzaList.map((item, index) => (
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
