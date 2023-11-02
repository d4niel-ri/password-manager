import { useEffect, useState } from "react";
import { callAPI } from "../../domain/api";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";

const Detail = () => {
  const [password, setPassword] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const { id } = useParams();

  const fetchPassword = async() => {
    const data = await callAPI("", "GET", {}, {id});
    setPassword(data[0]);
  }

  useEffect(() => {
    setLoading(true);
    fetchPassword();
    setLoading(false);
  }, [])

  return (
    <main>
      <div className={styles.content}>
        <h1 onClick={() => navigate("/")}>Password Manager</h1>

        {!loading && (
          <>
            <h2>{password.website_address}&rsquo;s detail</h2>
            <div className={styles.password_desc}>
              <div className={styles.password_cell}>
                <div className={styles.label}>
                  Website Address
                </div>
                <div className={styles.text}>
                  {password.website_address}
                </div>
              </div>
              <div className={styles.password_cell}>
                <div className={styles.label}>
                  Email
                </div>
                <div className={styles.text}>
                  {password.email}
                </div>
              </div>
              <div className={styles.password_cell}>
                <div className={styles.label}>
                  Password
                </div>
                <div className={styles.text}>
                  {password.password}
                </div>
              </div>
              <div className={styles.password_cell}>
                <div className={styles.label}>
                  Category
                </div>
                <div className={styles.text}>
                  {password.category}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default Detail;