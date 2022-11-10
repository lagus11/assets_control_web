import React from "react";
import jwt_decode from "jwt-decode";

export const validTimeToken = (token) => {
  //if verifica si existe un token
  if (!!token) {
    try{
      let currentDate = new Date(); //obtengo la fecha
      const decodedToken = jwt_decode(token); //decodifico el token
  
      if (decodedToken.exp * 1000 > currentDate.getTime()) { //valido que fecha token sea mayor fecha actual
          console.log("token valido"); 
        return true;
      } else {
        //caso de que token sea menor a la fecha actual
          console.log("token agotado");
          localStorage.removeItem('keyTokenApp');
          sessionStorage.getItem('http://localhost:3000');
          sessionStorage.clear();
          return false;
      }
    }catch(error){
      //try and catch validar formato correcto del token si no mando login
      console.log("Token Invalido");
      return false;
    }
  }
  console.log("ningun token"); 
  return false;
};
