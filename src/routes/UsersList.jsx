import React, { useState, useEffect } from 'react'
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'
import axios from 'axios'


const UsersList = () => {

    const[users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('http://localhost:8080/users');
            setUsers(response.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
        fetchUsers();
     }, [])

    

    return (
        <Container>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
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

export default UsersList