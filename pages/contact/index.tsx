import React, { useState } from "react";
import styles from "../../styles/Contact.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../../util/constant";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const notify = () => toast("Your data has been successfully submitted.");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        email,
        mobNo: phone,
        message,
      };
      const res = await axios.post(
        `${API_BASE_URL}/contact`,
        payload
      );
      console.log(res);
      if (res && res.status === 201) {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        notify();
      } else {
        alert("Inter Server Error!");
      }
    } catch (err) {
      console.log(err);
      alert("Inter Server Error!");
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <div className={styles.item}>
        <div className={styles.contactInfo}>
          <h1>Contact Info</h1>
          <p className={styles.paragraph}>
            Do you have something you’d like to enquire about or let us know? We
            love it when people message us. Whether it’s a comment, a
            suggestion, or a plan to save the planet, we look forward to hearing
            from you. Please leave us a message below.
          </p>
          <div><b>Advertise with us:</b> abhishek84411@gmail.com.com </div>
          <div><b>Name:</b> Abhishek Thakur</div>
          <div><b>Mob No:</b> 9507061639</div>
          <div><b>Address:</b> Sector 63A, Noida</div>
        </div>
      </div>
      <div className={styles.item}>
        {/* <div className={styles.heading}>
          <h3>Connect to our team</h3>
        </div> */}
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.formItem}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              placeholder="Jhon Doe"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>Phone No</label>
            <input
              type="number"
              placeholder="+91 9999999999"
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              minLength={10}
              maxLength={10}
            />
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>Message</label>
            <textarea
              placeholder="Type your message here..."
              className={styles.textArea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className={styles.formItem}>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
