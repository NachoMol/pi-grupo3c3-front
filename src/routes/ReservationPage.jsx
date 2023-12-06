import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField, Box, Divider, Grid, Container, Button } from '@mui/material';
import { useContextGlobal, useCarStates } from '../context/Context';
import ProductPolicies from './ProductPolicies';
import CarGallery from '../components/CarGallery';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../styless/Reservation.css';

const ReservationPage = ({ selectedDates }) => {
    const params = useParams();
    const { id } = params;

    const { userData } = useContextGlobal();
    const { dispatchCars } = useCarStates();

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
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h2 style={{ textAlign: 'center' }}>Reservation Details</h2>
                </Grid>
                <Grid container spacing={2} justifyContent="center">
                    {/* Imagenes */}
                    <Grid item xs={12} sm={6}>
                        <CarGallery productImages={product.images} productId={product.id} />
                    </Grid>
                {/* Calendario */}
                
                <div className="Calendario" style={{ padding: '10px', margin: '50px auto', maxWidth: '500px', marginLeft: '85px'}}>
                    <h3>Checkin/Checkout</h3>
                    <DatePicker
                        selectsRange
                        inline
                        monthsShown={window.innerWidth > 1261 ? 2 : 2}
                        //highlightDates={highlightDates}
                        style={{ width: '50%', backgroundColor: 'transparent' }}
                    />
                    <Grid container justifyContent="center" style={{ width: '100%' }}>
                        <Button variant="contained" onClick={confirmReservation} sx={{ mt: 1, mb: 2, bgcolor: '#302253', '&:hover': { bgcolor: '#5e2b96' } }}>
                            Confirm Reservation                    
                        </Button>
                    </Grid>
                </div>

                
                    
                </Grid>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    {/*Formulario*/}
                    <form>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField label="Name" value={userData.user.name} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField label="Lastname" value={userData.user.lastname} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField label="Email" value={userData.user.email} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField label="Product Name" value={product.name} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField label="Product Price" value={product.price} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField label="Category" value={product.category.name} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField label="Location" value={product.city.city} InputProps={{ readOnly: true }} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    label="Check-in"
                                    value={selectedDates.startDate ? selectedDates.startDate.toDateString() : ''}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    label="Check-out"
                                    value={selectedDates.endDate ? selectedDates.endDate.toDateString() : ''}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </form>
                </div>
                
                <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} alignItems="center">
                    <Divider orientation="horizontal" flexItem variant='inset' />
                    <ProductPolicies />
                    <Divider orientation="horizontal" flexItem variant='inset' />
                </Box>
            </Grid>
        </Container>
    );
};

export default ReservationPage;