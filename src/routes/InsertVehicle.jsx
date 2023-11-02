import axios from 'axios';
import React, { useState } from 'react'
import '../styless/InsertVehicle.css'

const InsertVehicle = () => {
    const [vehicle, setVehicle] = useState({
        modelid: '',
        price: '',
        category_id: '',
      });
    
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
            category_id: '',
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
                className="input-number"
                type="text"
                name="name" // Asegúrate de que el nombre sea correcto
                value={vehicle.name} // Asegúrate de que el valor coincida con el estado
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
    
              <label className="label">Category id:</label>
              {/* Cambiar esto a multi-select con mapeo de listado de categories*/}
              <input
                className="input-number"
                type="number"
                name="category_id"
                value={vehicle.category_id}
                onChange={handleInputChange}
                required
              />
    
              {error && <p className="error-message">{error}</p>}
    
              <button className="button" type="submit">Submit</button>
            </form>
          </div>
        </div>
      );
}

export default InsertVehicle