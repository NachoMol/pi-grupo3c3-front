import React, { useState, useEffect } from 'react'
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const VehiclesList = () => {

    const[vehicles, setVehicles] = useState([])
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
          try {
            const response = await axios.get('http://localhost:8080/products');
            setVehicles(response.data);
          } catch (error) {
            console.error('Error fetching vehicles:', error);
          }
        };
        fetchVehicles();
     }, [])

     console.log("Vehicles: ",vehicles);

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
      <Typography variant="h4" gutterBottom sx={{marginTop: 3}}>
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
                  <Link to={'/admin/update-vehicle/'+ vehicle.id}>
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
    </Container>
    )
}

export default VehiclesList