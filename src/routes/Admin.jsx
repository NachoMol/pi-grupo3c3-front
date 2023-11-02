import { Box, Container, CssBaseline, Typography, Grid, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const styles = {
    backgroundColor: '#D9D9D9',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
  };

  const [isMobile, setIsMobile] = useState(false);

  // Verificar el ancho de la pantalla y actualizar el estado
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // Agregar el evento de cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={styles}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {isMobile ? (
          <Typography variant="h6" style={{ display: 'block' }}>
            This component is not available on mobile devices.
          </Typography>
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome to the Explorer Administration panel.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Link to={'/admin/insert-vehicle'}>
                    <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#302253', '&:hover': { bgcolor: '#5e2b96' } }}>
                      Submit Vehicle
                    </Button>
                  </Link>
                </Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#302253','&:hover': {bgcolor: '#5e2b96',}, }}>
                  Update Vehicle
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#302253','&:hover': {bgcolor: '#5e2b96',}, }}>
                  Delete Vehicle
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#302253','&:hover': {bgcolor: '#5e2b96',}, }}>
                  List Vehicles
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#302253','&:hover': {bgcolor: '#5e2b96',}, }}>
                  List Users
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#302253','&:hover': {bgcolor: '#5e2b96',}, }}>
                  Create User
                </Button>
              </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Admin;