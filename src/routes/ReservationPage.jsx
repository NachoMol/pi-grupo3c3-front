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
import '../styless/ReservationPage.css';

const ReservationPage = () => {
    const params = useParams();
    const { id } = params;

    const { userData } = useContextGlobal();
    const { dispatchCars } = useCarStates();

    const [product, setProduct] = useState(null);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
          checkin: startDate, //
          checkout: endDate, //
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
                <h2 style={{ textAlign: 'center', paddingBottom:'10px' }}>Reservation Details</h2>
                </Grid>
                <Grid container spacing={2} sx={{display: 'flex', justifyContent:"space-between", alignItems:'start', margin:'0px'}}>
                    {/* Imagenes */}
                    <Grid item xs={12} sm={6} sx={{paddingTop:'0px !important', paddingRight: '60px' }}>
                        <CarGallery productImages={product.images} productId={product.id}/>
                    </Grid>
                {/* Calendario */}
                
                <div className="Calendario" style={{ padding: '0px 10px', border: '1px solid #aeaeae', backgroundColor: '#aeaeae', width: '45%'}}>
                        <h3 style={{ backgroundColor: 'rgb(156,128,189)', padding: '10px', borderRadius: '5px' }}>Checkin/Checkout</h3>
                    <DatePicker
                        /*selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}*/
                        selectsRange
                        inline
                        monthsShown={window.innerWidth > 1261 ? 2 : 2}
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