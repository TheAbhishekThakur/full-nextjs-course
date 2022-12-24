/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../styles/Cart.module.css";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const goToPayment = () => {
    window.location.href = "/orders/1";
  };
  console.log("cart", cart);
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
            {cart &&
              cart.pizzaList.map((item, index) => (
                <tr className={styles.tr} key={index}>
                  <td className={styles.td}>
                    <div>
                      <img src={item.image} alt="" className={styles.img} />
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.name}>{item.title}</span>
                  </td>
                  <td className={styles.td}>
                    {item &&
                      item.extraOptions.map((ex, idx) => (
                        <span style={styles.extras} key={idx}>
                          {`${ex.text}, `}
                        </span>
                      ))}
                  </td>
                  <td className={styles.td}>
                    <span style={styles.price}>₹{item.price}</span>
                  </td>
                  <td className={styles.td}>
                    <span style={styles.quantity}>{item.qty}</span>
                  </td>
                  <td className={styles.td}>
                    <span style={styles.total}>₹{item.price * item.qty}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Subtotal:</b>₹{cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Discount:</b>₹0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Total:</b>₹{cart.total}
          </div>
          <button className={styles.checkoutBtn} onClick={goToPayment}>
            CHECKOUT NOW!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
