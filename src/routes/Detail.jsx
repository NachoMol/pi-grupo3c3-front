import { Box, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importa ThemeProvider y createTheme
import { Container } from '@mui/material'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CarGallery from '../components/CarGallery';
import '../styless/App.css';
import '../styless/Detail.css';
import axios from 'axios';
import { useContextGlobal } from '../context/Context';
import ProductPolicies from './ProductPolicies';
import { useMediaQuery } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';


const theme = createTheme(); // Configura el tema de Material-UI

const Detail = () => {

  const [car, setCar] = useState([]);
  const [open, setOpen] = useState(false);
  const params = useParams()

  const { authUser } = useContextGlobal();
  const { isLogged } = authUser.auth;
  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:517px)', { noSsr: true });

  // Calendario

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };



  const handleReservation = () => {
    if (!isLogged) {
      setOpen(true);
    } else {
      navigate(`/reservation/product/${car.id}`);
      console.log('Listo para reservar!');
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDialogRedirect = () => {
    navigate('/login');
  }

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/' + params.id);
        setCar(response.data);
        setLoading(false); // Indicar que los datos se cargaron
      } catch (error) {
        console.error("Error fetching cars", error);
        setLoading(false); // También manejar errores
      }
    }
    fetchCar();
  }, [params.id]);

  console.log('initialArray', car);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!car) {
    return <p>No car data available.</p>;
  }

  return (
    <ThemeProvider theme={theme}> {/* Proporciona el tema de Material-UI */}
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
              <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginBottom: '10px' }}>
                <Typography component="h1" variant="h5" style={{ width: '100%', backgroundColor: '#9c80bd' }}>
                  Car Details
                  <hr style={{ backgroundColor: '#9c80bd', width: '100%', border: 'none', height: '1px' }} />
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
                <div className='containerDetailsLeftAndRight' style={{ display: 'flex', position: 'relative', justifyContent: 'space-evenly', width: '100%', height: 'auto' }}>
                  <div className='detailsLeft' style={{ float: 'left', width: '50%' }}>
                    <Typography variant="h6" sx={{ display: 'flex', paddingBottom: '8px', flexDirection: 'row', justifyContent: 'center', width: '100%', fontSize: '16px' }} >
                      Price: {car.price}
                    </Typography>
                    <Typography variant="h6" sx={{ display: 'flex', paddingBottom: '8px', flexDirection: 'row', justifyContent: 'center', width: '100%', fontSize: '16px' }}>
                      Category: {car.category?.name}
                    </Typography>
                    <Typography variant="h6" sx={{ display: 'flex', paddingBottom: '8px', flexDirection: 'row', justifyContent: 'center', width: '100%', fontSize: '16px' }}>
                      City: {car.city?.city}
                    </Typography>
                  </div>
                  <div className='detailsRight' style={{ float: 'left', width: '50%' }}>
                    {car.details.map((detail) => (
                      <div key={detail.id} style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', marginBottom: '8px', backgroundColor: '#FFF' }}>
                        <img src={detail.img_url} alt={detail.name} style={{ marginRight: '8px', width: '24px', height: '24px' }} />
                        <Typography variant="body1">{detail.name}</Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </div>
          {/* Calendario */}
          <div className="Calendario" style={{ padding: '10px', border: '1px solid #aeaeae', backgroundColor: '#aeaeae' }}>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              monthsShown={window.innerWidth > 1261 ? 2 : 2}
              style={{ width: '100%', backgroundColor: '#5e2b96' }}
            />
          </div>

          {/* Botón de reserva */}
          <Grid container justifyContent="center" style={{ width: '100%' }}>
            <Button variant="contained" onClick={handleReservation} sx={{ mt: 1, mb: 2, bgcolor: '#302253', '&:hover': { bgcolor: '#5e2b96' }, marginTop:'25px' }}>
              Start Reservation
            </Button>
          </Grid>

        </div>

        {/* Botón de reserva */}
        {/* <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
              <Button variant="contained" onClick={handleReservation} sx={{ mt: 3, mb: 2, bgcolor: '#302253', '&:hover': { bgcolor: '#5e2b96' } }}>
                Make a Reservation
              </Button>
            </Grid> */}

      </div>

      <div>
        {/* Sección de políticas del producto */}
        {/* <Box component={Paper} elevation={3} p={3} mt={4} sx={{paddingBottom:'100px'}}> */}
        <Box component={Paper} elevation={3} p={3} mt={4} >
          <Typography variant="h6" style={{ marginBottom: '20px', borderBottom: '2px solid #302253', fontSize: '30px' }}>
            Product Policies
          </Typography>
          <ProductPolicies />
        </Box>
      </div>
      {/* Modal para redirigir, si el usuario que reserva no esta logueado */}
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
            You must be logged in, to make a reservation. You want to sign in?
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