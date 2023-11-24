import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FormControl, Button, Checkbox, FormLabel, FormGroup } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const UpdateDetails = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({
    name: '',
    img_url: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/details/${id}`);
        const { name, img_url } = response.data;
        setDetail({ name, img_url });
      } catch (error) {
        console.error('Error fetching detail', error);
      }
    };

    fetchDetail();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // if (!userData.user.admin) {
        //          console.error('Permission denied. Only admins make this change.');
        //          return;
        //        }

        // if (error) {
        //     return;
        // }

    try {
      await axios.put(`http://localhost:8080/details/update/${id}`, detail);

      setSuccessMessage('Detail updated successfully');
      setError('');
    } catch (error) {
      console.error('Error updating detail', error);
      setError('Error updating detail. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '400px', margin: 'auto', marginTop: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>Update Detail</h2>
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

          <div style={{ textAlign: 'center' }}>
            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
            <Button type="submit" variant="contained" style={{ backgroundColor: '#1976D2', color: 'white' }}>
              Update
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
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#302253', '&:hover': { bgcolor: '#5e2b96' } }}>
            Back to detail list
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UpdateDetails;
