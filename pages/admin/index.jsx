import React from "react";
import styles from "../../styles/Admin.module.css";

function Admin() {
  return (
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
            <tr className={styles.tr}>
              <td className={styles.td}>
                <span className={styles.id}>Pizza Title</span>
              </td>
              <td className={styles.td}>
                <span className={styles.name}>Pizza Id</span>
              </td>
              <td className={styles.td}>
                <span style={styles.address}>werwerw</span>
              </td>
              <td className={styles.td}>
                <span style={styles.total}>qejwker</span>
              </td>
              <td className={styles.td}>
                <span style={styles.total}>wejrhej</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
