import React from 'react';
import { useContextGlobal } from '../context/Context';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const UserProfile = () => {
  const { userData } = useContextGlobal();

  return (
    <TableContainer component={Paper} sx={{ mt: 3, backgroundColor: '#f5f5f5', width: '90vw', marginLeft: 'auto', marginRight: 'auto', overflowX: 'auto' }}>
      <Table sx={{}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Attribute</StyledTableCell>
            <StyledTableCell align="center">Value</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              User Id
            </StyledTableCell>
            <StyledTableCell align="center">{userData.user.id}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Name
            </StyledTableCell>
            <StyledTableCell align="center">{userData.user.name}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Last Name
            </StyledTableCell>
            <StyledTableCell align="center">{userData.user.lastname}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Email
            </StyledTableCell>
            <StyledTableCell align="center">{userData.user.email}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Admin
            </StyledTableCell>
            <StyledTableCell align="center">{userData.user.admin ? 'Yes' : 'No'}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserProfile;