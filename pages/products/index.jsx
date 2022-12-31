import React, { useState, useEffect } from "react";
import PizzaCard from "../../components/PizzaList/components/PizzaCard";
import axios from "axios";
import styles from "../../styles/Products.module.css";
import Loader from "../../components/common/Loader";
import { API_BASE_URL } from "../../util/constant";

function ProductList({ pizzaData }) {
  const [search, setSearch] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [loader, setLoader] = useState(true);
  const [pizzaList, setPizzaList] = useState(pizzaData);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (pizzaData !== null) {
      setLoader(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewMore = () => {
    setPage(page + 1);
    callNextPageApi(page + 1);
  };

  const callNextPageApi = async (value) => {
    const res = await axios.get(
      `${API_BASE_URL}/pizza?search=${search}&page=${value}&limit=8`
    );
    if (res && res.status === 200) {
      setPizzaList([...pizzaList, ...res.data.data]);
      setSearchStr(search);
      setSearch("");
    }
  };

  const callSearchApi = async () => {
    if (search) {
      const res = await axios.get(
        `${API_BASE_URL}/pizza?search=${search}&page=${page}&limit=8`
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
        <button className={styles.button} onClick={viewMore}>
          View More
        </button>
      </div>
      {loader && <Loader />}
    </div>
  );
}

export default ProductList;

export const getServerSideProps = async () => {
  const res = await axios.get(`${API_BASE_URL}/pizza?page=1&limit=8`);
  return {
    props: {
      pizzaData: res.data.data,
    },
  };
};
