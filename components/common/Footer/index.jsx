/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.item}>
        <img src="/img/bg.png" alt="footer-image" className={styles.restroImg} loading="lazy" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. THE ABHISHEK PIZZA, WILL BAKED SLICE OF PIZZA
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            A-126 NOIDA SECTOR 63A
            <br /> UP, 201307
            <br /> 9507061639
          </p>
          <p className={styles.text}>
            A-126 NOIDA SECTOR 63A
            <br /> UP, 201307
            <br /> 9507061639
          </p>
          <p className={styles.text}>
            A-126 NOIDA SECTOR 63A
            <br /> UP, 201307
            <br /> 9507061639
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 09:00 AM - 09:00 PM
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 09:00 AM - 09:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
