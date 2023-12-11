import { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, tableCellClasses, Tooltip, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import '../styless/CategoryList.css';
import { toastMessage } from '../helpers/toastMessage';
import { urlCategories } from '../config/config';
import DefaultButton from '../components/DefaultButton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#5C4D6B',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#D9D9D9',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DeleteIcon = styled(DeleteForeverIcon)({
  cursor: 'pointer',
  '&:hover': {
    color: '#A3A3A3',
  }
})

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [idCategory, setIdCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * Deletes a category from the server.
   * @return {Promise<void>} Promise that resolves when the category is successfully deleted.
   */
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${urlCategories}/delete/${idCategory}`);
      toastMessage('success', 'Success!!!', 'The category deleted successfully.', 'center');
      setCategories(categories.filter((category) => category.id !== idCategory));
    } catch (error) {
      toastMessage('error', 'Error deleting category', `${error}.`, 'center');
      console.log('Error category', error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handles the click event and opens the modal.
   * @param {number} id - The ID of the category.
   */
  const handleClickOpen = (id) => {
    setOpen(true);
    setIdCategory(id)
  };

  /**
   * Closes the component.
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handles the confirmation action.
   * @return {undefined} No return value.
   */
  const handleConfirm = () => {
    handleClose();
    handleDelete();
  };

  return (
    <div className="category-list-container">
      <h2 style={{fontSize:'30px'}}>Categories</h2>
      {!isMobile ? (
        <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto' }}>
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{fontFamily: 'Quicksand', fontWeight:'600', fontSize:'18px'}}>ID</StyledTableCell>
                <StyledTableCell align="center" sx={{fontFamily: 'Quicksand', fontWeight:'600', fontSize:'18px'}}>Category name</StyledTableCell>
                <StyledTableCell align="center" sx={{fontFamily: 'Quicksand', fontWeight:'600', fontSize:'18px'}}>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row"> {<span style={{ fontFamily: 'Quicksand', fontWeight:'600' }}>{row.id}</span>} </StyledTableCell>
                  <StyledTableCell align="center">{<span style={{ fontFamily: 'Quicksand', fontWeight:'600' }}>{row.name}</span>}</StyledTableCell>
                  {
                    loading ?
                      (<CircularProgress sx={{ color: '#705b85', mt: '4px' }} />)
                      : (<StyledTableCell align="center">
                        <Tooltip title="Delete">
                          <DeleteIcon onClick={() => handleClickOpen(row.id)} />
                        </Tooltip>
                      </StyledTableCell>)
                  }
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>This component is not available on mobile devices.</p>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this category?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This category will be deleted, and you will not be able to see the vehicles listed in that category.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DefaultButton name={'Disagree'} type={'button'} callback={handleClose} />
          <DefaultButton name={'Agree'} type={'button'} callback={handleConfirm} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryList;