import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Button,
  Checkbox,
} from '@mui/material';
import '../styless/InsertVehicle.css';

const InsertVehicle = () => {
  const [vehicle, setVehicle] = useState({
    name: '',
    price: '',
    category: '',
    location: '',
    details: [], // Aquí almacenaremos los detalles seleccionados
  });

  const [categories, setCategories] = useState([]);
  //const [locations, setLocations] = useState([]);
  const [details, setDetails] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:8080/categories');
        //const locationsResponse = await axios.get('http://localhost:8080/locations');
        const detailsResponse = await axios.get('http://localhost:8080/details');

        setCategories(categoriesResponse.data);
        //setLocations(locationsResponse.data);
        setDetails(detailsResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleDetailsChange = (event) => {
    const { value } = event.target;
  
    // Copia el estado actual de selectedDetails
    const updatedSelectedDetails = [...selectedDetails];
  
    // Si el detalle ya está en selectedDetails, quítalo; de lo contrario, agrégalo
    if (updatedSelectedDetails.includes(value)) {
      // El detalle ya está seleccionado, quítalo
      const index = updatedSelectedDetails.indexOf(value);
      updatedSelectedDetails.splice(index, 1);
    } else {
      // El detalle no está seleccionado, agrégalo
      updatedSelectedDetails.push(value);
    }
  
    setSelectedDetails(updatedSelectedDetails);
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Enviar la solicitud para crear el producto
      const productResponse = await axios.post('http://localhost:8080/products/create', {
        ...vehicle,
        details: [], // Vacío por ahora
      });

      const vehicleID = productResponse.data.id;

      if (selectedDetails.length > 0) {
  
      // Agregar detalles al producto
      await addDetailsToProduct(vehicleID, selectedDetails);
  
      }
      

      // Limpia los detalles seleccionados y otros campos
      setSelectedDetails([]);
      setImages([]);
  
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append('file', images[i]);
      }
  
      await axios.post('http://localhost:8080/media/upload', formData);
  
      setVehicle({
        name: '',
        price: '',
        category: '',
        //location: '',
        details: [],
      });
      setImages([]);
    } catch (error) {
      setError('Error al enviar los datos. Intente nuevamente.');
    }
  };
  
  // Función para agregar detalles al producto
  const addDetailsToProduct = async (productId, detailIds) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/products/${productId}/add-details`,
        detailIds
      );

      // Realiza las acciones necesarias después de agregar los detalles
      console.log('Detalles agregados con éxito', response.data);
    } catch (error) {
      console.error('Error al agregar detalles', error);
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

            <FormControl className="input-text">
              <InputLabel htmlFor="category">Category:</InputLabel>
              <Select
                className="input-text"
                id="category"
                name="category"
                value={vehicle.category ? vehicle.category.id : ''}
                onChange={handleInputChange}
                label="Category"
              >
                <MenuItem value="" disabled>
                  Select category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <FormControl className="input-text">
              <InputLabel htmlFor="location">Location:</InputLabel>
              <Select
                className="input-text"
                id="location"
                name="location"
                value={vehicle.location ? vehicle.location.id : ''}
                //onChange={handleLocationChange}
                label="Location"
              >
                <MenuItem value="" disabled>
                  Select location
                </MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.city},
                    {location.province},
                    {location.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <FormControl component="fieldset">
            <InputLabel>Details:</InputLabel>
            <FormGroup>
              {details.map((detail) => (
                <FormControlLabel
                  key={detail.id}
                  control={
                    <Checkbox
                      checked={selectedDetails.includes(detail.id)}
                      onChange={handleDetailsChange}
                      value={detail.id.toString()}
                    />
                  }
                  label={detail.name}
                />
              ))}
            </FormGroup>
          </FormControl>

            <input type="file" accept="image/*" onChange={handleImageChange} multiple />

            {error && <p className="error-message">{error}</p>}

            <Button className="button" type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InsertVehicle;