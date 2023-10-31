
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Container, IconButton, Divider, Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../styless/App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { shuffleArray } from '../helpers/shuffleArray';
import { useCarStates } from '../context/Context';

const car = [
    {
        id: 1,
        marca: "Peugeot",
        modelo: "3008",
        año: 2020,
        imagenURL: "https://images.coches.com/_vo_/fotos/usados/2023/10/23/c/24405926360767122-767122_1.JPG?p=cc_vo_high",
        precio: '$20.500.000'

    },
    {
        id: 2,
        marca: "Volkswagen",
        modelo: "Polo 1.6",
        año: 2020,
        imagenURL: "https://http2.mlstatic.com/D_NQ_NP_2X_763126-MLA72005410208_102023-F.webp",
        precio: '$24.000.000'
    },
    {
        id: 3,
        marca: "Toyota",
        modelo: "Corolla",
        año: 2020,
        imagenURL: "https://http2.mlstatic.com/D_NQ_NP_2X_763602-MLA72486253515_102023-F.webp",
        precio: '$26.000.000'
    },
    {
        id: 4,
        marca: "Nissan",
        modelo: "Kicks 1.6",
        año: 2021,
        imagenURL: "https://http2.mlstatic.com/D_NQ_NP_2X_827752-MLA71519788842_092023-F.webp",
        precio: '$38.000.000'
    },
    {
        id: 5,
        marca: "Toyota",
        modelo: "Corolla",
        año: 2022,
        imagenURL: "https://http2.mlstatic.com/D_NQ_NP_2X_626203-MLA72266204706_102023-F.webp",
        precio: '$49.000.000'
    },
    {
        id: 6,
        marca: "Toyota",
        modelo: "Hilux 2.8 Srx",
        año: 2021,
        imagenURL: "https://http2.mlstatic.com/D_NQ_NP_2X_861217-MLA71523331207_092023-F.webp",
        precio: '$40.000.000'
    },
    {
        id: 7,
        marca: "Toyota",
        modelo: "Hilux 2.8 Srv",
        año: 2021,
        imagenURL: "https://http2.mlstatic.com/D_NQ_NP_2X_886436-MLA71782239281_092023-F.webp",
        precio: '$37.000.000'
    },
    {
        id: 8,
        marca: "Nissan",
        modelo: "Note 1.6 Sense",
        año: 2019,
        imagenURL: "https://http2.mlstatic.com/D_NQ_NP_2X_800784-MLA72529678829_102023-F.webp",
        precio: '$29.000.000'
    },
    {
        id: 9,
        marca: "Chevrolet",
        modelo: "Onix 1.0 turbo",
        año: 2021,
        imagenURL: "https://http2.mlstatic.com/D_809852-MLA72478813147_102023-O.jpg",
        precio: '$32.000.000'
    },
    {
        id: 10,
        marca: "Chevrolet",
        modelo: "Onix 1.4",
        año: 2021,
        imagenURL: "https://http2.mlstatic.com/D_NQ_NP_2X_829487-MLA72160004323_102023-F.webp",
        precio: '$50.000.000'
    },
    {
        id: 11,
        marca: "Chevrolet",
        modelo: "Spin",
        año: 2020,
        imagenURL: "https://http2.mlstatic.com/D_NQ_NP_960326-MLA71908103486_092023-W.webp",
        precio: '$22.000.000'
    },
    {
        id: 12,
        marca: "Renault",
        modelo: "Stepway",
        año: 2021,
        imagenURL: "https://http2.mlstatic.com/D_NQ_NP_2X_920544-MLA72365752073_102023-F.webp",
        precio: '$24.000.000'
    },
    {
        id: 13,
        marca: "Renault",
        modelo: "Stepway",
        año: 2022,
        imagenURL: "https://http2.mlstatic.com/D_NQ_NP_2X_849940-MLA72104822759_102023-F.webp",
        precio: '$30.000.000'
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
            {/* <Box sx={{ minHeight: 107, background: '#000' }} /> */}
            <Box sx={{ minHeight: 7, background: '#000' }} />
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
                        <Link to={'/detail/'} style={{ textDecoration: 'none' }}>
                            <Card sx={{ maxWidth: 350, background: 'transparent', minWidth: 349 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="149"
                                        image={car.imagenURL}
                                        alt={car.modelo}
                                    />
                                    <CardContent sx={{ background: '#FFF', border: '3px solid #000', margin: '11px 0 4px 0', borderRadius: '5px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'normal' }}>
                                            {car.modelo}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {car.precio}
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
                                        Ver mas
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