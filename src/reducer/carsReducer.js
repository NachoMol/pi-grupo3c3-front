const carReducer = (state, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default carReducer;
