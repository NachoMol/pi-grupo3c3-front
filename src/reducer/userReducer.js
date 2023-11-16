import { types } from "../types/types"

const userReducer = (state, action) => {
  switch (action.type) {

    case types.GET_USER:
      return {
        ...state,
        user: action.payload
      }
    case types.GET_AUTHENTICATE_USER:
      return {
        ...state,
        auth: {
          ...state.auth,
          ...action.payload,
          isLogged: true
        }
      }
    case types.AUTHENTICATE_MESSAGE:
      return {
        ...state,
        authMsg: action.payload
      }
    case types.GET_LOGOUT_USER:
      return {
        ...state,
        auth: {
          isLogged: false,
          username: null,
          token: null
        },
        user: {
          email: null,
          lastname: null,
          name: null
        }
        
      }
    default:
      return state
  }
}

export default userReducer
