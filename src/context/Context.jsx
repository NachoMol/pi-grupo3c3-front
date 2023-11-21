/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
// import api from '../axiosConfig';
import userReducer from '../reducer/userReducer';
import { dispacthAction } from '../helpers/dispatchAction';
import { types } from '../types/types';
import { ulrUser } from '../config/config';
import { useNavigate } from 'react-router-dom';


const getAuthenticate = JSON.parse(localStorage.getItem('auth'));
const getUser = JSON.parse(localStorage.getItem('user'));
const CarStates = createContext();
const ContextGlobal = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_CARS':
            return { ...state, cars: action.payload }
        case 'GET_CAR':
            return { ...state, car: action.payload }
        default:
            return state;
    }
}

const initialState = {
    cars: [],
    car: {},
    user: getUser ? getUser : { email: null, lastname: null, name: null },
    auth: getAuthenticate ? getAuthenticate : { isLogged: false, username: null, token: null }
}

const Context = ({ children }) => {
    // debugger;
    const [state, dispatch] = useReducer(reducer, initialState)
    const [userData, dispatchUserData] = useReducer(userReducer, initialState)
    const [authUser, dispatchAuthUser] = useReducer(userReducer, initialState)
    const navigate = useNavigate()

    
    console.log('user', userData);
    console.log('auth', authUser);

    const handleLogout = () => {
        localStorage.removeItem('auth')
        localStorage.removeItem('user')
        
        dispacthAction(dispatchAuthUser, types.GET_LOGOUT_USER, null)
        navigate('/')
    };

    // useEffect(() => {
    //     axios(api)
    //         .then(res => dispatch({ type: 'GET_ODONTOLOGOS', payload: res.data }))
    // }, [])


    useEffect(() => {
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
                localStorage.setItem("user", JSON.stringify(authUser.auth));
            } catch (err) {
                console.log('Error al obtener usuario', err)
            }
        };

        fetchData(`${ulrUser}/email/${authUser.auth.username}`)
    }, [authUser.auth])
    
    
    useEffect(() => {
        console.log('cambio user', userData.user);
        localStorage.setItem("user", JSON.stringify(userData.user));
    }, [userData.user])


    return (
        <ContextGlobal.Provider value={{
            userData, dispatchUserData,
            authUser, dispatchAuthUser, handleLogout
        }}>
            <CarStates.Provider value={{ state, dispatch }}>
                {children}
            </CarStates.Provider>
        </ContextGlobal.Provider>
    )
}



export default Context

export const useCarStates = () => useContext(CarStates)
export const useContextGlobal = () => useContext(ContextGlobal);


