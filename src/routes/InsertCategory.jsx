import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useContextGlobal } from '../context/Context';

const InsertCategory = () => {
    const [category, setCategory] = useState({
        title: '',
        description: '',
        image: '',
    })

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const validarUrl = (url) => {
        let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '([a-z0-9]+([\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?)$', 'i'); // domain name and extension
        return !!pattern.test(url);
    }


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
        if (name === 'image' && !validarUrl(value)) {
            setError('Por favor, ingresa una URL válida.');
        } else {
            setError('');
        }
    };
                                            //EL HANDLE SUBMIT DE ABAJO ES PARA CUANDO QUERAMOS HACER Q SOLO LOS ADMINS PUEDAN AGREGAR CATEGORIAS
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    
    //     if (error || !userData.user.admin) {
    //       return;
    //     }
    
    //     try {
    //       setLoading(true); // Indicar que la solicitud ha comenzado
    //       const response = await axios.post('http://localhost:8080/categories/create', {
    //         name: category.title,
    //         description: category.description,
    //         image_url: category.image,
    //       });
    
    //       // Limpia campos seleccionados
    //       setCategory({
    //         title: '',
    //         description: '',
    //         image: '',
    //       });
    //       // Establecer el mensaje de éxito
    //       setSuccessMessage('Product signed up successfully');
    //       setError(''); // Restablecer el mensaje de error
    //     } catch (error) {
    //       if (error.response && error.response.status === 500) {
    //         setError('This name already exists');
    //       } else setError('Error al enviar los datos. Intente nuevamente.');
    //     } finally {
    //       setLoading(false); // Indicar que la solicitud ha finalizado
    //     }
    //   };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (error) {
            return;
        }

        try {
            setLoading(true); // Indicar que la solicitud ha comenzado
            const response = await axios.post('http://localhost:8080/categories/create', {
                name: category.title,
                description: category.description,
                image_url: category.image,
            });

            // Limpia campos seleccionados
            setCategory({
                title: '',
                description: '',
                image: '',
            });
            // Establecer el mensaje de éxito
            setSuccessMessage('Product signed up successfully');
            setError(''); // Restablecer el mensaje de error
        }
        catch (error) {
            if (error.response && error.response.status === 500) {
                setError('This name already exists');
            }
            else setError('Error al enviar los datos. Intente nuevamente.');
        } finally {
            setLoading(false); // Indicar que la solicitud ha finalizado
        }
    };


    return (
        <>
            <div className="form-container" style={{
                maxWidth: '40vw',
                minWidth: '10vw',
                maxHeight: 'none',
            }}>
                <h2>Add Category</h2>
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <label className="label">Title:</label>
                        <input
                            className="input-text"
                            type="text"
                            name="title"
                            value={category.title}
                            onChange={handleInputChange}
                            required
                        />

                        <label className="label">Description:</label>
                        <input
                            className="input-text"
                            type="text"
                            name="description"
                            value={category.description}
                            onChange={handleInputChange}
                            required
                        />

                        <label className="label">Image:</label>
                        <input
                            className="input-text"
                            type="text"
                            name="image"
                            value={category.image}
                            onChange={handleInputChange}
                            required
                        />
                        {error && <p>{error}</p>}

                        <div className='buttonSubmit' style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingBottom: '20px'
                        }}>
                            <Button className="button" type="submit" variant="contained" sx={{ marginTop: 3 }}>
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
        </>
    )
}

export default InsertCategory
