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

  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);

    // Agregar las nuevas imágenes al estado
    setCar({ ...car, images: [...car.images, ...selectedImages.map(image => ({ url: URL.createObjectURL(image) }))] });
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${params.id}`);
        const carData = response.data;

        if (carData.images && carData.images.length > 0) {
          // Si hay imágenes, establecerlas en el estado del vehículo
          setCar({ ...carData, images: carData.images.map(image => ({ url: image })) });
        } else {
          // Si no hay imágenes, simplemente establecer el vehículo
          setCar(carData);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching car', error);
        setLoading(false);
      }
    };

    fetchCar();
  }, [params.id]);

  const handleImageRemove = (index) => {
    const updatedImages = [...car.images];
    updatedImages.splice(index, 1);
    setCar({ ...car, images: updatedImages });
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${params.id}`);
        setCar(response.data);
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
        const categoriesResponse = await axios.get('http://localhost:8080/categories');
        const detailsResponse = await axios.get('http://localhost:8080/details');
        const citiesResponse = await axios.get('http://localhost:8080/cities');
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

  const detailObject = details.find((detail) => detail.id.toString() === name);

  if (detailObject) {
    if (checked) {
      updatedSelectedDetails.push(detailObject);
    } else {
      updatedSelectedDetails = updatedSelectedDetails.filter((detail) => detail.id !== detailObject.id);
    }

    setSelectedDetails(updatedSelectedDetails);
    console.log('Selected Details:', updatedSelectedDetails);
  }
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
  
      const updateData = {
        name: car.name,
        price: car.price,
        category: { id: selectedCategoryId },
        city: { id: selectedCityId },
        details: selectedDetails.map((detail) => detail.id),
      };
  
      const updateResponse = await axios.put(`http://localhost:8080/products/update/${car.id}`, updateData);
  
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
        <div className="city-label">
          <FormControl component="fieldset" className="city-label">
            <FormLabel id="demo-radio-buttons-group-label" sx={{ fontSize: '22px', display: 'flex', justifyContent: 'center' }}>
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
          <FormLabel sx={{ fontSize: '22px', marginBottom: '18px' }}>Images</FormLabel>
          <div className="image-container">
            {car.images &&
              car.images.map((image, index) => (
                <div key={index} className="image-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <img
                    src={image.url}
                    alt={`Image ${index}`}
                    style={{
                      width: '90px',
                      height: '60px',
                      objectFit: 'contain',
                      marginRight: '5px',
                      backgroundColor: 'rgba(217, 217, 217, 1)',
                    }}
                  />
                  <Button variant="outlined" size="small" onClick={() => handleImageRemove(index)}>
                    Remove
                  </Button>
                </div>
              ))}
          </div>
        </FormControl>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <label htmlFor="image-input" style={{ marginRight: '10px' }}>
            <input
              type="file"
              accept="image/*"
              multiple
              id="image-input"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <Button component="span" variant="contained" size="small">
              Add Image
            </Button>
          </label>
        </div>
        <Button className="button" type="submit" variant="contained" sx={{ marginTop: 3, fontSize: '16px' }} onClick={handleSubmit}>
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
