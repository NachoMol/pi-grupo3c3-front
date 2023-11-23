import React from 'react'
import { IconButton, Card, CardActionArea, CardMedia, Typography, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import { useCarStates } from '../context/Context';

const RenderCars = ({car}) => {
    //  const [cars, setCars] = useState([]);
    const { favorites, dispatchFavorites } = useCarStates();

    const addFavorite = (car) => {
        dispatchFavorites({ type: 'ADD_FAVORITE', payload: car });
    };

    const removeFavorite = (carId) => {
        dispatchFavorites({ type: 'REMOVE_FAVORITE', payload: carId });
    };
  return (
    <div>
      <Card sx={{ maxWidth: 350, background: 'transparent', minWidth: 349, position: 'relative' }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="149"
                                    image={car.images.length > 0 ? car.images[0].url : 'default_image_url'}
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
                                {favorites.fav.includes(car) ? (
                                    <IconButton onClick={() => removeFavorite(car.id)} sx={{ position: 'absolute', top: 0, right: 0 }}>
                                        ❤️
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => addFavorite(car)} sx={{ position: 'absolute', top: 0, right: 0 }}>
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
