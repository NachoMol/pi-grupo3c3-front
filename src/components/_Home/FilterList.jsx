/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Autocomplete, Button, Checkbox, Container, Divider, FormControlLabel, Grid, IconButton, Paper, TextField } from '@mui/material'
import CategoryIcon from './CategoryIcon'
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import es from 'date-fns/locale/es';
import { format } from 'date-fns'
import { types } from '../../types/types'
import { urlCategories, urlReservation } from '../../config/config'
import { useCarStates } from '../../context/Context';
import { toastMessage } from '../../helpers/toastMessage';
import { dispacthAction } from '../../helpers/dispatchAction';

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
  const [options, setOptions] = React.useState([]); // estado para manejar las opciones del autocompletado
  const [availableCars, setAvailableCars] = useState([]);

  const { dispatchCarFilter, dispatchFilterLoading } = useCarStates();
  const { checkInDate, checkOutDate } = dates;

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
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${urlCategories}`);
        setCategories(response.data)
      } catch (error) {
        console.error("Error fetching categories", error)
      }
    }
    fetchCategories();
  }, [])


  // Ajuste futuro para el autocomplete
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

    getAvailableProducts();
  }, []);

  useEffect(() => {
    setAvailableCars({
      checkin: checkInDate ? format(checkInDate, 'yyyy-MM-dd') : '',
      checkout: checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : '',
      // productName: searchText,
      productName: selectedOption?.name || searchText,
      categoryIds: categoryList.join(','),
    });
  }, [selectedCategories, searchText, checkInDate, checkOutDate]);

  const { checkin, checkout, categoryIds } = availableCars;

  useEffect(() => {
    handleFilter();
  }, [checkin, checkout, categoryIds]);

  //se incorpora el estado selected options para el autocompletado pero no funciona correctamente
  // useEffect(() => {
  //   setAvailableCars({
  //     checkin: checkOutDate ? format(checkInDate, 'yyyy-MM-dd') : '',
  //     checkout: checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : '',
  //     productName: selectedOption?.name || '',
  //     categoryIds: categoryList.join(','),
  //   });
  // }, [selectedCategories, selectedOption, checkInDate, checkOutDate]);

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
    setDates((prevDates) => ({
      ...prevDates,
      checkInDate: date,
    }));
  };

  // Función para manejar el cambio de la fecha de check-out
  const handleCheckOutDateChange = (date) => {
    setDates((prevDates) => ({
      ...prevDates,
      checkOutDate: date,
    }));
  };

  /**
   * Retrieves available products based on the specified filters.
   * @return {Promise<void>} - Returns a promise that resolves when the data is fetched successfully.
   */
  const handleFilter = () => {
    if (availableCars.searchText?.trim() === '') return;
    const config = {
      params: availableCars,
      // headers: {
      //   // Authorization: `Bearer ${localStorage.getItem('auth')}`, // Para cuando apliquen seguridad y necesite el token para consumir el endpoint
      // autorization hardcode --- *** ---
      //   Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfVVNFUlwifV0iLCJpc0FkbWluIjpmYWxzZSwidXNlcm5hbWUiOiJkYXZpZDEwbm92QHRlc3QuY29tIiwic3ViIjoiZGF2aWQxMG5vdkB0ZXN0LmNvbSIsImlhdCI6MTcwMDcyMzUyOCwiZXhwIjoxNzAwNzI3MTI4fQ.DEFC4ZXTrj0HX2jXGc0ZT6_XVlLFxresw3aVJfVv-tk`, 
      // }
    };
    console.log('objeto a enviar para filtro ---->', availableCars);
    getFilterCarList(config);
  }

  // Mejora futura para autocomplete
  const handleSelect = (selectedOption) => {
    setsearchText(selectedOption)
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFilter();
    }
  };

  const getFilterCarList = async (config) => {
    try {
      // debugger;
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
    <Container>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
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
            sx={{ width: '38vw', minWidth: 320, mt: '1.5rem' }}
          />
        )}
        onChange={(event, newValue) => { handleSelect(newValue ? newValue.name : ''); console.log(newValue ? newValue.name : '') }}
      />
      {/* <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            value={selectedOption?.name || searchText}
            onChange={handleSearch}
            // onBlur={handleFilter}
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
            sx={{ width: '38vw', minWidth: 320, mt: '1.5rem' }}
          />
        )}
        onChange={(event, newValue) => handleSelect(newValue)}
      /> */}

      {/* <TextField
        id="outlined-search"
        label="Search"
        type="search"
        value={searchText}
        onChange={handleSearch}
        // onBlur={handleFilter}
        onKeyDown={handleKeyDown} 
        InputProps={{
          endAdornment: (
            <>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton type="button" sx={{ p: '10px', zIndex: 0 }} aria-label="search" onClick={handleFilter}>
                <SearchIcon />
              </IconButton>
            </>
          ),
        }}
        sx={{ width: '38vw', minWidth: 320, mt: '1.5rem' }}
      /> */}

      <h2 style={{ fontFamily: 'Roboto' }}>Categories</h2>

      <GridIcon container spacing={2}>
        {categories && categories.map((category) => (
          <Grid key={category.id} m={1}>
            <Item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategories[category.name]}
                    onChange={handleChange}
                    // onBlur={handleFilter} 
                    name={category.name}
                    id={`${category.id}`}
                  />
                }
                label={category.name}
              />
              <CategoryIcon category={category.name} />
            </Item>
          </Grid>
        ))}
      </GridIcon>

      <Container sx={{ textAlign: 'start' }}>
        <span onClick={handleFilterReset} style={{ cursor: 'pointer', color: '#5C4D6B' }}>Clear Filter</span>
      </Container>

      <Grid container spacing={2} mt={1} justifyContent={'space-evenly'}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker
            label="Check-in date"
            value={checkInDate}
            format='dd/MM/yyyy'
            onChange={handleCheckInDateChange}
            onBlur={handleFilter}
            minDate={new Date()}
            sx={{ mt: '1rem' }}
            disablePast={true}
          />
          <DatePicker
            label="Check-Out date"
            value={checkOutDate}
            format='dd/MM/yyyy'
            onChange={handleCheckOutDateChange}
            onBlur={handleFilter}
            sx={{ mt: '1rem' }}
            minDate={new Date()}
          />
        </LocalizationProvider>
      </Grid>
    </Container>
  )
}

export default FilterList