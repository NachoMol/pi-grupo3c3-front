import React from 'react';
import { useCarStates, useContextGlobal } from '../context/Context';
import RenderCars from '../components/RenderCars'; // Asegúrate de usar la ruta correcta a tu archivo RenderCars
import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';

const UserFavorites = () => {
    const { favorites, dispatchFavorites } = useCarStates();
    const { userData } = useContextGlobal();

    const fetchFavorites = () => {
        fetch(`http://localhost:8080/favorites/${userData.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatchFavorites({ type: 'LOAD_FAVORITES', payload: data });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // Llama a fetchFavorites en el componente UserFavorites
    useEffect(() => {
        fetchFavorites();
    }, []);


    return (
        <div>
            <h2>Your Favorites</h2>
            <Grid container spacing={2}>
                {favorites.fav.map((car, index) => (
                    <Grid item xs={12} sm={6} key={car.id}>
                        <Box display="flex" justifyContent="center">
                            <RenderCars key={car.id} car={car} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default UserFavorites;



