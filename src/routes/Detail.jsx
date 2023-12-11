import React, { useEffect, useState } from 'react';
import { Box, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';
import CarGallery from '../components/CarGallery';
import '../styless/App.css';
import '../styless/Detail.css';
import axios from 'axios';
import {URL} from '../config/config';
import { useContextGlobal } from '../context/Context';
import ProductPolicies from './ProductPolicies';
import { useMediaQuery } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';

const theme = createTheme();

const Detail = ({ setSelectedDates }) => {
  const [car, setCar] = useState([]);
  const [open, setOpen] = useState(false);
  const params = useParams();

  const { authUser } = useContextGlobal();
  const { isLogged } = authUser.auth;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:517px)', { noSsr: true });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);
  const [error, setError] = useState(null);

  const [totalPrice, setTotalPrice] = useState(null);


  const isDateDisabled = date => {
    if (date instanceof Date) {
      return reservedDates.some(disabledDate =>
        date.getTime() === new Date(disabledDate).getTime()
      );
    }
    return false;
  };

  const isRangeOverlapping = (start, end) => {
    // Crear un nuevo objeto Date a partir de 'start' y 'end' para no modificar las fechas originales
    let currentDate = new Date(start);
    const endDate = new Date(end);

    // Iterar sobre todas las fechas en el rango
    while (currentDate <= endDate) {
      // Si la fecha actual está en la lista de fechas reservadas, devolver verdadero
      if (isDateDisabled(currentDate)) {
        return true;
      }
      // Avanzar a la siguiente fecha
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // Si ninguna fecha en el rango está en la lista de fechas reservadas, devolver falso
    return false;
  };

  const onChange = dates => {
    const [start, end] = dates;
    // if (!start || (end && isDateDisabled(start)) || (end && isDateDisabled(end))) {
    if (isRangeOverlapping(start, end)) {
      setError('The selected dates overlap with an existing reservation. Please select another date range.');
      setStartDate(null);
      setEndDate(null);
    } else {
      setStartDate(start);
      setEndDate(end);
      setError(null);

      let daysDifference = 1; // Establecer un mínimo de 1 día
      if (end) {
        daysDifference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      }

      const productPrice = car.price;
      const calculatedTotalPrice = daysDifference * productPrice;

      setTotalPrice(calculatedTotalPrice);
      setSelectedDates({ startDate: start, endDate: end });
    }
  };


  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDialogRedirect = () => {
    navigate('/login');
  }

  useEffect(() => {
    // Recuperar valores del localStorage al cargar el componente
    const storedStartDate = localStorage.getItem('startDate');
    const storedEndDate = localStorage.getItem('endDate');
    const storedTotalPrice = localStorage.getItem('totalPrice');

    if (storedStartDate) {
      setStartDate(new Date(storedStartDate));
    }

    if (storedEndDate) {
      setEndDate(new Date(storedEndDate));
    }

    if (storedTotalPrice) {
      setTotalPrice(parseFloat(storedTotalPrice));
    }

    const fetchCar = async () => {
      try {
        const response = await axios.get(`${URL}/products/` + params.id);
        setCar(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars", error);
        setLoading(false);
      }
    };

    fetchCar();
  }, [params.id]);

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const response = await axios.get(`${URL}/reservations/current/` + params.id);
        const dates = response.data.flatMap(reservation => {
          const start = new Date(reservation.checkin + 'T00:00');
          const end = new Date(reservation.checkout + 'T00:00');
          const dateList = [];
          for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            dateList.push(new Date(dt));
          }
          return dateList;
        });
        console.log(dates);
        setReservedDates(dates);
        setError(null);
      } catch (error) {
        console.error("Error fetching reserved dates", error);
        setError('There was a problem getting available dates. Please try again later.');
      }
    }
    fetchReservedDates();
  }, [params.id]);

  const handleReservation = () => {
    if (!isLogged) {
      setOpen(true);
    } else {
      // Guardar valores en localStorage antes de navegar
      localStorage.setItem('startDate', startDate ? startDate.toISOString() : null);
      localStorage.setItem('endDate', endDate ? endDate.toISOString() : null);
      localStorage.setItem('totalPrice', totalPrice !== null ? totalPrice.toString() : null);
      navigate(`/reservation/product/${car.id}`);
      console.log('Listo para reservar!');

    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!car) {
    return <p>No car data available.</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <header className='detail_header'>
        <Link to={'/'} className='back-logo-container'>
          <img className='back-logo' src="https://www.iconpacks.net/icons/3/free-icon-left-arrow-7252.png" alt="" />
        </Link>
        <h2 className='detail_title'>{car.name}</h2>
      </header>

      <div className='detail-div'>
        <div className='ladoIzquiero' style={{ width: '40%' }}>
          <CarGallery productImages={car.images.map(image => image.url)} productId={params.id} />
        </div>

        <div className='ladoDerecho' style={{ display: 'flex', flexDirection: 'column', padding: '15px', width: '50%' }}>
          <div className='detail-information'>
            <Container component="main" Width="100%" disableGutters>
              <CssBaseline />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <Typography component="h1" variant="h5" style={{ width: '100%', backgroundColor: '#9c80bd', borderRadius: '5px', padding: '10px', fontWeight: '600' }}>
                  Car Details
                </Typography>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#fff'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <div className='detailsLeft' style={{ float: 'left', textAlign: 'center', alignContent: 'center' }}>
                      <Typography variant="h6" sx={{ display: 'flex', paddingBottom: '8px', flexDirection: 'row', justifyContent: 'start', width: '100%', fontFamily: 'Quicksand', fontWeight: '600' }}>
                        {/* Mostrar el precio total si está disponible, de lo contrario, mostrar el precio diario */}
                        Price: ${totalPrice !== null ? totalPrice : car.price}
                      </Typography>
                      <Typography variant="h6" sx={{ display: 'flex', paddingBottom: '8px', flexDirection: 'row', justifyContent: 'start', width: '100%', fontFamily: 'Quicksand', fontWeight: '600' }}>
                        Category: {car.category?.name}
                      </Typography>
                      <Typography variant="h6" sx={{ display: 'flex', paddingBottom: '8px', flexDirection: 'row', justifyContent: 'start', width: '100%', fontFamily: 'Quicksand', fontWeight: '600' }}>
                        City: {car.city?.city}
                      </Typography>
                    </div>
                  </div>
                  <div className='detailsRight' style={{ float: 'left', textAlign: 'center', marginLeft: '80px' }}>
                    {car.details.map((detail) => (
                      <div key={detail.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', backgroundColor: '#FFF' }}>
                        <img src={detail.img_url} alt={detail.name} style={{ marginRight: '8px', width: '24px', height: '24px' }} />
                        <Typography variant="body1" sx={{ fontFamily: 'Quicksand', fontWeight: '600' }}>{detail.name}</Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </div>

          <div className="Calendario" style={{ padding: '10px', border: '1px solid #aeaeae', backgroundColor: '#aeaeae', fontFamily: 'Quicksand', fontWeight: '600' }}>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              monthsShown={2}
              minDate={new Date()}
              highlightDates={reservedDates.map(date => ({ "react-datepicker__day--highlighted-custom": [date] }))}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <div>  <h4 className='validDate'>Select a valid date range to begin your reservation.</h4> </div>
          <Grid container justifyContent="center" style={{ width: '100%' }}>
            <Button
              variant="contained"
              onClick={handleReservation}
              sx={{
                mt: 1,
                mb: 2,
                bgcolor: '#302253',
                '&:hover': { bgcolor: '#5e2b96' },
                marginTop: '15px',
                '&.Mui-disabled': { color: '#fff', backgroundColor: '#302253' },
                fontFamily: 'Quicksand',
                fontWeight: '600'
              }}
              disabled={!startDate || !endDate} // Deshabilitar el botón si startDate o endDate es null
            >
              Start Reservation
            </Button>
          </Grid>
        </div>
      </div>

      <div>
        <Box component={Paper} elevation={3} p={3} mt={4} sx={{ marginTop: '0' }}>
          <Typography variant="h6" style={{ marginBottom: '20px', borderBottom: '2px solid #302253', fontSize: '28px', fontFamily: 'Quicksand', fontWeight: '800' }}>
            Product Policies
          </Typography>
          <ProductPolicies />
        </Box>
      </div>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You can't make a reservation!!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You must be logged in to make a reservation. Do you want to sign in?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button onClick={handleDialogRedirect} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default Detail;