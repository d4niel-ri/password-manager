import { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import { callAPI } from './domain/api';
import { useNavigate, useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import PasswordCard from './components/PasswordCard/PasswordCard';
import AddPassword from './components/Modals/AddPassword/AddPassword';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [categoryChosen, setCategoryChosen] = useState("");

  const { category } = useParams();
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCategoryChosen(e.target.value);
    navigate(`/${e.target.value}`);
  }

  const fetchAllPasswords = async() => {
    const data = await callAPI("",  "GET");
    setPasswords(data);
  }

  const fetchPasswordsByCategory = async() => {
    const data = await callAPI("", "GET", {}, {category});
    setPasswords(data);
  }

  useEffect(() => {
    if (category) {
      fetchPasswordsByCategory();
    } else {
      fetchAllPasswords();
    }
  }, [category, setPasswords]);

  return (
    <main>
      <div className={styles.content}>
        <h1 onClick={() => navigate("/")}>Password Manager</h1>

        <div className={styles.subcontent}>
          <header>
            <h2>Passwords</h2>
            <Button variant="outlined" onClick={() => setIsOpen(true)}>
              Add
            </Button>
          </header>

          <FormControl fullWidth className={styles.form_control}>
            <InputLabel id="demo-simple-select-label">Filter By Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryChosen}
              label="Filter By Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="work">work</MenuItem>
              <MenuItem value="family">family</MenuItem>
              <MenuItem value="personal">personal</MenuItem>
            </Select>
          </FormControl>

          <div className={styles.list_passwords}>
            {passwords.map((password) => (
              <PasswordCard key={password.id} 
                password={password} setPasswords={setPasswords}
              />
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <AddPassword isOpen={isOpen} setIsOpen={setIsOpen} setPasswords={setPasswords} />
      )}
    </main>
  )
}

export default App
