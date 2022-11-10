import React, { useEffect, useState } from "react";
import axiosJWT from "../../intercept/WithAxios";
import { Field } from "formik";

function Select_location({classNameLabel = "", classNameInput = "", type = "ALMACEN"}) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axiosJWT
      .get("/ubicaciones/ver_ubicaciones")
      .then((response) => {
        setLocations(response.data); //paso los datos json al hook
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <label className={classNameLabel}>UBICACIÓN</label>
      <Field name="location" as="select" className={classNameInput}  required>
        <option value="" disabled>
          SELECCIONE UBICACIÓN
        </option>
        {locations.map((location) => {
          if(location.type === type){
            return (
              <option key={location._id} value={location._id}>
                {location.name}
              </option>
            );
          }
        })}
      </Field>
    </>
  );
}

export { Select_location };
