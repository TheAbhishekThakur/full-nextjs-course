import React, { useState } from "react";
import styles from "../../../styles/CreatePizzaModal.module.css";
import { useRouter } from "next/router";
import axios from "axios";

function Modal({ setModal }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post("", data);
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        image: url,
      };
      await axios.post("http://localhost:3000/api/pizza", newProduct);
      setModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setModal(false)}>
          X
        </span>
        <h1>Add a New Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an Image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input type="text" placeholder="title" className={styles.input} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <textarea placeholder="description" />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              type="number"
              className={`${styles.input} ${styles.inputSum}`}
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              type="number"
              placeholder="Medium"
              className={`${styles.input} ${styles.inputSum}`}
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              type="number"
              placeholder="Large"
              className={`${styles.input} ${styles.inputSum}`}
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              type="text"
              placeholder="Item"
              name="text"
              className={`${styles.input} ${styles.inputSum}`}
              onChange={handleExtraInput}
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              className={`${styles.input} ${styles.inputSum}`}
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions &&
              extraOptions.map((item, index) => (
                <span key={index.toString()} className={styles.extraItem}>
                  {item.text}
                </span>
              ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}

export default Modal;
