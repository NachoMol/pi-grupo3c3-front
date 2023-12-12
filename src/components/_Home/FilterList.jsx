/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Autocomplete, Typography, Button, Box, Checkbox, Container, Divider, FormControlLabel, Grid, IconButton, Paper, TextField } from '@mui/material'
import CategoryIcon from './CategoryIcon'
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import es from 'date-fns/locale/es';
import { format, isValid } from 'date-fns'
import { types } from '../../types/types'
import { urlCategories, urlReservation } from '../../config/config'
import { useCarStates } from '../../context/Context';
import { toastMessage } from '../../helpers/toastMessage';
import { dispacthAction } from '../../helpers/dispatchAction';
import { FaTrash } from 'react-icons/fa';
import { isAfter } from 'date-fns';
import { isBefore } from 'date-fns';
import Swal from 'sweetalert2';
import '../../../src/styless/FilterList.css'


const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  wrap: 'nowrap',
  alignItems: 'center',
  width: '192px',
  // [theme.breakpoints.down(716)]: {
  //   backgroundColor: 'blue',
  // },
}));

const GridIcon = styled(Grid)(({ theme }) => ({
  justifyContent: 'space-evenly',
  [theme.breakpoints.down(716)]: {
    alignItems: 'center',
  },
}));

const FilterList = () => {
  const [categories, setCategories] = useState([])
  const [dates, setDates] = useState({
    checkInDate: null,
    checkOutDate: null,
  })
  const [searchText, setsearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState({
    Sedán: false,
    Hatchback: false,
    Coupé: false,
    SUV: false,
    Pickup: false
  });
  const [selectedOption, setSelectedOption] = useState(null); // estado para manejar la seleccion del autocompletado
  const [categoryList, setCategorylist] = useState([]);
  const [options, setOptions] = useState([]); // estado para manejar las opciones del autocompletado
  const [availableCars, setAvailableCars] = useState([]);
  const [componentLoaded, setComponentLoaded] = useState(false);

  const { dispatchCarFilter, dispatchFilterLoading } = useCarStates();
  const { checkInDate, checkOutDate } = dates;
  const [tempDate, setTempDate] = useState(null);
  const [rentalDays, setRentalDays] = useState(0);

  
  /**
   * Handles the change event for the given input element.
   * @param {Event} e - The change event object.
   */
  const handleChange = (e) => {
    setSelectedCategories({
      ...selectedCategories,
      [e.target.name]: e.target.checked,
    });
    handleCheckboxChange(e.target.id);
  };

  /**
   * Handles the change event for a checkbox element.
   * Updates the state of the selectedCategories object based on the checkbox's checked status.
   * Also updates the categoriasSeleccionadas array by adding or removing the category id based on the checkbox's checked status.
   * @param {number} id - The id of the category checkbox that was changed.
   * @returns {void}
   */
  const handleCheckboxChange = (id) => {
    const index = categoryList.indexOf(Number(id));
    if (index === -1) {
      const newCategory = [...categoryList, Number(id)];
      setCategorylist(newCategory);
    } else {
      const newCategory = [...categoryList];
      newCategory.splice(index, 1);
      setCategorylist(newCategory);
    }
  };

  useEffect(() => {
    const getAvailableProducts = async () => {
      try {
        const response = await axios.get(`${urlReservation}/availableproducts`);
        setOptions(response.data.content)

        console.log('options', response.data.content)
      } catch (error) {
        console.error('Error al obtener lista de productos disponibles.', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${urlCategories}`);
        setCategories(response.data)
      } catch (error) {
        console.error("Error fetching categories", error)
      }
    }

    fetchCategories();
    getAvailableProducts();
    setComponentLoaded(true);
  }, []);

  useEffect(() => {
    if (!componentLoaded) return;
    setAvailableCars({
      checkin: isValid(checkInDate) ? format(checkInDate, 'yyyy-MM-dd') : '',
      checkout: isValid(checkOutDate) ? format(checkOutDate, 'yyyy-MM-dd') : '',
      // productName: searchText,
      productName: selectedOption?.name || searchText,
      categoryIds: categoryList.join(','),
    });
  }, [selectedCategories, searchText, checkInDate, checkOutDate]);

  const { checkin, checkout, categoryIds } = availableCars;

  useEffect(() => {
    if (!componentLoaded) return;
    handleFilter();
  }, [checkin, checkout, categoryIds]);

  /**
   * Resets the filter state by setting the search text, dates, selected categories, and category list to their initial values.
   */
  const handleFilterReset = () => {
    setsearchText('');
    setDates({
      checkInDate: null,
      checkOutDate: null,
    });
    setSelectedCategories({
      Sedán: false,
      Hatchback: false,
      Coupé: false,
      SUV: false,
      Pickup: false
    });
    setCategorylist([]);
  }

  /**
   * Updates the search text and triggers a search.
   * @param {object} e - The event object.
   */
  const handleSearch = (e) => {
    setsearchText(e.target.value);
  }

  const handleCheckInDateChange = (date) => {
    setTempDate(date);
    if (checkOutDate && isAfter(date, checkOutDate)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La fecha de devolución no puede ser anterior a la fecha de retiro.',
      });
      setTempDate(null); // Limpiar la fecha temporal en caso de error
    } else {
      setDates((prevDates) => ({
        ...prevDates,
        checkInDate: date,
      }));
      setTempDate(null);
    }
  };

  const handleCheckOutDateChange = (date) => {
    if (checkInDate && isBefore(date, checkInDate)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La fecha de devolución no puede ser anterior a la fecha de retiro.',
      });
    } else {
      setDates((prevDates) => ({
        ...prevDates,
        checkOutDate: date,
      }));
    }
  };

  /**
   * Retrieves available products based on the specified filters.
   * @return {Promise<void>} - Returns a promise that resolves when the data is fetched successfully.
   */
  const handleFilter = () => {
    if (availableCars.searchText?.trim() === '') return;
    // const {token} = JSON.parse(localStorage.getItem('auth'));
    const config = {
      params: availableCars,
      // headers: {
      //   Authorization: `Bearer ${token}`,
    };
    console.log('objeto a enviar para filtro ---->', availableCars);
    getFilterCarList(config);
  }

  /**
   * Handle the select event.
   * @param {any} selectedOption - The selected option.
   * @return {void} 
   */
  const handleSelect = (selectedOption) => {
    setsearchText(selectedOption)
  };

  /**
   * Handles the key down event and triggers a filter when the Enter key is pressed.
   * @param {object} e - The keydown event object.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFilter();
    }
  };

  /**
   * Retrieves a filtered list of cars from the API.
   * @param {object} config - The configuration object for the API request.
   * @return {Promise} A promise that resolves with the filtered list of cars.
   */
  const getFilterCarList = async (config) => {
    try {
      dispacthAction(dispatchFilterLoading, types.LOADING_FILTER_CARS, true)
      const { data } = await axios.get(`${urlReservation}/availableproducts`, config);

      if (data.content.length === 0) {
        toastMessage('error', 'Lo sentimos..', 'No hay productos disponibles.', 'center');
        // alert('No hay productos disponibles')
        dispacthAction(dispatchCarFilter, types.SET_FILTER_CARS, [])
      } else {
        dispatchCarFilter({
          type: types.SET_FILTER_CARS,
          payload: data.content
        })
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      dispacthAction(dispatchFilterLoading, types.LOADING_FILTER_CARS, false)
    }
  }

  return (
    <Container sx={{ margin: '0', padding: '0'}}>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by name"
            value={selectedOption ? selectedOption.name : searchText}
            onChange={e => handleSearch(e)}
            onKeyDown={handleKeyDown}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <IconButton type="button" sx={{ p: '10px', zIndex: 0 }} aria-label="search" onClick={handleFilter}>
                    <SearchIcon />
                  </IconButton>
                </>
              ),
            }}
            sx={{
              mt: '1rem',
              '.MuiInputBase-root': { // Aplicamos el color a la base del input
                color: '#302253',
              },
              '.MuiFormLabel-root.Mui-focused': { // Aplicamos el color al label cuando está enfocado
                color: '#5e2b96',
              },
              width: '38vw',
              minWidth: 320
            }}
          // sx={{ width: '38vw', minWidth: 320, mt: '1.5rem' }}
          />
        )}
        onChange={(event, newValue) => { handleSelect(newValue ? newValue.name : ''); console.log(newValue ? newValue.name : '') }}
      />

      <Box sx={{ width: '100%' }}>
        <Grid>
          <h2 style={{ marginTop: '10px', color: "#5e2b96", fontFamily: 'Quicksand', paddingTop: '10px', paddingBottom: '10px', width: '100%', fontSize: '20px' }}>Categories</h2>
        </Grid>
      </Box>

      <GridIcon container spacing={2}>
        {categories && categories.map((category) => (
          <Grid key={category.id} m={1}>
            <Item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategories[category.name]}
                    onChange={handleChange}
                    name={category.name}
                    id={`${category.id}`}
                    sx={{ fontFamily: 'Quicksand' }} // Aplica la fuente al Checkbox
                  />
                }
                label={<span style={{ fontFamily: 'Quicksand' }}>{category.name}</span>} // Aplica la fuente al span que contiene el nombre de la categoría
              />
              <CategoryIcon category={category.name} />
            </Item>
          </Grid>
        ))}
      </GridIcon>

      {/* <Container sx={{ textAlign: 'start' }}>
        <span onClick={handleFilterReset} style={{ cursor: 'pointer', color: '#5C4D6B' }}>Clear Filter</span>
      </Container> */}
      <Grid container spacing={2} mt={1} justifyContent={'space-evenly'}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          {/* <DatePicker
            label="Check-in date"
            value={checkInDate}
            format='dd/MM/yyyy'
            onChange={handleCheckInDateChange}
            onBlur={handleFilter}
            minDate={new Date()}
            sx={{ mt: '1rem'}}
            disablePast={true}
          /> */}

          <Grid >
            <Typography variant="h6" color="#5e2b96" fontFamily="Quicksand" fontSize='1.1rem' fontWeight='bold' textAlign='left' marginBottom='-10px'>Pick-up date</Typography>
            <DatePicker
              label="Check-in date"
              value={checkInDate}
              format='dd/MM/yyyy'
              onChange={handleCheckInDateChange}
              onBlur={handleFilter}
              minDate={new Date()}
              sx={{
                mt: '1rem',
                '.MuiInputBase-root': { // Aplicamos el color a la base del input
                  color: '#302253',
                },
                '.MuiFormLabel-root.Mui-focused': { // Aplicamos el color al label cuando está enfocado
                  color: '#5e2b96',
                },
              }}
              disablePast={true}
            />
          </Grid>
          <Grid >
            <Typography variant="h6" color="#5e2b96" fontFamily="Quicksand" fontSize='1.1rem' fontWeight='bold' textAlign='left' marginBottom='-10px'>Return date</Typography>

            <DatePicker
              label="Check-out date"
              value={checkOutDate}
              format='dd/MM/yyyy'
              onChange={handleCheckOutDateChange}
              onBlur={handleFilter}
              minDate={checkInDate || new Date()}
              disablePast={true}
              sx={{
                mt: '1rem',
                '.MuiInputBase-root': {
                  color: '#302253',
                },
                '.MuiFormLabel-root.Mui-focused': {
                  color: '#5e2b96',
                },
              }}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
      <Container sx={{ padding: '15px' }}>
        <Button onClick={handleFilterReset} sx={{ bgcolor: '#302253', '&:hover': { bgcolor: '#5e2b96' }, color: '#fff', fontFamily: 'Quicksand' }}> <FaTrash color="white" style={{ marginRight: '5px' }} /> Clear Filter</Button>
      </Container>
    </Container>
  )
}

export default FilterList