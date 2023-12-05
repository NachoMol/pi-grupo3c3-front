import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Container, Grid } from '@mui/material';
import RenderCars from './RenderCars';
import { useCarStates } from '../context/Context';
import FilterList from './_Home/FilterList';

const BodyContainer = () => {
    // debugger;
    const size = 10; // 10 productos
    const [car, setCar] = useState([]);
    const { carFilter, filterLoading } = useCarStates();
    
    const { filter } = carFilter;
    const { filterLoadingProducts } = filterLoading;

    console.log('bodyCar', car)

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/random?size=${size}`);
                console.log('fecthInicialdelcar', response.data)
                setCar(response.data); // los productos están en la propiedad 'data'           
            } catch (error) {
                console.error("Error fetching cars", error);
            }
        };
        fetchCars();
    }, []); // se vuelve a ejecutar cuando cambian 'page' o 'size'

    useEffect(() => {
              setCar(filter)
          console.log('Bodyfilter', filter)
    }, [filter])

    return (
        <Container disableGutters maxWidth='1980px' sx={{ background: '#D9D9D9;'}} >
            <FilterList />
            {filterLoadingProducts ? <CircularProgress sx={{color: '#5C4D6B', mt: '2rem'}} />: (
                <Grid container spacing={2} sx={{ mt: '1rem' }}>
                    {car.length > 0 && car.map(car => (
                        <Grid item key={car.id} xs={12} sm={12} md={12} lg={6} xl={6} sx={{ display: 'Flex', justifyContent: 'center', marginBottom: '40px' }}>
                            <RenderCars car={car} loading={filterLoading} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container >
    );
};

export default BodyContainer;