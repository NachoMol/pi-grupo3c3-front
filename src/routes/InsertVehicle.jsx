import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import '../styless/InsertVehicle.css';

const InsertVehicle = () => {
  const [vehicle, setVehicle] = useState({
    name: '',
    price: '',
    category: { id: '' }, // Cambiado para almacenar la categoría como un objeto
    location: '',
    details: [],
  });

  const [categories, setCategories] = useState([]);
  const [details, setDetails] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:8080/categories');
        const detailsResponse = await axios.get('http://localhost:8080/details');

        setCategories(categoriesResponse.data);
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


  
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value; // Obten el ID de la categoría seleccionada
  
    // Encuentra la categoría correspondiente en la lista de categorías
    
  
    if (categoryId) {
      // Si se encuentra una categoría correspondiente, establece el objeto de categoría en el estado
      setVehicle({ ...vehicle, category: { id: categoryId } }); // Establece el ID de la categoría en un objeto
      console.log('Categoría válida:', categoryId);
    } else {
      // Si el ID no es válido, puedes manejarlo aquí (por ejemplo, mostrar un mensaje de error)
      console.log('Categoría no válida. Valor no válido:', categoryId);
    }
  
    console.log('Selected Category ID:', categoryId);
  };


  const handleDetailsChange = (event) => {
    const { name, checked } = event.target;

    // Verificar si el detalle ya está en la lista de seleccionados
    const detailIndex = selectedDetails.indexOf(name);

    if (checked && detailIndex === -1) {
      // Si está marcado y no está en la lista, agrégalo
      setSelectedDetails([...selectedDetails, name]);
    } else if (!checked && detailIndex !== -1) {
      // Si no está marcado y está en la lista, elimínalo
      const updatedDetails = [...selectedDetails];
      updatedDetails.splice(detailIndex, 1);
      setSelectedDetails(updatedDetails);
    }

    console.log('Selected Details:', selectedDetails);
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Obtén el ID de la categoría seleccionada
      const selectedCategoryId = vehicle.category.id;
  
      // Enviar la solicitud para crear el producto
      const productResponse = await axios.post('http://localhost:8080/products/create', {
        name: vehicle.name,
        price: vehicle.price,
        category: { id: selectedCategoryId }, // Envía el ID de la categoría
        details: selectedDetails,
      });
  
      const vehicleID = productResponse.data.id;
  
      console.log('Selected Details:', selectedDetails);
  
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
        category: '', // También puedes eliminar esto ya que no se usa
        location: '',
        details: [],
      });
    } catch (error) {
      setError('Error al enviar los datos. Intente nuevamente.');
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
            <p>Category:</p>
            <FormControl component="fieldset">
              <RadioGroup
                value={vehicle.category}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <FormControlLabel
                    key={category.id}
                    value={category.id}  // Asegúrate de que esto coincida con el valor de la categoría
                    control={<Radio checked={vehicle.category === category.id} />} // Verifica si es igual al valor de la categoría actual
                    label={category.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>

          <FormControl component="fieldset" className="details-label">
            <p>Details:</p>
            <FormGroup>
              {details.map((detail) => (
                <FormControlLabel
                  key={detail.id}
                  control={
                    <Checkbox
                      checked={selectedDetails.includes(detail.id)}
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
