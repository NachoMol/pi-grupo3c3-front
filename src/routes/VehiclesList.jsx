import React, { useState, useEffect } from 'react'
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { useContextGlobal } from '../context/Context';

const VehiclesList = () => {

  const [vehicles, setVehicles] = useState([])
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1); // comienza en la página 1
  const size = 10; // 10 productos por página
  const [hasNextPage, setHasNextPage] = useState(true); // nuevo estado para verificar si hay una próxima página

  const handleFirstPageClick = () => {
    setPage(1);
  };


  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/pagination?page=${page - 1}&size=${size}`);
        setVehicles(response.data.content);
        // Verifica si hay una próxima página
        setHasNextPage(!response.data.last);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, [page])

  console.log("Vehicles: ", vehicles);
                                            //EL HANDLE SUBMIT DE ABAJO ES PARA CUANDO QUERAMOS HACER Q SOLO LOS ADMINS PUEDAN ELIMINAR AUTOS
  // const handleDelete = (id) => {
  //   if (userData.user.admin === true) {
  //     Swal.fire({
  //       title: '¿Estás seguro?',
  //       text: '¡No podrás revertir esto!',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: '¡Sí, bórralo!',
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         try {
  //           await axios.delete(`http://localhost:8080/products/delete/${id}`);
  //           setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  //           Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
  //         } catch (error) {
  //           console.error('Error deleting vehicle:', error);
  //         }
  //       }
  //     });
  //   } else {
  //     Swal.fire({
  //       title: 'Permiso denegado',
  //       text: 'No tienes permisos para eliminar vehículos.',
  //       icon: 'error',
  //     });
  //   }
  // };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/products/delete/${id}`);
          setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          )
        } catch (error) {
          console.error('Error deleting vehicle:', error);
        }
      }
    })
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Manejar paginación */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, alignItems: 'center', gap: 2 }}>
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
  )
}

export default VehiclesList