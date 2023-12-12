import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  CssBaseline,
  Typography,
  FormControl,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
  FormLabel,
  FormGroup,
  Input,
  InputAdornment,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useParams } from 'react-router-dom';
import { URL } from '../config/config';

const UpdateVehicle = () => {
  const [car, setCar] = useState({});
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [details, setDetails] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const params = useParams();
  const [images, setImages] = useState(car.images || []);

  const handleAddImage = async (event) => {
    const file = event.target.files[0];
  
    try {
      const formData = new FormData();
      formData.append('images', file);
  
      // Usa la URL correcta para la actualización de imágenes en el servidor
      const response = await axios.put(`${URL}/products/update/${car.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Actualiza las imágenes con la nueva URL
      setImages((prevImages) => [...prevImages, response.data.url]);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  const handleRemoveImage = (index) => {
    // Remueve la imagen del estado
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${URL}/products/${params.id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
  
        const carData = response.data;
        setCar(carData);
  
        // Modifica los detalles para que estén administrados por Hibernate
        const detailsResponse = await axios.get(`${URL}/details`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const detailsData = detailsResponse.data;
  
        // Obtener detalles actuales del vehículo y marcarlos
        const currentDetails = carData.details.map(detail => detail.id.toString());
        setSelectedDetails(currentDetails);
  
        // Verifica si hay imágenes y configura el estado
        const carImages = carData.images || [];
        setImages(carImages);
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car', error);
        setLoading(false);
      }
    };
  
    fetchCar();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(`${URL}/categories`);
        const detailsResponse = await axios.get(`${URL}/details`);
        const citiesResponse = await axios.get(`${URL}/cities`);
        setCategories(categoriesResponse.data);
        setDetails(detailsResponse.data);
        setCities(citiesResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!car) {
    return <p>No car data available.</p>;
  }

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;

    if (categoryId) {
      setCar({ ...car, category: { id: categoryId } });
      console.log('Selected Category ID:', categoryId);
    } else {
      console.log('Invalid Category ID. Value:', categoryId);
    }
  };

  const handleCitiesChange = (event) => {
    const cityId = event.target.value;

    if (cityId) {
      setCar({ ...car, city: { id: cityId } });
      console.log('Selected City ID:', cityId);
    } else {
      console.log('Invalid City ID. Value:', cityId);
    }
  };

  const handleDetailsChange = (event) => {
    const { name, checked } = event.target;

    let updatedSelectedDetails = [...selectedDetails];

    if (checked) {
      updatedSelectedDetails.push(name);
    } else {
      updatedSelectedDetails = updatedSelectedDetails.filter((detail) => detail !== name);
    }

    setSelectedDetails(updatedSelectedDetails);
    console.log('Selected Details:', updatedSelectedDetails);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setCar({ ...car, name: newName });
  };

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setCar({ ...car, price: newPrice });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const selectedCategoryId = car.category.id;
      const selectedCityId = car.city.id;
  
      // Mapea los detalles a objetos completos Detail
      const detailsToUpdate = selectedDetails.map((detailId) => {
        const detail = details.find((d) => d.id === parseInt(detailId, 10));
        return detail;
      });
  
      const updateData = {
        name: car.name,
        price: car.price,
        category: { id: selectedCategoryId },
        city: { id: selectedCityId },
        details: detailsToUpdate,
        images: images,  // Incluye las imágenes actualizadas
      };
  
      const updateResponse = await axios.put(`${URL}/products/update/${car.id}`, updateData);
  
      console.log('Product response:', updateResponse);
  
      setSuccessMessage('Product updated successfully');
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError('Unknown error');
      } else {
        setError('Error al enviar los datos. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4" gutterBottom sx={{ marginTop: 3 }}>
        Update Vehicle
      </Typography>
      <FormControl component="fieldset" sx={{ width: '500px', padding: 2, bgcolor: 'white', marginBottom: '90px' }}>
        <Typography variant="h6" sx={{ fontSize: '22px' }}>
          Name
        </Typography>
        <Input
          type="text"
          value={car.name}
          onChange={handleNameChange}
          sx={{ fontSize: '16px', marginBottom: '20px' }}
        />

        <Typography variant="h6" sx={{ fontSize: '22px' }}>
          Price
        </Typography>
        <Input
          type="number"
          value={car.price}
          onChange={handlePriceChange}
          endAdornment={<InputAdornment position="end">USD</InputAdornment>}
          sx={{ fontSize: '16px', marginBottom: '20px' }}
        />

        <FormLabel id="demo-radio-buttons-group-label" sx={{ display: 'flex', justifyContent: 'center', fontSize: '22px' }}>
          Category
        </FormLabel>
        <RadioGroup
          value={car.category.id}
          onChange={handleCategoryChange}
          aria-labelledby="demo-radio-buttons-group-label"
        >
          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              value={category.id}
              control={<Radio />}
              label={category.name}
            />
          ))}
        </RadioGroup>
        <div className="city-label" sx={{ width: '100%' }}>
          <FormControl component="fieldset" className="city-label" sx={{ width: '100%' }}>
            <FormLabel id="demo-radio-buttons-group-label" sx={{ fontSize: '22px', display: 'flex', justifyContent: 'center', marginLeft: '155px' }}>
              City
            </FormLabel>
            <RadioGroup
              value={car.city.id}
              onChange={handleCitiesChange}
              aria-labelledby="demo-radio-buttons-group-label"
            >
              {cities.map((city) => (
                <FormControlLabel
                  key={city.id}
                  value={city.id}
                  control={<Radio />}
                  label={city.city}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <FormControl component="fieldset" className="details-label">
          <FormLabel sx={{ fontSize: '22px' }}>Details</FormLabel>
          <FormGroup>
            {details.map((detail) => (
              <FormControlLabel
                key={detail.id}
                control={
                  <Checkbox
                    onChange={handleDetailsChange}
                    name={detail.id.toString()}
                    color="primary"
                    checked={selectedDetails.includes(detail.id.toString())}
                  />
                }
                label={detail.name}
                sx={{ fontSize: '12px' }}
              />
            ))}
          </FormGroup>
        </FormControl>
        <Button className="button" type="submit" variant="contained" sx={{ marginTop: 3, fontSize: '16px', backgroundColor:'#402253', '&:hover': { bgcolor: '#5e2b96' }, }} onClick={handleSubmit}>
          Update
        </Button>
        {loading && <p>Loading...</p>}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        {error && <p className="error-message">{error}</p>}
      </FormControl>
    </Container>
  );
};

export default UpdateVehicle;
