import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';

const UpdatePolicies = () => {
  const [policyId, setPolicyId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchPolicyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/policies/${policyId}`
        );
        const policyDetails = response.data;

        // Actualiza los estados con los detalles del policy
        setTitle(policyDetails.title);
        setDescription(policyDetails.description);
      } catch (error) {
        console.error('Error fetching policy details', error);
      }
    };

    // Verifica si el policyId es válido antes de intentar cargar los detalles
    if (policyId) {
      fetchPolicyDetails();
    }
  }, [policyId]);

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
    // if (!userData.user.admin) {
    //          console.error('Permission denied. Only admins make this change.');
    //          return;
    //        }

    // if (error) {
    //     return;
    // }

    try {
      const response = await axios.put(
        `http://localhost:8080/policies/update/${policyId}`,
        {
          title,
          description,
        }
      );

      if (response.status === 201) {
        console.log('Policy updated successfully');
      } else {
        console.log('Failed to update policy');
      }
    } catch (error) {
      console.error('Error updating policy', error);
    }
  };

  return (
    <Container>
      {isMobile ? (
        <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
          This component is not available on mobile devices.
        </Typography>
      ) : (
        <>
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Update Policy
          </Typography>
          <TextField
            label="Policy ID"
            variant="outlined"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            fullWidth
            style={{ marginTop: '10px' }}
          />
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
            style={{ marginTop: '10px' }}
          >
            Update Policy
          </Button>
        </>
      )}
    </Container>
  );
};

export default UpdatePolicies;