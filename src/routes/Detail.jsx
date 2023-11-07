import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importa ThemeProvider y createTheme
import {Container} from '@mui/material' 
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CarGallery from '../components/CarGallery';
import '../styless/App.css';
import '../styless/Detail.css';
import axios from 'axios';
import Feature from './Feature';

const theme = createTheme(); // Configura el tema de Material-UI

const Detail = () => {

  const[car, setCar] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams()


  const [loading, setLoading] = useState(true);

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
          <CarGallery />
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
              Location: {car.location_id}
            </Typography>

            {/* Sección de detalles */}
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Specifications
            </Typography>
            <Typography variant="body1">
              <Feature />
              {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula...</p> */}
            </Typography>

            {/* Botón de reserva */}
            <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
              <Button variant="contained" onClick={() => alert('Make a Reservation')} sx={{ mt: 3, mb: 2, bgcolor: '#302253', '&:hover': { bgcolor: '#5e2b96' } }}>
                Make a Reservation
              </Button>
            </Grid>
          </Container>
        </div>
      </div>
      
    </ThemeProvider>
  );
}

export default Detail;
