/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import userReducer from '../reducer/userReducer';
import { dispacthAction } from '../helpers/dispatchAction';
import { types } from '../types/types';
import { ulrUser } from '../config/config';
import { useNavigate } from 'react-router-dom';
import carReducer from '../reducer/carsReducer';

const getAuthenticate = JSON.parse(localStorage.getItem('auth'));
const getUser = JSON.parse(localStorage.getItem('user'));
const getFavorite = JSON.parse(localStorage.getItem('favorites'));

const CarStates = createContext();
const ContextGlobal = createContext();

const initialState = {
    products: [],
    filter: [],
    filterLoadingProducts: false,
    fav: getFavorite ? getFavorite : [],
    user: getUser ? getUser : { email: null, lastname: null, name: null },
    auth: getAuthenticate ? getAuthenticate : { isLogged: false, username: null, token: null }
}

const Context = ({ children }) => {
    // debugger;
    const [cars, dispatchCars] = useReducer(carReducer, initialState)
    const [carFilter, dispatchCarFilter] = useReducer(carReducer, initialState)
    const [filterLoading, dispatchFilterLoading] = useReducer(carReducer, initialState);
    const [favorites, dispatchFavorites] = useReducer(carReducer, initialState)
    const [userData, dispatchUserData] = useReducer(userReducer, initialState)
    const [authUser, dispatchAuthUser] = useReducer(userReducer, initialState)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('auth')
        localStorage.removeItem('user')
        localStorage.removeItem('favorites')

        dispatchFavorites({ type: 'CLEAR_FAVORITES' }) // Aquí está la corrección

        dispacthAction(dispatchAuthUser, types.GET_LOGOUT_USER, null)
        navigate('/')
    };

    //Al cambiar el estado de auth valida si el token es dif de null y lo setea en el ls
    // y consume el endpoint para obtener los datos del usuario
    useEffect(() => {
        if (authUser.auth.token === null) return;
        localStorage.setItem("auth", JSON.stringify(authUser.auth));
        const fetchData = async (url) => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authUser.auth.token}`
                    }
                }
                const { data } = await axios.get(url, config);
                console.log('getUser', data)
                dispacthAction(dispatchUserData, types.GET_USER, data)
            } catch (err) {
                console.log('Error al obtener usuario', err)
            }
        };

        fetchData(`${ulrUser}/email/${authUser.auth.username}`)
    }, [authUser.auth])

    //Al cambiar el estado de user valida si el email es dif de null y lo setea en el ls
    useEffect(() => {
        if (userData.user.email === null) return;
        localStorage.setItem("user", JSON.stringify(userData.user));
    }, [userData.user])

    // Al cambiar el estado de favorites valida si el fav es dif de null y lo setea en el ls
    useEffect(() => {
        if (favorites.fav.length === 0) return;
        localStorage.setItem("favorites", JSON.stringify(favorites.fav));
    }, [favorites.fav])

    // Esta demás, funciona comoel que sigue (load_favorites)
    // Cargar los favoritos desde localStorage cuando se monta el componente
    // useEffect(() => {
    //     const favs = localStorage.getItem('favorites');
    //     if (favs) {
    //         dispatchFavorites({ type: 'SET_FAVORITES', payload: JSON.parse(favs) });
    //     }
    // }, []);

    // Cargar los favoritos desde localStorage cuando se monta el componente
    useEffect(() => {
        const favs = localStorage.getItem('favorites');
        if (favs) {
            dispatchFavorites({ type: 'LOAD_FAVORITES', payload: JSON.parse(favs) });
        }
    }, [authUser.auth]);

    return (
        <ContextGlobal.Provider value={{
            userData, dispatchUserData,
            authUser, dispatchAuthUser, handleLogout,
        }}>
            <CarStates.Provider value={{
                cars, dispatchCars,
                carFilter, dispatchCarFilter,
                favorites, dispatchFavorites,
                filterLoading, dispatchFilterLoading
            }}>
                {children}
            </CarStates.Provider>
        </ContextGlobal.Provider>
    )
}

export default Context
export const useCarStates = () => useContext(CarStates)
export const useContextGlobal = () => useContext(ContextGlobal);
