import React from 'react'
import { IconButton, Card, CardActionArea, CardMedia, Typography, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import { useCarStates } from '../context/Context';
import { useContextGlobal } from '../context/Context';

const RenderCars = ({ car }) => {
    //  const [cars, setCars] = useState([]);
    const { favorites, dispatchFavorites } = useCarStates();
    const { userData } = useContextGlobal();

    // const addFavorite = (car) => {
    //     dispatchFavorites({ type: 'ADD_FAVORITE', payload: car });
    // };

    // const removeFavorite = (carId) => {
    //     dispatchFavorites({ type: 'REMOVE_FAVORITE', payload: carId });
    // };

    const handleFavoriteClick = () => {
        const isFavorite = favorites.fav.some(favCar => favCar.id === car.id);
        const method = isFavorite ? 'DELETE' : 'POST';
        const url = isFavorite ? `http://localhost:8080/favorites/delete/${car.id}` : 'http://localhost:8080/favorites/create';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userData.user.id, product_id: car.id }),
        })
            .then(response => response.json())
            .then(data => {
                const actionType = isFavorite ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE';
                dispatchFavorites({ type: actionType, payload: data });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <Card key={car.id} sx={{ maxWidth: 350, background: 'transparent', minWidth: 349, position: 'relative' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="149"
                        image={car.images && car.images.length > 0 ? car.images[0].url : 'default_image_url'}
                        alt={`image ${car.name}`}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'normal', fontSize: '20px', fontWeight: '800' }}>
                        {car.name}
                    </Typography>
                    <CardContent sx={{ background: '#FFF', border: '3px solid #000', margin: '11px 0 4px 0', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {car.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                {/* favorites */}

                <CardActions sx={{ justifyContent: 'center' }}>
                    {favorites.fav.some(favCar => favCar.id === car.id) ? (
                        <IconButton onClick={handleFavoriteClick} sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}>
                            ❤️
                        </IconButton>
                    ) : (
                        <IconButton onClick={handleFavoriteClick} sx={{ position: 'absolute', top: 0, right: 0, color: 'grey' }}>
                            🤍
                        </IconButton>
                    )}
                </CardActions>


                <CardActions sx={{ justifyContent: 'center' }}>
                    <Link to={'/detail/' + car.id} style={{ textDecoration: 'none' }}>
                        <Button
                            size="small"
                            sx={{
                                width: 124,
                                height: 33,
                                background: '#000',
                                color: '#FFF',
                                '&:hover': {
                                    background: '#898989'
                                }
                            }}>
                            Cars Details
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </div>
    )
}

export default RenderCars
