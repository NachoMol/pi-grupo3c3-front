import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Link, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import { Alert, Avatar, TextField, Paper, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CopyrigthLogin from '../components/_Login/CopyrigthLogin';
import { urlBackground } from '../config/config';
import DefaultButton from '../components/DefaultButton';
import axios from 'axios';


const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isLoggedIn, setLoggedIn] = useState(false); // Estado para controlar la redirección

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/login", {
                email: data.user,
                password: data.password,
            });

            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token);
            setLoggedIn(true); // Establece el estado de isLoggedIn a true para activar la redirección
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
        }
    };

    // Si el usuario está autenticado, redirige a la página de inicio
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <Grid container component="main" sx={{ height: '90vh', overflow: 'hidden'}}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${urlBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{backgroundColor: '#D9D9D9'}}>
                <Box
                    sx={{
                        my: '2rem',
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#5C4D6B' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            mt: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Controller
                            name="user"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Email address is required.',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(\.[a-zA-Z]{2,})?$/,
                                    message: 'Enter a valid email address.',
                                },
                            }}
                            style={{ padding: '12.5px 10px' }}
                            render={({ field }) => (
                                <div>
                                    <TextField
                                        {...field}
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        error={errors.user ? true : false}
                                        sx={{ width:350}}
                                        InputLabelProps={{ style: { color: '#5E2B96' } }}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="user"
                                        render={({ message }) => (
                                            <Alert variant='filled' severity="error" sx={{p:'4px 16px', fontSize: '0.84rem', opacity: 0.94}}>{message}</Alert>
                                        )}
                                    />
                                </div>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Password is required.',
                                minLength: {
                                    value: 5,
                                    message: 'Password must be at least 5 characters.',
                                },
                            }}
                            style={{ padding: '12.5px 10px', marginTop: 15, backgroundColor: 'blue' }}
                            render={({ field }) => (
                                <div style={{ marginTop: '1.5rem'}}>
                                    <TextField
                                        {...field}
                                        type="password"
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        error={errors.password ? true : false}
                                        sx={{ width:350}}
                                        InputLabelProps={{ style: { color: '#5E2B96' } }}
                                        className='inputForm'
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="password"
                                        render={({ message }) => (
                                            <Alert variant='filled' severity="error" sx={{p:'4px 16px', fontSize: '0.84rem', opacity: 0.94}}>{message}</Alert>
                                        )}
                                    />
                                </div>
                            )}
                        />
                        <DefaultButton name="Sign In" />
                    </Box>
                    <Grid container display='flex' justifyContent="center">
                        <Grid item>
                            <Link to={'/register/'} style={{cursor: 'pointer'}}>{`Don't have an account? Sign Up`}</Link>
                        </Grid>
                    </Grid>
                    <CopyrigthLogin sx={{ mt: 5 }} />
                </Box>
            </Grid>
        </Grid>
    );
}

export default Login