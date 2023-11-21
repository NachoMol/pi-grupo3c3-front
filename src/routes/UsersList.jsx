import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import { useContextGlobal } from '../context/Context'; // Ajusta la ruta según la estructura de tu proyecto

const UsersList = () => {
  const { userData } = useContextGlobal(); // Obtenemos userData del contexto
  const [users, setUsers] = useState([]);
  const [adminChanges, setAdminChanges] = useState({});

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
  }, []);

  const handleAdminChange = async (userId, makeAdmin) => {
    // Obtenemos el token JWT directamente desde el contexto
    const userToken = userData.auth.token;

    // Enviar la solicitud al backend para cambiar el estado de administrador
    try {
      await axios.put(`http://localhost:8080/users/updateAdmin/${userId}`, null, {
        params: { makeAdmin },
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setAdminChanges(prevState => ({ ...prevState, [userId]: makeAdmin }));
    } catch (error) {
      console.error('Error updating admin status:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 3 }}>
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
                  <Button
                    variant="contained"
                    color={adminChanges[user.id] ? 'secondary' : 'primary'}
                    onClick={() => handleAdminChange(user.id, !adminChanges[user.id])}
                  >
                    {adminChanges[user.id] ? 'Remove Admin' : 'Make Admin'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersList;