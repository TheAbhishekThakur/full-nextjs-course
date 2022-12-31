import Head from "next/head";
import Slider from "../components/Slider";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Loader from "../components/common/Loader";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../util/constant";

export default function Home({ pizzaData }) {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (pizzaData !== null) {
      setLoader(false);
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best pizza shop..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      {loader && <Loader />}
      <PizzaList pizzaData={pizzaData} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${API_BASE_URL}/pizza`);
  return {
    props: {
      pizzaData: res.data.data,
    },
  };
};
