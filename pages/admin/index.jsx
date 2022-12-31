/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { use, useState } from "react";
import styles from "../../styles/Admin.module.css";
import Modal from "../../components/common/CreatePizzaModal"
import { API_BASE_URL } from "../../util/constant";

function Admin({ orders, pizzas }) {
  const [pizzaList, setPizzaList] = useState(pizzas);
  const [orderList, setOrderList] = useState(orders);
  const [modal, setModal] = useState(false);

  const status = ["Preparing", "On the way", "Delivered"];

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/pizza/${id}`);
      if (res) {
        setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put(`${API_BASE_URL}/orders/${id}`, {
        status: currentStatus + 1,
      });
      if (res) {
        setOrderList([
          res.data,
          ...orderList.filter((order) => order._id !== id),
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div>
        <button
          onClick={() => setModal(true)}
          className={styles.addPizzaButton}
        >
          Add New Pizza
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Products</h1>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Image</th>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pizzaList &&
                pizzaList.map((item, index) => (
                  <tr className={styles.tr} key={index.toString()}>
                    <td className={styles.td}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "50px", height: "50px" }}
                        loading="lazy"
                      />
                    </td>
                    <td className={styles.td}>
                      <span className={styles.name}>{item._id}</span>
                    </td>
                    <td className={styles.td}>
                      <span style={styles.address}>{item.title}</span>
                    </td>
                    <td className={styles.td}>
                      <span style={styles.total}>${item.prices[0]}</span>
                    </td>
                    <td className={styles.td}>
                      <button className={styles.button}>Edit</button>
                      <button
                        className={styles.button}
                        onClick={() => deleteProduct(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>Orders</h1>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList &&
                orderList.map((item, index) => (
                  <tr className={styles.tr} key={index.toString()}>
                    <td className={styles.td}>
                      <span className={styles.id}>{item._id}</span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.name}>{item.customer}</span>
                    </td>
                    <td className={styles.td}>
                      <span style={styles.address}>${item.total}</span>
                    </td>
                    <td className={styles.td}>
                      {item.method === 0 && (
                        <span style={styles.total}>Cash</span>
                      )}
                      {item.method === 1 && (
                        <span style={styles.total}>Paid</span>
                      )}
                    </td>
                    <td className={styles.td}>
                      <span style={styles.total}>{status[item.status]}</span>
                    </td>
                    <td className={styles.td}>
                      <button
                        className={styles.button}
                        onClick={() => handleStatus(item._id)}
                      >
                        Next Stage
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && <Modal setModal={setModal} />}
    </div>
  );
}

export default Admin;

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  console.log("myCookie", myCookie.token);

  if (!myCookie.token) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const products = await axios.get(`${API_BASE_URL}/pizza`);
  const orders = await axios.get(`${API_BASE_URL}/orders`);

  return {
    props: {
      orders: orders.data,
      pizzas: products.data.data,
    },
  };
};
