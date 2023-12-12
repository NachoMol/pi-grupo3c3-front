import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Container, Grid } from '@mui/material';
import RenderCars from './RenderCars';
import { useCarStates } from '../context/Context';
import FilterList from './_Home/FilterList';
import { URL } from '../config/config';

const BodyContainer = () => {
    // debugger;
    const size = 10; // 10 productos
    const [car, setCar] = useState([]);
    const { carFilter, filterLoading } = useCarStates();

    const { filter } = carFilter;
    const { filterLoadingProducts } = filterLoading;

    console.log('bodyCar', car)

    useEffect(() => {

        // Limpiar los valores de localStorage al cargar el componente
        localStorage.removeItem('startDate');
        localStorage.removeItem('endDate');
        localStorage.removeItem('totalPrice');

        const fetchCars = async () => {
            try {
                const response = await axios.get(`${URL}/products/random?size=${size}`);
                console.log('fecthInicialdelcar', response.data)
                setCar(response.data); // los productos están en la propiedad 'data'           
            } catch (error) {
                console.error("Error fetching cars", error);
            }
        };
        fetchCars();
    }, []); // se vuelve a ejecutar cuando cambian 'page' o 'size'

    useEffect(() => {
        // Aplicar el filtro y limpiar los valores de localStorage al aplicar el filtro
        setCar(filter);
        localStorage.removeItem('startDate');
        localStorage.removeItem('endDate');
        localStorage.removeItem('totalPrice');
        console.log('Bodyfilter', filter);
    }, [filter]);

    return (
        <Container sx={{ background: '#D9D9D9;', width: '100%' }} >
            <FilterList />
            
            <h2 style={{marginTop:'30px', paddingTop:'10px', paddingBottom: '10px', width: '100%', color:"#5e2b96"}}>Our Recommendations</h2>
            {filterLoadingProducts ? <CircularProgress sx={{ color: '#5C4D6B', mt: '2rem' }} /> : (
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