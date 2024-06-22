import React, { createContext, useReducer } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password })
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        user: response.data.user,
        token: response.data.token
      }
    })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
