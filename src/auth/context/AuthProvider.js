import React from 'react';
import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

import { validTimeToken } from './validTimeToken';
import { types } from '../types/types';

const initialState = {
    logged: false,
    token: ""
}

const init = () => {
    
        const token = localStorage.getItem('keyTokenApp');
        //const resultvalidTimeToken = validTimeToken(token); //paso token y calculo si es valido tiempo
        return {
            logged: token? true: false,
            token: token
        }
}

export const AuthProvider = ({ children }) => {

    const [ authState, dispatch ] = useReducer( authReducer, initialState, init);
    
    
    const login = (token = '') => {
        const action = {
            type: types.login,
            payload: token
        }
        localStorage.setItem('keyTokenApp', token);
        dispatch(action);
    }

    const logout = () => {
        localStorage.removeItem('keyTokenApp');
        
        const action = {
            type: types.logout
        };
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{
            ...authState,

            // Methods
            login: login,
            logout: logout,
         }}>
            { children }
        </AuthContext.Provider>
    );
}