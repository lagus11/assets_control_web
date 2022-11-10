import React from 'react';
import { useNavigate } from "react-router-dom";

export function changeSession(logout){
    const navigate = useNavigate();

    const backLogin = () => {
        setTimeout(() => { 
            logout();
            navigate('../login');
        },4000);
    }

    return [backLogin];
}