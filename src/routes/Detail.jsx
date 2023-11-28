import { Box, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importa ThemeProvider y createTheme
import { Container } from '@mui/material'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CarGallery from '../components/CarGallery';
import '../styless/App.css';
import '../styless/Detail.css';
import axios from 'axios';
import Feature from './Feature';
import { useContextGlobal } from '../context/Context';
import ProductPolicies from './ProductPolicies';

const theme = createTheme(); // Configura el tema de Material-UI

const Detail = () => {

  const [car, setCar] = useState([]);
  const [open, setOpen] = useState(false);
  const params = useParams()

  const { authUser } = useContextGlobal();
  const { isLogged } = authUser.auth;
  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);

  const handleReservation = () => {
    if (!isLogged) {
      setOpen(true);
    } else {
      alert('Make a Reservation')
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
        <div>
          <CarGallery productImages={car.images.map(image => image.url)} productId={params.id}/>
        </div>
        <div className='detail-information'>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Typography component="h1" variant="h5">
              Car Details
            </Typography>

            {/* Detalles del coche */}
            <Typography variant="subtitle1">
              Price: {car.price}
            </Typography>
            <Typography variant="subtitle1">
              Category: {car.category?.name}
            </Typography>
            <Typography variant="subtitle1">
              City: {car.city?.city}
            </Typography>

            {/* Sección de detalles */}
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Specifications
            </Typography>
            <Typography variant="body1">
              <Feature car={car} />
            </Typography>

            {/* Botón de reserva */}
            <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
              <Button variant="contained" onClick={handleReservation} sx={{ mt: 3, mb: 2, bgcolor: '#302253', '&:hover': { bgcolor: '#5e2b96' } }}>
                Make a Reservation
              </Button>
            </Grid>
          </Container>
        </div>
      </div>

      <div>
        {/* Sección de políticas del producto */}
        <Box component={Paper} elevation={3} p={3} mt={4} sx={{paddingBottom:'100px'}}>
            <Typography variant="h6" style={{ marginBottom: '20px', borderBottom: '2px solid #302253' }}>
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
