
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Container, IconButton, Divider, Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styless/App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { shuffleArray } from '../helpers/shuffleArray';

const car = [
    {
        id: 1,
        marca: "Carro 1",
        modelo: "Chevrolet Cruze II 1.4 LTZ 153CV Hatchback 2016",
        año: 2022,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 2,
        marca: "Carro 2",
        modelo: "Modelo 2",
        año: 2021,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 3,
        marca: "Carro 3",
        modelo: "Modelo 3",
        año: 2020,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 4,
        marca: "Carro 4",
        modelo: "Modelo 4",
        año: 2022,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 5,
        marca: "Carro 5",
        modelo: "Modelo 5",
        año: 2021,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 6,
        marca: "Carro 6",
        modelo: "Modelo 6",
        año: 2021,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 7,
        marca: "Carro 7",
        modelo: "Modelo 7",
        año: 2022,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 8,
        marca: "Carro 8",
        modelo: "Modelo 8",
        año: 2020,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 9,
        marca: "Carro 9",
        modelo: "Modelo 9",
        año: 2021,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 10,
        marca: "Carro 10",
        modelo: "Modelo 10",
        año: 2022,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 11,
        marca: "Carro 11",
        modelo: "Modelo 11",
        año: 2022,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 10,
        marca: "Carro 12",
        modelo: "Modelo 12",
        año: 2022,
        imagenURL: "https://via.placeholder.com/300"
    },
    {
        id: 13,
        marca: "Carro 13",
        modelo: "Modelo 13",
        año: 2022,
        imagenURL: "https://via.placeholder.com/300"
    }
];

const BodyContainer = () => {
    const [ramdomArray, setRamdonArray] = useState([]);

    useEffect(() => {
        setRamdonArray(shuffleArray(car));
    }, [])

    console.log('initialArray', car);
    console.table('ramdomArray', ramdomArray);

    return (
        <Container disableGutters maxWidth='1980px' sx={{ background: '#D9D9D9;' }} >
            <Box sx={{ minHeight: 107, background: '#000' }} />
            <TextField
                id="outlined-search"
                label="Search"
                type="search"
                InputProps={{
                    endAdornment: (
                        <>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </>
                    ),
                }}
                sx={{ width: '51vw', minWidth: 350, mt: '1.5rem' }}
            />
            <Grid container spacing={2} sx={{ mt: '1rem' }}>
                {ramdomArray.map((car, index) => (
                    <Grid item key={index} xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: 'Flex', justifyContent: 'center', paddingRight: '16px' }}>
                        <Card sx={{ maxWidth: 350, background: 'transparent', minWidth: 349 }}>
                            <CardActionArea sx={{ cursor: 'default' }}>
                                <CardMedia
                                    component="img"
                                    height="149"
                                    image={car.imagenURL}
                                    alt={car.modelo}
                                />
                                <CardContent sx={{ background: '#FFF', border: '3px solid #000', margin: '11px 0 4px 0', borderRadius: '5px' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {car.modelo}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Link to={'/detail/'} sx={{ textDecoration: 'none' }}>
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
                                        Ver mas
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            <div className="container">
                <div className="search-section">
                    <h2>Search</h2>
                </div>
                <div className="categories-section">
                    <h2>Categories</h2>
                </div>
                <div className="recommendations-section">
                    <h2>Recomendations</h2>
                </div>                
                <Link to={'/admin'}>
                    <p>Admin</p>
                </Link>
            </div>
        </Container >

    );
};

export default BodyContainer;