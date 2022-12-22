/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../styles/Cart.module.css";

function Cart() {
  const goToPayment = () => {
    window.location.href = "/orders/1";
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tr}>
              <td className={styles.td}>
                <div>
                  <img src="/img/pizza.png" alt="" className={styles.img} />
                </div>
              </td>
              <td className={styles.td}>
                <span className={styles.name}>CORALZO</span>
              </td>
              <td className={styles.td}>
                <span style={styles.extras}>
                  Double ingredient, spicy sauce
                </span>
              </td>
              <td className={styles.td}>
                <span style={styles.price}>₹20</span>
              </td>
              <td className={styles.td}>
                <span style={styles.quantity}>2</span>
              </td>
              <td className={styles.td}>
                <span style={styles.total}>₹40</span>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>
                <div>
                  <img src="/img/pizza.png" alt="" className={styles.img} />
                </div>
              </td>
              <td className={styles.td}>
                <span className={styles.name}>CORALZO</span>
              </td>
              <td className={styles.td}>
                <span style={styles.extras}>
                  Double ingredient, spicy sauce
                </span>
              </td>
              <td className={styles.td}>
                <span style={styles.price}>₹20</span>
              </td>
              <td className={styles.td}>
                <span style={styles.quantity}>2</span>
              </td>
              <td className={styles.td}>
                <span style={styles.total}>₹40</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Subtotal:</b>₹79.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Discount:</b>₹79.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Total:</b>₹79.60
          </div>
          <button className={styles.checkoutBtn}  onClick={goToPayment}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
