import axios from 'axios'
import {useContext, createContext, useState, useReducer, useEffect} from 'react'
import api from '../axiosConfig'

const CarStates = createContext()
