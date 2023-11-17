import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Select, MenuItem, InputLabel, FormControl, FormGroup, FormControlLabel, Button, Checkbox } from '@mui/material';
import '../styless/InsertVehicle.css'

const InsertVehicle = () => {
    const [vehicle, setVehicle] = useState({
        name: '',
        price: '',
        category: '',
        locations: [],
        details: []
      });

      const [categories, setCategories] = useState([])
      const [locations, setLocations] = useState([])
      const [details, setDetails] = useState([])
      const [selectedDetails, setSelectedDetails] = useState([])
      const [images, setImages] = useState([])

      useEffect(() => {
        const fetchData = async () => {
          try {
            const categoriesResponse = await axios.get('http://localhost:8080/categories');
            const locationsResponse = await axios.get('http://localhost:8080/locations');
            const detailsResponse = await axios.get('http://localhost:8080/details');
    
            setCategories(categoriesResponse.data);
            setLocations(locationsResponse.data);
            setDetails(detailsResponse.data);
          } catch (error) {
            console.error('Error fetching data', error);
          }
        }

        /*const fetchLocations = async () => {
          try {
            const response = await axios.get('http://localhost:8080/locations')
            setLocations(response.data)
          } catch (error) {
            console.error("Error fetching locations". error)
          }
        }

        fetchCategories()
        fetchLocations()*/

        fetchData()
      },[])
    
      const [error, setError] = useState('');
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        const categoryObject = name === 'category' ? categories.find(cat => cat.id === value) : null;
        setVehicle({ ...vehicle, [name]: categoryObject || value });
      };

      const handleLocationChange = (event) => {
        const {name, value} = event.target
        const locationObject = name === 'location' ? locations.find(loc => loc.id == value) : null;
        setVehicle({ ...vehicle, [name]: locationObject || value });
      }

      const handleDetailsChange = (event) => {
        const { value } = event.target;
        setSelectedDetails(value);
        setVehicle({ ...vehicle, details: value });
      };

      const handleImageChange = (event) => {
        const files = event.target.files
        setImages(files)
      }
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8080/products/create', {
            ...vehicle,
            details: vehicle.details.map(({ id }) => id),});
          // Si la solicitud se realiza con éxito, respuesta acá --> por definir el mensaje de success

          const vehicleID = response.data.id

          const formData = new FormData()
          for (let i = 0; i < images.length; i++) {
            formData.append('file', images[i]);
          }

          await axios.post('http://localhost:8080/media/upload', formData)
    
          setVehicle({
            name: '',
            price: '',
            category: '',
            location: '',
            details: []
            // Faltan imagenes y detalles.
          });
          setSelectedDetails([]);
          setImages([])
        } catch (error) {
          setError('Error to sending data, try now!');
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

            <FormControl className="input-text">
              <InputLabel htmlFor="location">Location:</InputLabel>
              <Select
                className="input-text"
                id="location"
                name="location"
                value={vehicle.location ? vehicle.location.id : ''}
                onChange={handleLocationChange}
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
            </FormControl>

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
}

export default InsertVehicle