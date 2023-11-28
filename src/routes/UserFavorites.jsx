import React from 'react';
import { useCarStates, useContextGlobal } from '../context/Context';
import RenderCars from '../components/RenderCars'; // Asegúrate de usar la ruta correcta a tu archivo RenderCars
import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { types } from '../types/types';

const UserFavorites = () => {
    const { favorites, dispatchFavorites } = useCarStates();
    const { userData } = useContextGlobal();

    const fetchFavorites = () => {
        return fetch(`http://localhost:8080/favorites/${userData.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                dispatchFavorites({ type: types.LOAD_FAVORITES, payload: data });
                return data
            })
            .catch((error) => {
                console.error('Error:', error);
                return[]
            });
    };

    useEffect(() => {
        fetchFavorites().then(favorites => {
            const productPromises = favorites.map(favorite =>
                fetch(`http://localhost:8080/products/${favorite.product_id}`)
                    .then(response => response.json())
            );
    
            Promise.all(productPromises)
                .then(products => {
                    dispatchFavorites({ type: types.LOAD_FAVORITES, payload: products });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    }, []);


    return (
        <div>
            <h2>Your Favorites</h2>
            <Grid container spacing={2} sx={{ mt: '1rem' }}>
                {favorites.fav.map((car, index) => (
                    <Grid item key={index} xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: 'Flex', justifyContent: 'center', paddingRight: '16px', marginBottom: '100px' }}>

                        <RenderCars car={car} key={car.id} />

                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default UserFavorites;



