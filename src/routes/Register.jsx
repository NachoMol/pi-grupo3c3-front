import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '@mui/icons-material';
import axios from 'axios';
import DefaultButton from '../components/DefaultButton';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { URL } from '../config/config';

//template sacada de https://github.com/mui/material-ui/blob/v5.14.16/docs/data/material/getting-started/templates/sign-up/SignUp.js
const Register = () => {

  const emailRegex = (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
  const defaultTheme = createTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState('')

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate()


  const validateForm = () => {
    let valid = true;

    if (!firstName) {
      setFirstNameError('First Name is required');
      valid = false;
    } else if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(firstName)) {
      setFirstNameError('First Name should not contain numbers');
      valid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName) {
      setLastNameError('Last Name is required');
      valid = false;
    } else if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(lastName)) {
      setLastNameError('Last Name should not contain numbers');
      valid = false;
    } else {
      setLastNameError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 5) {
      setPasswordError('Password should be at least 5 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (valid) {
      setSuccessMessage('Registration successful!'); // Mensaje de éxito
    } else {
      setSuccessMessage(''); // Reinicia el mensaje de éxito si hay errores
    }

    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const data = new FormData(event.currentTarget);
      const user = {
        name: data.get('firstName'),
        lastname: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
      };

      try {
        const response = await axios.post(`${URL}/users/create`, user);

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');

        if (response.status === 201) {
          setSuccessMessage('¡Registro exitoso!');
          Swal.fire({
            title: '¡Te has registrado con éxito!',
            text: ' Por favor, revisa tu correo electrónico para confirmar tu registro. Si no has recibido el correo electrónico de confirmación, puedes hacer clic aquí para reenviarlo.',
            icon: 'success',
            confirmButtonText: 'Reenviar correo',
            showCancelButton: true,
            cancelButtonText: 'Cerrar'
          }).then((result) => {
            if (result.isConfirmed) {
              // Aquí puedes hacer la petición para reenviar el correo
              fetch(`${URL}/users/forwardmail/${email}`, {
                method: 'POST',
                // Aquí puedes agregar más configuraciones para tu petición si es necesario
              }).then(response => {
                // Maneja la respuesta de tu petición
              }).catch(error => {
                console.error('Error:', error);
              });
            }
          });
          navigate('/login')
          // Acciones adicionales después de un registro exitoso
        } else {
          setSuccessMessage('Please, check your information');
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setServerError(error.response.data);
        }
        else
          console.error("Registration error:", error.response?.data || error.message);
        setServerError("Error during registration: " + error.response.data);
      }
    }

  };



  return (
    <div style={{ backgroundColor: '#D9D9D9', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={!!firstNameError}
                    helperText={firstNameError}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error={!!lastNameError}
                    helperText={lastNameError}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={!!emailError}
                    helperText={emailError}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={!!passwordError}
                    helperText={passwordError}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </Grid>
                {serverError && (
                  <Typography variant="body2" style={{ color: 'red', textAlign: 'center' }}>
                    {serverError}
                  </Typography>
                )}
                {!serverError && successMessage && (
                  <Typography variant="body2" style={{ color: 'green', textAlign: 'center' }}>
                    {successMessage}
                  </Typography>
                )}
              </Grid>
              <DefaultButton name="Sign Up" />
              <Grid container justifyContent="center">
                <Grid item>
                <Link to={'/login/'} style={{cursor: 'pointer'}}>{`Already have an account? Sign in`}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Register;