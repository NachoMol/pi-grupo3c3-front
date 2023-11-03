import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CategoryList from './CategoryList';
import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import '../styless/InsertVehicle.css'

const InsertVehicle = () => {
    const [vehicle, setVehicle] = useState({
        name: '',
        price: '',
        category: '',
      });

      const [categories, setCategories] = useState([])

      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get('http://localhost:8080/categories')
            setCategories(response.data)
          } catch (error) {
            console.error("Error fetching categories", error)
          }
        }
        fetchCategories()
      },[])
    
      const [error, setError] = useState('');
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVehicle({ ...vehicle, [name]: value });
      };
    
      const url = 'http://localhost:8080/';
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post(url + 'products/create', vehicle);
          // Si la solicitud se realiza con éxito, respuesta acá --> por definir el mensaje de success
    
          setVehicle({
            name: '',
            price: '',
            category: '',
            // Faltan imagenes y detalles.
          });
        } catch (error) {
          setError('Hubo un error al enviar los datos. Por favor, inténtalo de nuevo.');
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
                value={vehicle.category}
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