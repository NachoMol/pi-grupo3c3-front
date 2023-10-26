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

    if (vehiclesList.some((v) => v.name === vehicle.name)) {
      setError('The name is already in use.');
    } else {
      setError('');
      setVehiclesList([...vehiclesList, vehicle]);
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
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={vehicle.name}
          onChange={handleInputChange}
          required
        />

        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={vehicle.brand}
          onChange={handleInputChange}
          required
        />

        <label>Images (One URL per line):</label>
        <textarea
          name="images"
          value={vehicle.images.join('\n')}
          onChange={handleImageChange}
          required
        />

        <label>Vehicle Type:</label>
        <input
          type="text"
          name="type"
          value={vehicle.type}
          onChange={handleInputChange}
          required
        />

        <label>Number of Seats:</label>
        <input
          type="number"
          name="seats"
          value={vehicle.seats}
          onChange={handleInputChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={vehicle.price}
          onChange={handleInputChange}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Admin;