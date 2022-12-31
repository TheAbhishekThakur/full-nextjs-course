import React, { useState } from "react";
import styles from "../../../styles/OrderDetailsModal.module.css";

function Modal({ total, createOrder, setOpenCashModal }) {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    createOrder({
      customer,
      address,
      total,
      method: 0,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setOpenCashModal(false)}>
          X
        </span>
        <h1 className={styles.title}>You will pay ${total} after delivery.</h1>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.item}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              placeholder="Jhon Doe"
              className={styles.input}
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              required
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Phone No</label>
            <input
              type="number"
              placeholder="+91 9999999999"
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength={10}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Address</label>
            <textarea
              placeholder="1st cross, noida"
              className={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className={styles.item}>
            <button type="submit" className={styles.button}>
              Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
