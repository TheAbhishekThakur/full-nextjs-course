import React from "react";
import styles from "../../../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartCount = useSelector((state) => state.cart.cartCount);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callBtn}>
          <Link href="/">
            <Image
              src="/img/telephone.png"
              alt="phoneno"
              width={32}
              height={32}
            />
          </Link>
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>950 706 1639</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/">Homepage</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/products">Products</Link>
          </li>
          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className={styles.item}>
        <div className={styles.cart}>
          <Link href="/cart">
            <Image src="/img/cart.png" alt="logo" width={30} height={30} />
          </Link>
          <div className={styles.counter}>{cartCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
