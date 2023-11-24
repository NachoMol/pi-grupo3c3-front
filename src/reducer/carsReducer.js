import { types } from "../types/types";

const carReducer = (state, action) => {
    switch (action.type) {
        case types.GET_CARS:
            return { ...state, products: action.payload }
        case types.SET_FILTER_CARS:
            return {
                ...state,
                filter: action.payload
            }
        case types.LOADING_FILTER_CARS:
            return {
                ...state,
                filterLoadingProducts: action.payload
            }
        case 'ADD_CAR':
            return {
                ...state,
                cars: [...state.cars, action.payload]
            };
        case 'REMOVE_CAR':
            return {
                ...state,
                cars: state.cars.filter(car => car.id !== action.payload)
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        case 'ADD_FAVORITE':
            return {
                ...state,
                fav: [...state.fav, action.payload]
            };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                fav: state.fav.filter(car => car.id !== action.payload)
            };
            case 'LOAD_FAVORITES':
                return {
                    ...state,
                    fav: action.payload
                };
            case 'CLEAR_FAVORITES':
                return {
                    ...state,
                    fav: []
                };
        default:
            return state;
    }
};

export default carReducer;
