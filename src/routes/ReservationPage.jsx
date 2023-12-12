import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Box,
    Paper,
    Grid,
    Typography,
    Container,
    Button,
} from '@mui/material';
import {
    useContextGlobal,
    useCarStates,
} from '../context/Context';
import ProductPolicies from './ProductPolicies';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../styless/Detail.css';
import '../styless/ReservationPage.css';
import '../styless/CarGallery.css';
import Swal from 'sweetalert2';
import { URL } from '../config/config';

const ReservationPage = ({ selectedDates, onDateChange }) => {
    const params = useParams();
    const { id } = params;
    const { userData } = useContextGlobal();
    const { cars, dispatchCars } = useCarStates();
    const [product, setProduct] = useState(null);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const navigate = useNavigate();

    const getNumberOfDays = () => {
        if (selectedDates.startDate && selectedDates.endDate) {
            const diffInTime = selectedDates.endDate.getTime() - selectedDates.startDate.getTime();
            const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
            return Math.ceil(diffInDays);
        }
        return 1;
    };

    const fetchProduct = async () => {
        const response = await axios.get(`${URL}/products/${params.id}`);
        return response.data;
    };

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
            checkin: selectedDates.startDate,
            checkout: selectedDates.endDate,
            total_price: product.price * getNumberOfDays(),
        };

        try {
            const response = await axios.post(`${URL}/reservations/create`, reservationDTO);
            console.log('Reserva creada:', response.data);
            // Alerta de éxito con SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Reservation Successful',
                text: 'Your reservation has been confirmed! You will recive further information via email.',
            });
            // Aquí puedes realizar más acciones después del éxito si es necesario
            // Redirige a /reservation-list después de la reserva exitosa
            navigate('/reservation-list');
        } catch (error) {
            console.error('Error:', error);
            // Alerta de error con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Try again later.',
            });
        }
    };

    const getDatesBetween = (start, end) => {
        const dateArray = [];
        let currentDate = new Date(start);

        while (currentDate <= end) {
            dateArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateArray;
    };

    const { startDate, endDate } = selectedDates;
    const datesToHighlight = getDatesBetween(startDate, endDate);

    return (
        <Container maxWidth={false} sx={{ width: '100%', paddingRight: '0px', paddingLeft: '0px' }}>
            <Grid container spacing={2} sx={{ paddingTop: '0', marginTop: '0' }} >
                <header className='detail_header'>
                    <Link to={`/detail/${params.id}`}>
                        <img style={{ filter: 'invert(1)', width: '40px', height: 'auto', padding: '10px 5px 10px 30px' }} src="https://www.iconpacks.net/icons/3/free-icon-left-arrow-7252.png" alt="" />
                    </Link>
                    <h2 style={{ flex: '1', color: 'white' }}>Reservation Details</h2>
                </header>
                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: "space-evenly", paddingRight: '0px', paddingLeft: '0px', margin: '0px', width: '100%' }}>
                    {/* Imagenes */}
                    <div className='detail-div'>
                        <Grid item xs={12} sm={6}>
                            <img
                                className="mainProductImage"
                                src={firstProductImages.length > 0 ? firstProductImages[0].url : ''}
                                alt="Product"
                                style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', marginBottom: '30px', borderRadius: '30px' }}
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
                            highlightDates={datesToHighlight.map(date => new Date(date))}
                            selected={startDate}
                            onChange={(dates) => onDateChange(dates)}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </div>
                </Grid>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '100px', marginBottom: '20px', borderRadius: '5px', justifyContent: 'center', alignItems: 'center', height: 'auto', backgroundColor: '#d9d9d9', width: '100%' }}>
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
                                <TextField label="Product Price" value={`$${product.price * getNumberOfDays()}`} InputProps={{ readOnly: true }} fullWidth />
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
                            <Button variant="contained" onClick={confirmReservation} sx={{ mt: 1, mb: 2, bgcolor: '#302253', marginTop: '30px', '&:hover': { bgcolor: '#5e2b96' }, padding: '10px', fontFamily: 'Quicksand', fontWeight:'600' }}>
                                Confirm Reservation
                            </Button>
                        </Grid>

                    </form>
                </div>
                <Box component={Paper} elevation={3} p={3} mt={isSmallScreen ? 2 : 4} sx={{ marginTop: '0' }}>
                    <Typography variant="h6" style={{ marginBottom: '20px', borderBottom: '2px solid #302253', fontSize: '28px', fontFamily: 'Quicksand', fontWeight: '800' }}>
                        Product Policies
                    </Typography>
                    <ProductPolicies />
                </Box>

            </Grid>
        </Container>
    );
};

export default ReservationPage;