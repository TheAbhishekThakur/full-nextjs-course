/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "../../styles/Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/slices/cartSlice";
import { useRouter } from "next/router";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";

function Cart() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);

  // This values are the props in the UI
  const amount = "1";
  const currency = "USD";
  const style = { layout: "vertical" };

  const createOrder = async (data) => {
    try {
      const res = axios.post("http://localhost:3000/api/orders", data);
      if (res && res.status === 201) {
        router.push("/orders/" + (await res).data._id);
        dispatch(reset());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              console.log("details", details);
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: data.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
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
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payBtn}>CASH ON DELIVERY</button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AZgwwkXmnKxnGbijipQPYCTQgM1_njZ91x_ktsDOm0FFbqVFaQjdx_U9czuiZQLSx9lvlR4QoX7FAm1B",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              className={styles.checkoutBtn}
              onClick={() => setOpen(true)}
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
