import React, { useState, useEffect } from 'react'
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'
import axios from 'axios'


const VehiclesList = () => {

    const[vehicles, setVehicles] = useState([])

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

    

    return (
        <Container>
      <Typography variant="h4" gutterBottom>
        Vehicle List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>{vehicle.name}</TableCell>
                <TableCell>
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