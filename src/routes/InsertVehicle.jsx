import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import '../styless/InsertVehicle.css'

const InsertVehicle = () => {
    const [vehicle, setVehicle] = useState({
        name: '',
        price: '',
        category: '',
        locations: [],
      });

      const [categories, setCategories] = useState([])
      const [locations, setLocations] = useState([])
      const [selectedLocations, setSelectedLocations] = useState([])
      const [images, setImages] = useState([])

      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get('http://localhost:8080/categories')
            setCategories(response.data)
          } catch (error) {
            console.error("Error fetching categories", error)
          }
        }

        const fetchLocations = async () => {
          try {
            const response = await axios.get('http://localhost:8080/locations')
            setLocations(response.data)
          } catch (error) {
            console.error("Error fetching locations". error)
          }
        }

        fetchCategories()
        fetchLocations()
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

      const handleImageChange = (event) => {
        const files = event.target.files
        setImages(files)
      }
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8080/products/create', {
            ...vehicle,
            locations: vehicle.locations.map(({ id }) => id),});
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
            location: ''
            // Faltan imagenes y detalles.
          });
          setSelectedLocations([])
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