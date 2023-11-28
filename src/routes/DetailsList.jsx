import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DetailsTable = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/details');
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching details', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const handleDeleteDetail = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/details/delete/${id}`);
      setDetails((prevDetails) => prevDetails.filter((detail) => detail.id !== id));
      console.log(`Detail with ID ${id} deleted successfully.`);
    }
    catch (error) {
      console.error(`Error deleting detail with ID ${id}`, error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Detail Name</StyledTableCell>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell> {/* Nueva celda para Update */}
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail) => (
            <StyledTableRow key={detail.id}>
              <StyledTableCell component="th" scope="row">
                {detail.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                <img
                  src={detail.img_url}
                  alt={detail.name}
                  style={{ maxWidth: '50px' }}
                  onError={() => console.log(`Error loading image for ${detail.name}`)}
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/admin/update-detail/${detail.id}`}>
                  <Button variant="contained" color="primary">
                    Update
                  </Button>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteDetail(detail.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      {/* Botón para agregar nuevo detalle */}
      <Link to={'/admin/add-detail'}>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: '#1976D2', '&:hover': { bgcolor: '#1565C0' } }}
        >
          Add Detail
        </Button>
      </Link>
    </TableContainer>
  );
};

export default DetailsTable;