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

    // Llama a fetchFavorites 
    useEffect(() => {
        fetchFavorites();
    }, []);


    return (
        <div>
            <h2>Your Favorites</h2>
            <Grid container spacing={2} sx={{ mt: '1rem' }}>
                {favorites.fav.map((car, index) => (
                    <Grid item key={index} xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: 'Flex', justifyContent: 'center', paddingRight: '16px' }}>

                        <RenderCars car={car} key={car.id} />

                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default UserFavorites;



