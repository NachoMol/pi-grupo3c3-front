import axios from 'axios';
import React, { useState } from 'react'

const InsertVehicle = () => {
    const [vehicle, setVehicle] = useState({
        modelid: '',
        price: '',
        stock: '',
      });
    
      const [error, setError] = useState('');
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVehicle({ ...vehicle, [name]: value });
      };
    
      const url = 'http://localhost:3306/';
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post(url + 'cars/create', vehicle);
          // Si la solicitud se realiza con éxito, respuesta acá --> por definir
    
          setVehicle({
            modelid: '',
            price: '',
            stock: '',
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
              <label className="label">Model Id:</label>
              <input
                className="input-number"
                type="number"
                name="model" // Asegúrate de que el nombre sea correcto
                value={vehicle.modelid} // Asegúrate de que el valor coincida con el estado
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
    
              <label className="label">Stock:</label>
              <input
                className="input-text"
                type="number"
                name="stock"
                value={vehicle.stock}
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