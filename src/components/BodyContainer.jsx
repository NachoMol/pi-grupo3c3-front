import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Box, TextField, IconButton, Divider, Card, CardActionArea, CardMedia, Typography, CardContent, CardActions, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import CategoryList from '../routes/CategoryList';

const BodyContainer = () => {

    const [cars, setCars] = useState([]);
    const size = 10; // 10 productos

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/random?size=${size}`);
                setCars(response.data); // los productos están en la propiedad 'data'           
            } catch (error) {
                console.error("Error fetching cars", error);
            }
        };
        fetchCars();
    }, []); // se vuelve a ejecutar cuando cambian 'page' o 'size'

    console.log('initialArray', cars);

    return (
        <Container disableGutters maxWidth='1980px' sx={{ background: '#D9D9D9;' }} >
            <Box />
            <TextField
                id="outlined-search"
                label="Search"
                type="search"
                InputProps={{
                    endAdornment: (
                        <>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton type="button" sx={{ p: '10px', zIndex: 0 }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </>
                    ),
                }}
                sx={{ width: '51vw', minWidth: 350, mt: '1.5rem' }}
            />
            <CategoryList />
            <Grid container spacing={2} sx={{ mt: '1rem' }}>
                {cars.map((cars, index) => (
                    <Grid item key={index} xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: 'Flex', justifyContent: 'center', paddingRight: '16px' }}>
                        <Link to={'/detail/' + cars.id} style={{ textDecoration: 'none' }}>
                            <Card sx={{ maxWidth: 350, background: 'transparent', minWidth: 349 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="149"
                                        image={cars.imagenURL}
                                        alt={"image " + cars.name}
                                    />
                                    <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'normal', fontSize: '20px', fontWeight: '800' }}>
                                        {cars.name}
                                    </Typography>
                                    <CardContent sx={{ background: '#FFF', border: '3px solid #000', margin: '11px 0 4px 0', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="body2" color="text.secondary">
                                            {cars.price}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ justifyContent: 'center' }}>
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
                                </CardActions>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>

        </Container >

    );
};

export default BodyContainer;