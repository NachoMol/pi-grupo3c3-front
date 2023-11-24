import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
  FormLabel,
  Typography,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import '../styless/InsertVehicle.css';
import { useContextGlobal } from '../context/Context';

const InsertVehicle = () => {
  const [vehicle, setVehicle] = useState({
    name: '',
    price: '',
    category: { id: '' },
    city: { id: '' },
    details: [],
  });

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [details, setDetails] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [images, setImages] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="form-container">
        <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
          This component is not available on mobile devices.
        </Typography>
      </div>
    );
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;

    if (categoryId) {
      setVehicle({ ...vehicle, category: { id: categoryId } });
      console.log('Selected Category ID:', categoryId);
    } else {
      console.log('Invalid Category ID. Value:', categoryId);
    }
  };

  const handleCitiesChange = (event) => {
    const cityId = event.target.value;

    if (cityId) {
      setVehicle({ ...vehicle, city: { id: cityId } });
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
    console.log('Images: ', images);
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    console.log('Files:', files);
    setImages(files);
  };

  const handleSubmit = async (event) => {
    // Verificar si el usuario conectado es un administrador
    const authData = JSON.parse(localStorage.getItem('auth'));
    const isAdmin = authData.isAdmin === true;

    if (!isAdmin) {
      // Si el usuario no es un administrador, mostrar un mensaje o realizar alguna acción
      console.log('Permission denied. Only admins can add details.');
      return;
    }
    event.preventDefault();
    setLoading(true);

    try {
      const selectedCategoryId = vehicle.category.id;
      const selectedCityId = vehicle.city.id;

      const formData = new FormData();

      for (let i = 0; i < images.length; i++) {
        formData.append('files', images[i]);
      }

      formData.append('product', JSON.stringify({
        name: vehicle.name,
        price: vehicle.price,
        category: { id: selectedCategoryId },
        city: { id: selectedCityId },
      }));

      const productResponse = await axios.post('http://localhost:8080/products/add', formData);

      const vehicleID = productResponse.data.id;
      console.log('Product response:', productResponse);

      const selectedDetailsAsNumbers = selectedDetails.map(Number);

      await axios.post(`http://localhost:8080/products/${vehicleID}/add-details`, selectedDetailsAsNumbers, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setSelectedDetails([]);
      setImages([]);
      setVehicle({
        name: '',
        price: '',
        category: { id: '' },
        city: { id: '' },
        details: [],
      });

      setSuccessMessage('Product signed up successfully');
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log('Error response:', error);
        setError('This name already exists');
      } else {
        setError('Error al enviar los datos. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="form-container">
      <h2>Register Vehicle</h2>
      <div className="form-content">
        <form onSubmit={handleSubmit}>
          <label className="label">Name:</label>
          <input
            className="input-text"
            type="text"
            name="name"
            value={vehicle.name}
            onChange={handleInputChange}
            required
          />

          <label className="label">Price:</label>
          <input
            className="input-number"
            type="number"
            name="price"
            value={vehicle.price}
            onChange={handleInputChange}
            required
          />

          <div className="category-label">
            <FormControl component="fieldset" className="category-label">
              <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
              <RadioGroup
                value={vehicle.category.id}
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
            </FormControl>
          </div>

          <div className="city-label">
            <FormControl component="fieldset" className="city-label">
              <FormLabel id="demo-radio-buttons-group-label">City</FormLabel>
              <RadioGroup
                value={vehicle.city.id}
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
            <FormLabel>Details</FormLabel>
            <FormGroup>
              {details.map((detail) => (
                <FormControlLabel
                  key={detail.id}
                  control={
                    <Checkbox
                      onChange={handleDetailsChange}
                      name={detail.id.toString()}
                      color="primary"
                    />
                  }
                  label={detail.name}
                />
              ))}
            </FormGroup>
          </FormControl>

          <div className="button-container">
            <input type="file" accept="image/*" onChange={handleImageChange} multiple />
            {error && <p className="error-message">{error}</p>}
            <Button className="button" type="submit" variant="contained" sx={{ marginTop: 3 }}>
              Submit
            </Button>
          </div>
        </form>
        {loading && <p>Loading...</p>}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default InsertVehicle;