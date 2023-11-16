import React from 'react';
import { useContextGlobal } from '../context/Context';  // Asegúrate de que la ruta del contexto sea correcta
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = TableCell;  // No es necesario modificar el estilo

const StyledTableRow = TableRow;  // No es necesario modificar el estilo

const UserProfile = () => {
  const { userData } = useContextGlobal();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User Information</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              {userData.user.email ? userData.user.email : 'No email available'}
            </StyledTableCell>
            <StyledTableCell align="right">{userData.user.name}</StyledTableCell>
            <StyledTableCell align="right">{userData.user.lastname}</StyledTableCell>
            <StyledTableCell align="right">{userData.user.email}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserProfile;
