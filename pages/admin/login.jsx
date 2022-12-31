import React, { useState } from "react";
import styles from "../../styles/Login.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { API_BASE_URL } from "../../util/constant";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const onSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    try {
      const payload = {
        email,
        password,
      };
      const res = await axios.post(`${API_BASE_URL}/login`, payload);
      if (res && res.status === 200) {
        setErr(false);
        router.push("/admin");
      }
    } catch (err) {
      console.error(err);
      setErr(true);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={styles.button} type="submit">
            Sign In
          </button>
          {err && <span className={styles.errColor}>Wrong Credentials</span>}
        </form>
      </div>
    </div>
  );
}

export default Login;
