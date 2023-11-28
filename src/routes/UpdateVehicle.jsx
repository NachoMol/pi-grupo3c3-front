import { Button, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useContextGlobal } from '../context/Context';

const UpdateVehicle = () => {

    const[car, setCar] = useState([]);
    const [categories, setCategories] = useState([]);
    const params = useParams()
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCar = async () => {
          try {
            const response = await axios.get('http://localhost:8080/products/' + params.id);
            setCar(response.data);
            setLoading(false); // Indicar que los datos se cargaron
          } catch (error) {
            console.error("Error fetching cars", error);
            setLoading(false); // También manejar errores
          }
        }
        fetchCar();
      }, [params.id]);

      console.log('initialArray', car);

      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const categoriesResponse = await axios.get('http://localhost:8080/categories');
            setCategories(categoriesResponse.data);
        } catch (error) {
            console.error('Error fetching categories', error);
          }
        };
        fetchCategories();
    }, []);
    


if (loading) {
  return <p>Loading...</p>;
}

if (!car) {
  return <p>No car data available.</p>;
}

const handleCategoryChange = (event) => {
    const categoryId = event.target.value; // Obten el ID de la categoría seleccionada

    // if (!userData.user.admin) {
        //          console.error('Permission denied. Only admins make this change.');
        //          return;
        //        }

        // if (error) {
        //     return;
        // }
  
    // Encuentra la categoría correspondiente en la lista de categorías
    
  
    if (categoryId) {
      // Si se encuentra una categoría correspondiente, establece el objeto de categoría en el estado
      setCar({ ...car, category: { id: categoryId } }); // Establece el ID de la categoría en un objeto
      console.log('Categoría válida:', categoryId);
    } else {
      // Si el ID no es válido, puedes manejarlo aquí (por ejemplo, mostrar un mensaje de error)
      console.log('Categoría no válida. Valor no válido:', categoryId);
    }
  
    console.log('Selected Category ID:', categoryId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Indicar que la solicitud está en progreso
// if (!userData.user.admin) {
        //          console.error('Permission denied. Only admins make this change.');
        //          return;
        //        }

        // if (error) {
        //     return;
        // }

    try {
      const selectedCategoryId = car.category.id;
  
      // Enviar la solicitud para crear el producto
      const updateResponse = await axios.put('http://localhost:8080/products/update/' + car.id, {
        name: car.name,
        price: car.price,
        category: { id: selectedCategoryId },
        city: { id: car.id },
      });

      console.log("Product response: ", updateResponse )
  
      // Establecer el mensaje de éxito
      setSuccessMessage('Product updated successfully');
      setError(''); // Restablecer el mensaje de error
    } catch (error) {
      if (error.response && error.response.status === 500) {
      setError('Unknown error');
      }
      else setError('Error al enviar los datos. Intente nuevamente.');
    } finally {
      setLoading(false); // Indicar que la solicitud ha finalizado
    }
  };

  return (
    <Container>
    <CssBaseline />
    <Typography variant="h4" gutterBottom sx={{marginTop: 3}}>
    {car.name}
    </Typography>
    <FormControl component="fieldset" className="category-label" sx={{marginTop: 10, padding: 10 , bgcolor: 'white'}}>
            <FormLabel id="demo-radio-buttons-group-label" sx={{display: 'flex', justifyContent: 'center' , paddingBottom: 5, fontSize: 25}}>Category</FormLabel>
              <RadioGroup 
              value={car.category.id} onChange={handleCategoryChange} aria-labelledby="demo-radio-buttons-group-label">
                {categories.map((category) => (
                  <FormControlLabel
                    key={category.id}
                    value={category.id}
                    control={
                      <Radio/>
                    }
                    label={category.name}
                  />
                ))}
              </RadioGroup>
              <Button className="button" type="submit" variant="contained" sx={{marginTop: 3}} onClick={handleSubmit}>
            Update
          </Button>
          {loading && <p>Loading...</p>}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        </FormControl>
    </Container>
  )
}

export default UpdateVehicle