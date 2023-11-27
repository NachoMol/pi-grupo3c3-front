import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleFirstPageClick = () => {
    setPage(1);
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/pagination?page=${page - 1}&size=${size}`);
        setVehicles(response.data.content);
        setHasNextPage(!response.data.last);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, [page]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDelete = (id) => {
    // Verificar si el usuario conectado es un administrador
    const authData = JSON.parse(localStorage.getItem('auth'));
    const isAdmin = authData.isAdmin === true;

    if (!isAdmin) {
      // Si el usuario no es un administrador, mostrar un mensaje o realizar alguna acción
      console.log('Permission denied. Only admins can add details.');
      return;
    }
    Swal.fire({
      title: '¿Are you sure you want to delete it?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:8080/products/delete/${id}`);
          setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting vehicle:', error);
        }
      }
    });
  };

  if (isMobile) {
    return (
      <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
        This component is not available on mobile devices.
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 3 }}>
        Vehicle List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>{vehicle.name}</TableCell>
                <TableCell>{vehicle.category.name}</TableCell>
                <TableCell>
                  <Link to={'/admin/update-vehicle/' + vehicle.id}>
                    <Button sx={{
                      color: 'white',
                      backgroundColor: 'blue',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      padding: '10px',
                      marginRight: '5px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'darkblue',
                      },
                    }}>Update</Button>
                  </Link>
                  <Button sx={{
                    color: 'white',
                    backgroundColor: 'red',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    padding: '10px',
                    marginRight: '5px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'darkred',
                    },
                  }} onClick={() => handleDelete(vehicle.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Manejar paginación */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, alignItems: 'center', gap: 2, paddingBottom:'100px' }}>
        <Button variant="outlined" onClick={handleFirstPageClick}>
          Inicio
        </Button>
        {page > 1 && (
          <Button variant="outlined" onClick={() => setPage(page - 1)}>
            Anterior
          </Button>
        )}
        <Typography>{page}</Typography>
        {hasNextPage && (
          <Button variant="outlined" onClick={() => setPage(page + 1)}>
            Siguiente
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default VehiclesList;