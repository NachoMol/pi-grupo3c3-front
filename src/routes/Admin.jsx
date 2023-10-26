import React, { useState } from 'react';
import "../styless/Admin.css"

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
    <div>
      <h2>Register Vehicle</h2>
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

<label className="label">Brand:</label>
<input
  className="input-text"
  type="text"
  name="brand"
  value={vehicle.brand}
  onChange={handleInputChange}
  required
/>

<label className="label">Images (One URL per line):</label>
<textarea
  className="textarea"
  name="images"
  value={vehicle.images.join('\n')}
  onChange={handleImageChange}
  required
/>

<label className="label">Vehicle Type:</label>
<input
  className="input-text"
  type="text"
  name="type"
  value={vehicle.type}
  onChange={handleInputChange}
  required
/>

<label className="label">Number of Seats:</label>
<input
  className="input-number"
  type="number"
  name="seats"
  value={vehicle.seats}
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

{error && <p className="error-message">{error}</p>}

<button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Admin;