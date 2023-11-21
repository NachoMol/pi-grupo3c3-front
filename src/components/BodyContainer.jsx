import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Box, TextField, IconButton, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CategoryList from '../routes/CategoryList';
import RenderCars from './RenderCars';

const BodyContainer = () => {

    const [car, setCar] = useState([]);
    const size = 10; // 10 productos


    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/random?size=${size}`);
                setCar(response.data); // los productos están en la propiedad 'data'           
            } catch (error) {
                console.error("Error fetching cars", error);
            }
        };
        fetchCars();
    }, []); // se vuelve a ejecutar cuando cambian 'page' o 'size'

    console.log('initialArray', car);

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
                {car.map((car, index) => (
                    <Grid item key={index} xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: 'Flex', justifyContent: 'center', paddingRight: '16px' }}>
                       
                       <RenderCars car={car} key={car.id}/>

                    </Grid>
                ))}
            </Grid>

        </Container >

    );
};

export default BodyContainer;