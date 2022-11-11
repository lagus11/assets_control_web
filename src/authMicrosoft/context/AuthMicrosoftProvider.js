import React, { useContext, useState } from "react";
import { AuthMicrosoftContext } from './AuthMicrosoftContext';
import MicrosoftLogin from "react-microsoft-login";
import { AuthContext } from "../../auth/context/AuthContext";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/user/userSlice";

export const AuthMicrosoftProvider = ({ children }) => {
    
    const {login, logout} = useContext( AuthContext );
    const [msalInstance, onMsalInstanceChange] = useState(null);
    const dispatch = useDispatch();

    const authSuccessful = (token) => {
        login(token);
        const { user } = jwt_decode(token); //decodifico el token
        dispatch(setUser(user));
    }

    const loginHandler = (err, data, msal) => {

        // some actions
        if (!err && data) {
          
          onMsalInstanceChange(msal);
          const token = {token: "Bearer" + " " + data.idToken.rawIdToken};
          
          axios.post("http://ccnayt.dnsalias.com:9102/" + "/usuario_autorizado/usuario_autorizado/", token)
            .then((response) => {
              authSuccessful(response.data.token);
            })
            .catch((error) => console.log(error.response.data.status));
        }
      };
    
      const logoutMicrosoft = () => {
        sessionStorage.getItem('http://localhost:3000');
        sessionStorage.clear();
        onMsalInstanceChange(null);
        logout();
        //msalInstance.logout();
        //logout();
      };

      const logoutHandler = () => {
        msalInstance.logout();
      }
    
      const loginMicrosoft = () => {
        return msalInstance ? (
          <p onClick={() => logoutHandler()}>Cambiar Usuario</p>
        ) : (
          <MicrosoftLogin
            clientId="777c7e19-8d9c-4b2e-87e5-a3f659d1cf96"
            authCallback={loginHandler}
            buttonTheme="light_short"
          />
        );
      };
   
      return (
        <AuthMicrosoftContext.Provider value={{
            loginMicrosoft: loginMicrosoft,
            logoutMicrosoft: logoutMicrosoft
        }}>
            { children }
        </AuthMicrosoftContext.Provider>
      );
}