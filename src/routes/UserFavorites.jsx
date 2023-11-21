import React from 'react';
import { useCarStates } from '../context/Context';
import RenderCars from '../components/RenderCars'; // Asegúrate de usar la ruta correcta a tu archivo RenderCars
import { Box, Grid } from '@mui/material';

const UserFavorites = () => {
    const { favorites } = useCarStates(); // Aquí está la corrección

    return (
        <div>
        <h2>Your favorites</h2>
        <Grid container spacing={2}>
            {favorites.fav.map((cars, index) => (
                <Grid item xs={12} sm={6} key={cars.id}>
                    <Box display="flex" justifyContent="center">
                        <RenderCars cars={cars} />
                    </Box>
                </Grid>
            ))}
        </Grid>
    </div>
    );
};

export default UserFavorites;



