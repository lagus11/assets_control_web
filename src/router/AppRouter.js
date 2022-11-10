import { Route, Routes } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import React from "react";

import { Login } from "../pages/Login/Login";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Assets } from "../pages/Assets/Assets";
import { Assets_Drop } from "../pages/Assets_Drop/Assets_Drop";
import { Suppliers } from "../pages/Suppliers/Suppliers";
import { Equipment_Types } from "../pages/Equipment_Types/Equipment_Types";
import { Asset_Companies } from "../pages/Asset_Companies/Asset_Companies";
import { AccessControl } from "../pages/AccessControl/AccessControl";
import { Locations } from "../pages/Locations/Locations"

import { Assets_Lends } from "../pages/Assets_Lends/Assets_Lends"; 
import { Assets_Specific } from "../pages/Assets_ Specific/Assets_Specific";
import { Assets_General } from "../pages/Assets_General/Assets_General"; 



function AppRoute() {

/*
  const { AsyncDispatch } = useContext( AuthContext );
  useEffect(() => {
    AsyncDispatch();
  },[]);
*/
  return (
    <>
      <Routes>
        <Route exact path="login/*"
          element={
            <PublicRoute>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route>404 Not Found!</Route>
                </Routes>
            </PublicRoute>
          }
        />

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Routes>
                  <Route exact path="/" element={<Dashboard />} />
          
                    <Route exact path="/equipos" element={<Assets />} />
              
                  <Route exact path="/equipos_Baja" element={<Assets_Drop />} />
                  <Route exact path="/proveedor" element={<Suppliers />} />
                  <Route exact path="/Tipos_Equipos" element={<Equipment_Types />} />
                  <Route exact path="/empresas_activo" element={<Asset_Companies />} />
                  <Route exact path="/control_accesso" element={<AccessControl />} />
                  <Route exact path="/ubicaciones" element={<Locations />} />
                  
                  <Route exact path="/equipos_prestamo" element={<Assets_Lends />} />
                  <Route exact path="/equipos_Especifico" element={<Assets_Specific />} />

                  <Route exact path="/equipos_General" element={<Assets_General />} />

                  <Route>404 Not Found!</Route>
                </Routes>
              </PrivateRoute>
            }
          />
      </Routes>
    </>
  );
}

export { AppRoute };
