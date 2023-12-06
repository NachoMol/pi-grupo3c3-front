import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Box, Paper, Grid, Typography, Container, Button } from '@mui/material';
import { useContextGlobal, useCarStates } from '../context/Context';
import ProductPolicies from './ProductPolicies';
import CarGallery from '../components/CarGallery';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../styless/ReservationPage.css';
import '../styless/Detail.css';
import '../styless/CarGallery.css';

const ReservationPage = ({ selectedDates }) => {
    const params = useParams();
    const { id } = params;
    const { userData } = useContextGlobal();
    const { cars, dispatchCars } = useCarStates();

    const [product, setProduct] = useState(null);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    /*const highlightDates = [
        { "react-datepicker__day--highlighted-checkin": selectedDates.startDate },
        { "react-datepicker__day--highlighted-checkout": selectedDates.endDate },
      ];*/

    const fetchProduct = async () => {
        const response = await axios.get('http://localhost:8080/products/' + params.id);
        return response.data;
    };

    console.log('product', product);
    useEffect(() => {
        const fetchData = async () => {
            const productData = await fetchProduct(id);
            dispatchCars({ type: 'SET_PRODUCT', payload: productData });
            setProduct(productData);
        };

        fetchData();
    }, [id, dispatchCars]);

    if (!userData.user || !userData.user.email || !product) {
        return <div>Loading...</div>;
    }
    const firstProductImages = product.images || [];

    const confirmReservation = async () => {
        const reservationDTO = {
            product_id: product.id,
            user_id: userData.user.id,
            city_id: product.city.id,
            checkin: selectedDates.startDate, // Use the selected start date
            checkout: selectedDates.endDate, // Use the selected end date
        };

        try {
            const response = await axios.post('http://localhost:8080/reservations/create', reservationDTO);
            console.log('Reserva creada:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container maxWidth={false} sx={{ width: '100%', paddingRight: '0px', paddingLeft: '0px' }}>
            <Grid container spacing={2}  >
                <Grid item xs={12} sx={{ width: '100%', paddingLeft: '0px !important', paddingRight: '0px !important' }}>
                    <h2 style={{ textAlign: 'center', width: '100%', padding: '10px', backgroundColor: 'rgb(176,148,209)', paddingRight: '0px', paddingLeft: '0px' }}>Reservation Details</h2>
                </Grid>
                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: "space-evenly", paddingRight: '0px', paddingLeft: '0px', margin: '0px', width: '100%' }}>
                    {/* Imagenes */}
                    <div className='detail-div'>
                        <Grid item xs={12} sm={6} sx={{ paddingTop: '0px !important', paddingRight: '60px' }}>
                            {/* Aquí incluyes la galería de imágenes */}
                            <img
                                className="mainProductImage"
                                src={firstProductImages.length > 0 ? firstProductImages[0].url : ''}
                                alt="Product"
                                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                            />
                        </Grid>
                    </div>
                    {/* Calendario */}

                    <div className="Calendario" style={{ padding: '0px 10px', border: '1px solid #aeaeae', backgroundColor: '#aeaeae', width: '45%', minHeight: '400px' }}>
                        <h3 style={{ backgroundColor: 'rgb(156,128,189)', padding: '10px', borderRadius: '5px' }}>Checkin/Checkout</h3>
                        <DatePicker
                            selectsRange
                            inline
                            monthsShown={window.innerWidth > 1261 ? 2 : 2}
                            //highlightDates={highlightDates}
                            style={{ width: '50%', backgroundColor: 'transparent' }}
                        />
                        {/* <Grid container justifyContent="center" style={{ width: '100%' }}>
                        <Button variant="contained" onClick={confirmReservation} sx={{ mt: 1, mb: 2, bgcolor: '#302253', '&:hover': { bgcolor: '#5e2b96' } }}>
                            Confirm Reservation                    
                        </Button>
                    </Grid> */}
                    </div>



                </Grid>

                {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}> */}
                {/*Formulario*/}
                {/* <form>*/}

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '100px', borderRadius: '5px', justifyContent: 'center', alignItems: 'center', height: 'auto', backgroundColor: '#d9d9d9', width: '100%' }}>
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <h2 style={{ textAlign: 'center', padding: '10px', backgroundColor: 'rgb(176,148,209)' }}>Reservation Verification</h2>
                    </Grid>
                    {/*Formulario*/}
                    <form style={{ backgroundColor: '#fff', borderRadius: '5px', padding: '20px', width: '80%', boxShadow: '0px 0px 10px rgba(0,0,0,0.15)' }}>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={4} md={4}>
                                <TextField label="Name" value={userData.user.name} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <TextField label="Lastname" value={userData.user.lastname} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <TextField label="Email" value={userData.user.email} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <TextField label="Product Name" value={product.name} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <TextField label="Product Price" value={product.price} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <TextField label="Category" value={product.category.name} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <TextField label="Location" value={product.city.city} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <TextField
                                    label="Check-in"
                                    value={selectedDates.startDate ? selectedDates.startDate.toDateString() : ''}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <TextField
                                    label="Check-out"
                                    value={selectedDates.endDate ? selectedDates.endDate.toDateString() : ''}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center" style={{ width: '100%' }}>
                            <Button variant="contained" onClick={confirmReservation} sx={{ mt: 1, mb: 2, bgcolor: '#302253', marginTop: '30px', '&:hover': { bgcolor: '#5e2b96' }, padding: '10px' }}>
                                Confirm Reservation
                            </Button>
                        </Grid>

                    </form>
                </div>


                {/* <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} alignItems="center">
                    <Divider orientation="horizontal" flexItem variant='inset' />
                    <ProductPolicies />
                    <Divider orientation="horizontal" flexItem variant='inset' />
                </Box> */}

                <Box component={Paper} elevation={3} p={3} mt={15} >
                    <Typography variant="h6" style={{ marginBottom: '20px', borderBottom: '2px solid #302253' }}>
                        Product Policies
                    </Typography>
                    <ProductPolicies />
                </Box>

            </Grid>
        </Container>
    );
};

export default ReservationPage;