/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "../../styles/Order.module.css";
import axios from "axios";
import Loader from "../../components/common/Loader";

const Order = ({ order }) => {
  const [status, setStatus] = useState(order.status);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (order !== null) {
      setLoader(false);
    }
  }, []);

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
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td className={styles.td}>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.name}>{order.customer}</span>
                </td>
                <td className={styles.td}>
                  <span style={styles.address}>{order.address}</span>
                </td>
                <td className={styles.td}>
                  <span style={styles.total}>{order.total}</span>
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
              loading="lazy"
            />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <img
                src="/img/checked.png"
                alt=""
                className={styles.checked}
                style={{ width: "20px", height: "20px" }}
                loading="lazy"
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <img
              src="/img/bake.png"
              alt=""
              style={{ width: "30px", height: "30px" }}
              loading="lazy"
            />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <img
                src="/img/checked.png"
                alt=""
                className={styles.checked}
                style={{ width: "20px", height: "20px" }}
                loading="lazy"
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <img
              src="/img/bike.png"
              alt=""
              style={{ width: "30px", height: "30px" }}
              loading="lazy"
            />
            <span>On The Way</span>
            <div className={styles.checkedIcon}>
              <img
                src="/img/checked.png"
                alt=""
                className={styles.checked}
                style={{ width: "20px", height: "20px" }}
                loading="lazy"
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <img
              src="/img/delivered.png"
              alt=""
              style={{ width: "30px", height: "30px" }}
              loading="lazy"
            />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <img
                src="/img/checked.png"
                alt=""
                className={styles.checked}
                style={{ width: "20px", height: "20px" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Subtotal:</b>${order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Discount:</b>$79.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Total:</b>${order.total}
          </div>
          <button className={styles.checkoutBtn} disabled>
            PAID
          </button>
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default Order;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: {
      order: res.data,
    },
  };
};
