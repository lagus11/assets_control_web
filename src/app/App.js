import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import { AppRoute } from "../router/AppRouter";
import { AuthProvider } from "../auth/context/AuthProvider";
import { AuthMicrosoftProvider } from "../authMicrosoft/context/AuthMicrosoftProvider";
import { WithAxios } from "../intercept/WithAxios";

function App() {
  return (
    <AuthProvider>
      <WithAxios>
        <AuthMicrosoftProvider>
          <HashRouter>
            <AppRoute />
          </HashRouter>
        </AuthMicrosoftProvider>
      </WithAxios>
    </AuthProvider>
  );
}

export { App };
