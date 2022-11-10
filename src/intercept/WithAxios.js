import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import axios from "axios";


const axiosJWT = axios.create(
  {
   
    //baseURL: "http://localhost:3000/",
    /*baseURL: "https://prueba6lagus11.herokuapp.com/",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Authorization' : ""
  },
    
   /* headers: {
        
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "http://localhost:3000"
    },*/
  
    
    //"Accept": "application/json",
    //"Content-Type": "application/json"
    
  
  }
);

const WithAxios = ({ children }) => {
  const [isSet, setIsSet] = useState(false); //useState que valida una vez hecho interceptor pasar el children
  const { logout } = useContext(AuthContext); //dispath cerrar la sesion
  
    let access_token = "";

    useEffect(() => {

      axiosJWT.interceptors.request.use(

        (config) => {
          access_token = localStorage.getItem("keyTokenApp");
          if (!!access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      axiosJWT.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error) => {
          const config = error.config;
          if (
            error.response &&
            error.response.status === 401 &&
            !config._retry
          ) {
            config._retry = true;
            let res = await refresh_token();
            if (res.data) {
              localStorage.setItem("keyTokenApp", res.data);
              return axiosJWT(config);
            }
          }
          if (
            error.response &&
            error.response.status === 403 &&
            !config._retry 
          ) {
 
            logout();
          }
          return Promise.reject(error);
        }
      );

      const refresh_token = () => {
        return axiosJWT.post("/refreshToken");
      };
      setIsSet(true);
  }, [logout]);
  return isSet && children;
}

export default axiosJWT;
export { WithAxios };
