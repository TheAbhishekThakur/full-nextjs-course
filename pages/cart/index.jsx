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
import Modal from "../../components/common/OrderDetailsModal";
import Loader from "../../components/common/Loader";
import { API_BASE_URL } from "../../util/constant";

function Cart() {
  const [open, setOpen] = useState(false);
  const [openCashModal, setOpenCashModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (cart) {
      setLoader(false);
    }
  }, []);

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/orders`, data);
      if (res && res.status === 201) {
        router.push("/orders/" + res.data._id);
        dispatch(reset());
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                      <img src={item.image} alt="" className={styles.img} loading="lazy" />
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
                    <span style={styles.price}>${item.price}</span>
                  </td>
                  <td className={styles.td}>
                    <span style={styles.quantity}>{item.qty}</span>
                  </td>
                  <td className={styles.td}>
                    <span style={styles.total}>${item.price * item.qty}</span>
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
            <b className={styles.totaltextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totaltextTitle}>Total:</b>${cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payBtn}
                onClick={() => setOpenCashModal(true)}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AQoZvTEdG__ypr9ft9BYYUh9w96j-diW5VcLgf4V7S1mAyc9VOW4AY0G1ZtiNhs3mgkfwor0KTks9Erc",
                }}
              >
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order
                      .create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "USD",
                              value: cart.total,
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
                      const shipping = details.purchase_units[0].shipping;
                      createOrder({
                        customer: shipping.name.full_name,
                        address: shipping.address.address_line_1,
                        total: cart.total,
                        method: 1,
                      });
                    });
                  }}
                />
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
      {openCashModal && <Modal total={cart.total} createOrder={createOrder} setOpenCashModal={setOpenCashModal} />}
      {loader && <Loader />}
    </div>
  );
}

export default Cart;
