/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import Input from '@mui/material/Input';
import { InputAdornment } from '@mui/material';
import { VisibilityOff } from '@mui/icons-material';
import { Visibility } from '@mui/icons-material';
import { DialogContentText } from '@mui/material';
import { useState } from 'react';
import styles from "./styles.module.scss";
import { callAPI } from '../../../domain/api';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AddPassword = ({isOpen, setIsOpen, setPasswords}) => {
  const [inputs, setInputs] = useState({website_address: "", email: "", password: "", category: ""});
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const createPassword = async() => {
    try {
      if (!inputs.website_address || !inputs.email || !inputs.password || !inputs.category) {
        throw "All fields are required";
      }

      // Check website address is in URL format
      const urlPattern = /^(https?:\/\/)?(www\.)?([a-z0-9-]+)\.([a-z]{2,})(\/[^\s]*)?$/i;
      if (!urlPattern.test(inputs.website_address)) throw "Website address is not in URL format"
      // Check email is in email format
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(inputs.email)) throw "Email is not in email format"
      // Check password is minimal 6 letters
      if (inputs.password.length < 6) throw "Password's minimal length is 6"

      const data = await callAPI("", "POST", {}, {}, {
        website_address: inputs.website_address,
        email: inputs.email,
        password: inputs.password,
        category: inputs.category
      });
      setPasswords((prev) => [...prev, data]);
      setError(null);
      setIsOpen(false);
    } catch(error) {
      console.error(error);
      setError(error);
    }
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAdd = async() => {
    createPassword();
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      className={styles.dialog}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create New Login
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent className={styles.form_inputs}>
        <TextField
          margin="dense"
          required
          id="website"
          label="Website Address"
          type="email"
          fullWidth
          variant="standard"
          autoComplete='off'
          onChange={(e) => setInputs((prev) => ({...prev, website_address: e.target.value}))}
          value={inputs.website_address}
        />
        <TextField
          margin="dense"
          required
          id="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          autoComplete='off'
          onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
          value={inputs.email}
        />
        <FormControl fullWidth required variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => setInputs((prev) => ({...prev, password: e.target.value}))}
            value={inputs.password}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth required>
          <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={inputs.category}
            onChange={(e) => setInputs((prev) => ({...prev, category: e.target.value}))}
            label="Category"
          >
            <MenuItem value="work">work</MenuItem>
            <MenuItem value="family">family</MenuItem>
            <MenuItem value="personal">personal</MenuItem>
          </Select>
        </FormControl>
        {error && (
          <DialogContentText id="error-message" className={styles.error_message}>
            {error}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button type='submit' onClick={handleAdd}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default AddPassword;