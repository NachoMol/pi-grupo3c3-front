import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import { useContextGlobal } from '../context/Context';

const UsersList = () => {
  const { userData } = useContextGlobal();
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
                                              //EL HANDLE SUBMIT DE ABAJO ES PARA CUANDO QUERAMOS HACER Q SOLO LOS ADMINS PUEDAN HACER Y DESHACER ADMINS
  // const handleAdminChange = async (userId, makeAdmin) => {
  //   // Verificar si el usuario actual es un administrador antes de permitir el cambio
  //   if (!userData.user.admin) {
  //     console.error('Permission denied. Only admins can change admin status.');
  //     return;
  //   }

  //   try {
  //     const response = await axios.put(`http://localhost:8080/users/update/${userId}`, { makeAdmin });
  //     console.log(response.data);
  //     setAdminChanges(prevState => ({ ...prevState, [userId]: makeAdmin }));
  //   } catch (error) {
  //     console.error('Error updating admin status:', error);
  //   }
  // };

  const handleAdminChange = async (userId, makeAdmin) => {
    console.log('URL:', `http://localhost:8080/users/update/${userId}`);
    console.log('Data:', { makeAdmin });
  
    try {
      const response = await axios.put(`http://localhost:8080/users/update/${userId}`, { makeAdmin });
      console.log('Server response:', response);
      console.log('userId:', userId);
      console.log('makeAdmin:', makeAdmin);
      console.log(response.data);
  
      setUsers(prevState => {
        const updatedUsers = prevState.map(user => {
          if (user.id === userId) {
            return { ...user, admin: makeAdmin };
          }
          return user;
        });
        console.log('Updated Users:', updatedUsers);
        return updatedUsers;
      });
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
                    style={{
                      width: '120px', // Tamaño deseado
                      backgroundColor: user.admin ? 'red' : 'blue', // Color según el estado de admin
                      color: 'white', // Texto en color blanco para mayor contraste
                    }}
                    onClick={() => handleAdminChange(user.id, !user.admin)}
                  >
                    {user.admin ? 'Remove Admin' : 'Make Admin'}
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