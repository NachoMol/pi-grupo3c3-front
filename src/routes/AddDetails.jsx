import axios from 'axios';
import React, { useState } from 'react';
import { FormControl, Button, Checkbox, FormLabel, FormGroup } from '@mui/material';
import { Link } from 'react-router-dom';

const AddDetails = () => {
    const [detail, setDetail] = useState({
        name: '',
        img_url: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDetail({ ...detail, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/details/create', detail);

            setDetail({
                name: '',
                img_url: '',
            });

            setSuccessMessage('Detail added successfully');
            setError('');
        } catch (error) {
            console.error('Error adding detail', error);
            setError('Error adding detail. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '400px', margin: 'auto', marginTop: '50px' }}>
            <h2 style={{ textAlign: 'center' }}>Add Detail</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Detail Name:</label>
                        <input
                            style={{ width: '100%', padding: '8px' }}
                            type="text"
                            name="name"
                            value={detail.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Image URL:</label>
                        <input
                            style={{ width: '100%', padding: '8px' }}
                            type="text"
                            name="img_url"
                            value={detail.img_url}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <FormControl component="fieldset" style={{ marginBottom: '20px' }}>
                            <FormLabel>Details</FormLabel>
                            <FormGroup>
                                {/* Aquí puedes agregar cualquier campo adicional necesario para los detalles */}
                            </FormGroup>
                        </FormControl>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                        <Button type="submit" variant="contained" style={{ backgroundColor: '#1976D2', color: 'white' }}>
                            Submit
                        </Button>
                    </div>
                </form>
                {loading && <p>Loading...</p>}
                {successMessage && (
                    <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{successMessage}</p>
                )}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link to={'/admin/details-list'}>
                    <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#302253', '&:hover': { bgcolor: '#5e2b96', }, }}>
                        Back to detail list
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default AddDetails;
