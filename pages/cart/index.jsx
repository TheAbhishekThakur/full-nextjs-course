/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../styles/Cart.module.css";

function Cart() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tr className={styles.tr}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {/* <tr>
            <td>
              <div className={styles.img}>
                <img src="/img/pizza.png" alt="" />
              </div>
            </td>
            <td>
              <span className={styles.name}>CORALZO</span>
            </td>
            <td>
              <span style={styles.extras}>Double ingredient, spicy sauce</span>
            </td>
            <td>
              <span style={styles.price}>20</span>
            </td>
            <td>
              <span style={styles.quantity}>2</span>
            </td>
            <td>
              <span style={styles.total}>40</span>
            </td>
          </tr> */}
        </table>
      </div>
      <div className={styles.right}></div>
    </div>
  );
}

export default Cart;
