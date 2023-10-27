import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import api from '../axiosConfig';
import axios from 'axios';

const CarStates = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case 'GET_CARS':
            return {...state, cars: action.payload}
        case 'GET_CAR':
            return {...state, car: action.payload}
        default:
            throw new Error()
    }
}

const initialState = {
    cars: [],
    car: {},
}

const Context = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        axios(api)
        .then(res => dispatch({type: 'GET_ODONTOLOGOS', payload: res.data}))
    }, [])


    return (
        <CarStates.Provider value={{state,dispatch}}>
            {children}
        </CarStates.Provider>
    )
}



export default Context

export const useCarStates = () => useContext(CarStates)

