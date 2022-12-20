/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "../../styles/Order.module.css";

const Order = () => {
  const [status, setStatus] = useState(0);

  const statusClass = (index) => {
    if (index - status < 1) {
      return styles.done;
    }
    if (index - status === 1) {
      return styles.inProgress;
    }
    if (index - status > 1) {
      return styles.unDone;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.td}>
                  <span className={styles.id}>123456789</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.name}>Abhishek</span>
                </td>
                <td className={styles.td}>
                  <span style={styles.address}>Noida, UP</span>
                </td>
                <td className={styles.td}>
                  <span style={styles.total}>40</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <img
              src="/img/paid.png"
              alt=""
              style={{ width: "30px", height: "30px" }}
            />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <img
                src="/img/checked.png"
                alt=""
                className={styles.checked}
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <img
              src="/img/bake.png"
              alt=""
              style={{ width: "30px", height: "30px" }}
            />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <img
                src="/img/checked.png"
                alt=""
                className={styles.checked}
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <img
              src="/img/bike.png"
              alt=""
              style={{ width: "30px", height: "30px" }}
            />
            <span>On The Way</span>
            <div className={styles.checkedIcon}>
              <img
                src="/img/checked.png"
                alt=""
                className={styles.checked}
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <img
              src="/img/delivered.png"
              alt=""
              style={{ width: "30px", height: "30px" }}
            />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <img
                src="/img/checked.png"
                alt=""
                className={styles.checked}
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Subtotal:</b>$79.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Discount:</b>$79.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Total:</b>$79.60
          </div>
          <button className={styles.checkoutBtn} disabled>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
