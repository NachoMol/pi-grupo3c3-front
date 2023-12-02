import React from 'react'
import { IconButton, Card, CardActionArea, CardMedia, Typography, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCarStates } from '../context/Context';
import { useContextGlobal } from '../context/Context';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { URL } from '../config/config';

const RenderCars = ({ car }) => {
    //  const [cars, setCars] = useState([]);
    const { favorites, dispatchFavorites } = useCarStates();
    const { userData } = useContextGlobal();
    const [isFavorite, setIsFavorite] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        setIsFavorite(favorites.fav.some(favCar => favCar.id === car.id));
    }, [favorites, car.id]);

    const handleFavoriteClick = (event) => {
        event.preventDefault();

        const authData = JSON.parse(localStorage.getItem('auth'));
        console.log(authData)
        if (!authData) {
            setMessage('Permission denied, you must log in to add favorites.');
            setOpen(true);
            setTimeout(() => {
                navigate('/register');
            }, 6000); // Espera 6 segundos antes de redirigir
            return;
        }
        if (isFavorite) {
            dispatchFavorites({ type: 'REMOVE_FAVORITE', payload: car.id });
            fetch(`${URL}/favorites/${userData.user.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const favorite = data.find(fav => fav.product_id === car.id);
                    if (favorite) {
                        fetch(`${URL}/favorites/delete/${favorite.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            dispatchFavorites({ type: 'ADD_FAVORITE', payload: car });
            fetch(`${URL}/favorites/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userData.user.id, product_id: car.id })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };
    return (
        <>
        <Snackbar
             sx={{ height: "100%" }}
             open={open}
             autoHideDuration={5000}
             onClose={() => setOpen(false)}
             message={message}
             anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
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
                    {isFavorite ? (
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
        </>
    );

}

export default RenderCars