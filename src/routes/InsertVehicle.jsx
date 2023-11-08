import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
  FormLabel,
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
  const [images, setImages] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    
    // Crea una copia local del array de detalles seleccionados
    let updatedSelectedDetails = [...selectedDetails];
  
    if (checked) {
      // Si está marcado, agrégalo al array local
      updatedSelectedDetails.push(name);
    } else {
      // Si se desmarca, elimínalo del array local
      updatedSelectedDetails = updatedSelectedDetails.filter((detail) => detail !== name);
    }
  
    // Actualiza el estado con la copia local del array
    setSelectedDetails(updatedSelectedDetails);
  
    console.log('Selected Details:', updatedSelectedDetails);
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Indicar que la solicitud está en progreso
    console.log('Selected Details in handleSubmit:', selectedDetails);
    try {
      const selectedCategoryId = vehicle.category.id;
  
      // Enviar la solicitud para crear el producto
      const productResponse = await axios.post('http://localhost:8080/products/create', {
        name: vehicle.name,
        price: vehicle.price,
        category: { id: selectedCategoryId },
      });
      
      const vehicleID = productResponse.data.id;
      console.log('Product ID:', vehicleID);
      const selectedDetailsAsNumbers = selectedDetails.map(Number);
      const requestBody = {
        selectedDetails: selectedDetailsAsNumbers
      };

      // Enviar la solicitud para crear el detail asociado al producto
      axios.post('http://localhost:8080/products/' + vehicleID + '/add-details', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      // Limpia los detalles seleccionados y otros campos
      setSelectedDetails([]);
      setImages([]);
      setVehicle({
        name: '',
        price: '',
        category: { id: '' },
        location: '',
        details: [],
      });
  
      // Establecer el mensaje de éxito
      setSuccessMessage('Product signed up successfully');
      setError(''); // Restablecer el mensaje de error
    } catch (error) {
      if (error.response && error.response.status === 500) {
      setError('This name already exists');
      }
      else setError('Error al enviar los datos. Intente nuevamente.');
    } finally {
      setLoading(false); // Indicar que la solicitud ha finalizado
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
            <FormControl component="fieldset" className="category-label">
            <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
              <RadioGroup 
              value={vehicle.category.id} onChange={handleCategoryChange} aria-labelledby="demo-radio-buttons-group-label">
                {categories.map((category) => (
                  <FormControlLabel
                    key={category.id}
                    value={category.id}
                    control={
                      <Radio/>
                    }
                    label={category.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>

          <FormControl component="fieldset" className="details-label">
            <FormLabel>Details</FormLabel>
            <FormGroup>
              {details.map((detail) => (
                <FormControlLabel
                  key={detail.id}
                  control={
                    <Checkbox
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

        <div className="button-container">
          <input type="file" accept="image/*" onChange={handleImageChange} multiple />
          {error && <p className="error-message">{error}</p>}
          <Button className="button" type="submit" variant="contained" sx={{marginTop: 3}}>
            Submit
          </Button>
        </div>
        </form>
        {loading && <p>Loading...</p>}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default InsertVehicle;