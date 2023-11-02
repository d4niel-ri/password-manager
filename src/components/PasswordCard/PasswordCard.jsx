/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useState } from 'react';
import DeletePassword from '../Modals/DeletePassword/DeletePassword';
import { callAPI } from '../../domain/api';

const PasswordCard = ({password, setPasswords}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const deletePassword = async() => {
    try {
      // eslint-disable-next-line no-unused-vars
      const data = await callAPI(`${password.id}`, "DELETE");
      setIsOpen(false);
      setPasswords((prev) => prev.filter(item => item.id != password.id));
    } catch(error) {
      alert(error);
    }
  }

  const handleDelete = async() => {
    deletePassword();
  }

  return (
    <>
      <div className={styles.password_card} key={password.id}>
        <div className={styles.password_desc}>
          <h2>{password.website_address}</h2>
          <div className={styles.password_subdesc}>
            <p className={styles.password_email}><b>Email:</b> {password.email}</p>
            <p className={styles.password_category}><b>Category:</b> {password.category}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button variant="outlined" onClick={() => navigate(`/detail/${password.id}`)}>
            Detail
          </Button>
          <Button variant="outlined" color="error" onClick={() => setIsOpen(true)}>
            Delete
          </Button>
        </div>
      </div>

      {isOpen && (
        <DeletePassword isOpen={isOpen} setIsOpen={setIsOpen} handleDelete={handleDelete} />
      )}
    </>
  )
}

export default PasswordCard;