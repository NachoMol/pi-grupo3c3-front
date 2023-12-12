import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { URL } from '../config/config';


const UpdatePolicies = () => {
  const [selectedPolicyId, setSelectedPolicyId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [policyTitles, setPolicyTitles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    const fetchPolicyTitles = async () => {
      try {
        const response = await axios.get(`${URL}/policies`);
        const titles = response.data.map(policy => ({
          id: policy.id,
          name: policy.title,
        }));

        // Actualiza los títulos disponibles
        setPolicyTitles(titles);
      } catch (error) {
        console.error('Error fetching policy titles', error);
      }
    };

    // Cargar los títulos disponibles al montar el componente
    fetchPolicyTitles();
  }, []);

  useEffect(() => {
    const fetchPolicyDetails = async () => {
      try {
        const response = await axios.get(
          `${URL}/policies/${selectedPolicyId}`
        );
        const policyDetails = response.data;

        // Actualiza los estados con los detalles del policy
        setTitle(policyDetails.title);
        setDescription(policyDetails.description);
        setUpdateStatus(null);
      } catch (error) {
        console.error('Error fetching policy details', error);
      }
    };

    // Verifica si el selectedPolicyId es válido antes de intentar cargar los detalles
    if (selectedPolicyId) {
      fetchPolicyDetails();
    }
  }, [selectedPolicyId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleUpdate = async () => {
    const authData = JSON.parse(localStorage.getItem('auth'));
    const isAdmin = authData.isAdmin === true;
    if (!isAdmin) {
      // Si el usuario no es un administrador, mostrar un mensaje o realizar alguna acción
      console.log('Permission denied. Only admins can add details.');
      return;
    }
    try {
      // Realizar la solicitud de actualización al backend
      await axios.put(`${URL}/policies/update/${selectedPolicyId}`, {
        title,
        description,
      });

      // Actualizar el estado para mostrar un mensaje de éxito
      setUpdateStatus('Updated successfully');
    } catch (error) {
      // Actualizar el estado para mostrar un mensaje de error
      setUpdateStatus('There was a problem, try again later');
      console.error('Error updating policy', error);
    }
  };
  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Container>
      {isMobile ? (
        <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
          This component is not available on mobile devices.
        </Typography>
      ) : (
        <>
          <Typography variant="h6" style={{ marginTop: '20px', fontFamily: 'Quicksand', fontWeight:'600', fontSize:'28px' }}>
            Update Policy
          </Typography>
          <FormControl fullWidth style={{ marginTop: '10px' }}>
            <InputLabel style={{ marginTop: '8px' }}>Select Policy Title</InputLabel>
            <Select
              label="Select Policy Title"
              value={selectedPolicyId}
              onChange={(e) => setSelectedPolicyId(e.target.value)}
              fullWidth
              style={{ marginTop: '10px' }}
              onClose={handleCloseMenu}
              onOpen={() => setMenuOpen(true)}
              open={menuOpen}
            >
              {policyTitles.map((title) => (
                <MenuItem key={title.id} value={title.id}>
                  {title.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            style={{ marginTop: '10px' }}
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            style={{ marginTop: '10px' }}
          />
          <Button
            variant="contained"
            onClick={handleUpdate}
            style={{ marginTop: '10px', fontFamily: 'Quicksand', fontWeight:'600' }}
          >
            Update Policy
          </Button>
          {updateStatus && (
            <Typography variant="body2" style={{ color: updateStatus.includes('successfully') ? 'green' : 'red', marginTop: '15px', fontSize: '16px' }}>
              {updateStatus}
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default UpdatePolicies;