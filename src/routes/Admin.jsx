import React, { useState } from 'react';
import '../styless/Admin.css'

const Admin = () => {
  const [vehicle, setVehicle] = useState({
    name: '',
    brand: '',
    images: [],
    type: '',
    seats: '',
    price: '',
  });

  const [vehiclesList, setVehiclesList] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleImageChange = (event) => {
    const imageUrls = event.target.value.split('\n');
    setVehicle({ ...vehicle, images: imageUrls });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si el nombre ya existe en la lista de vehículos
    if (vehiclesList.some((v) => v.name === vehicle.name)) {
      setError('The name is already in use.');
    } else {
      setError('');
      setVehiclesList([...vehiclesList, vehicle]);

      // Reiniciar el formulario
      setVehicle({
        name: '',
        brand: '',
        images: [],
        type: '',
        seats: '',
        price: '',
      });
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
            name="model-id"
            value={vehicle.idmodel}
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

          {/* <label className="label">Images (One URL per line):</label>
          <textarea
            className="textarea"
            name="images"
            value={vehicle.images.join('\n')}
            onChange={handleImageChange}
            required
          /> */}

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
};

export default Admin;