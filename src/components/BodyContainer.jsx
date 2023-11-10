
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Container, IconButton, Divider, Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styless/App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { shuffleArray } from '../helpers/shuffleArray';
import { useCarStates } from '../context/Context';
import CategoryList from '../routes/CategoryList';
import axios from 'axios';

const BodyContainer = () => {

    const[cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
        try{
            const response = await axios.get('http://localhost:8080/products/random')
            setCars(response.data)
        }catch(error){
            console.error("Error fetching cars", error)
            }
        }
        fetchCars();
    


    },[])

    console.log('initialArray', cars);

    return (
        <Container disableGutters maxWidth='1980px' sx={{ background: '#D9D9D9;'}} >
            {/* <Box sx={{ minHeight: 107, background: '#000' }} /> */}
            <Box/>
            <TextField
                id="outlined-search"
                label="Search"
                type="search"
                InputProps={{
                    endAdornment: (
                        <>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton type="button" sx={{ p: '10px', zIndex:0 }} aria-label="search">
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
                                        alt={cars.name}
                                    />
                                    <CardContent sx={{ background: '#FFF', border: '3px solid #000', margin: '11px 0 4px 0', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'normal' }}>
                                            {cars.modelo}
                                        </Typography>
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