import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import { useContextGlobal } from '../context/Context';

const UsersList = () => {
  const { userData } = useContextGlobal();
  const [users, setUsers] = useState([]);
  const [adminChanges, setAdminChanges] = useState({});
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAdminChange = async (userId, makeAdmin) => {
    // Verificar si el usuario conectado es un administrador
    const authData = JSON.parse(localStorage.getItem('auth'));
    const isAdmin = authData.isAdmin === true;

    if (!isAdmin) {
      // Si el usuario no es un administrador, mostrar un mensaje o realizar alguna acción
      console.log('Permission denied. Only admins can add details.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8080/users/update/${userId}`, { admin: makeAdmin });
      setUsers((prevState) => {
        const updatedUsers = prevState.map((user) => {
          if (user.id === userId) {
            return { ...user, admin: makeAdmin };
          }
          return user;
        });
        return updatedUsers;
      });
    } catch (error) {
      console.error('Error updating admin status:', error);
    }
  };

  if (isMobile) {
    return (
      <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
        This component is not available on mobile devices.
      </Typography>
    );
  }

  return (
    <Container sx={{paddingBottom:'100px'}}>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 3 }}>
        User List
      </Typography>
      <TableContainer component={Paper}>
        <Table >
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
                      width: '120px',
                      backgroundColor: user.admin ? 'red' : 'blue',
                      color: 'white',
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