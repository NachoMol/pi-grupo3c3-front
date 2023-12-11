import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useContextGlobal } from '../context/Context';

const InsertCategory = () => {
    const [category, setCategory] = useState({
        title: '',
        description: '',
        image: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const validarUrl = (url) => {
        let pattern = new RegExp(
            '^(https?:\\/\\/)?' +
            '([a-z0-9]+([\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*?)?)$',
            'i'
        );
        return !!pattern.test(url);
    };

    const handleInputChange = (event) => {
        // Verificar si el usuario conectado es un administrador
        const authData = JSON.parse(localStorage.getItem('auth'));
        const isAdmin = authData.isAdmin === true;

        if (!isAdmin) {
            // Si el usuario no es un administrador, mostrar un mensaje o realizar alguna acción
            console.log('Permission denied. Only admins can add details.');
            return;
        }
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
        if (name === 'image' && !validarUrl(value)) {
            setError('Por favor, ingresa una URL válida.');
        } else {
            setError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if (!userData.user.admin) {
        //          console.error('Permission denied. Only admins make this change.');
        //          return;
        //        }

        // if (error) {
        //     return;
        // }

        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:8080/categories/create',
                {
                    name: category.title,
                    description: category.description,
                    image_url: category.image,
                }
            );

            setCategory({
                title: '',
                description: '',
                image: '',
            });
            setSuccessMessage('Category added successfully');
            setError('');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setError('This name already exists');
            } else setError('Error al enviar los datos. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div
                className="form-container"
                style={{
                    maxWidth: '40vw',
                    minWidth: '10vw',
                    maxHeight: 'none',
                    paddingBottom:'0'
                }}
            >
                <h2>Add Category</h2>
                <div className="form-content">
                    {isMobile ? (
                        <p>This component is not available on mobile devices.</p>
                    ) : (
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

                            <div
                                className="buttonSubmit"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    paddingBottom: '20px',
                                }}
                            >
                                <Button
                                    className="button"
                                    type="submit"
                                    variant="contained"
                                    sx={{ marginTop: 3, fontFamily: 'Quicksand', fontWeight:'600' }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    )}
                    {loading && <p>Loading...</p>}
                    {successMessage && (
                        <p className="success-message">{successMessage}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default InsertCategory;
