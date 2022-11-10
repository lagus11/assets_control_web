import React, { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import axiosJWT from "../intercept/WithAxios";

export const useFetchData = (uri) => {
  const [loadingData, setLoadingData] = useState(true); //hook para preguntar si ya se cargaron los datos
  const [datos, setDatos] = useState([]); //hook para guardar los datos de consulta de equipos
  const fetchIdRef = useRef(0);

  const fetchAPIData = async () => {
    setLoadingData(true);
    await axiosJWT
      .get(uri)
      .then((response) => {
        setDatos(response.data); //paso los datos json al hook
        setLoadingData(false); //paso falso indicar ya tengo los datos
      })
      .catch((error) => {
        setLoadingData(false);
        toast.error(error.response.data);
      });
  };

  const fetchData = useCallback(() => {
    const fetchId = ++fetchIdRef.current;
    setLoadingData(true);
    if (fetchId === fetchIdRef.current) {
      fetchAPIData();
    }
  });
  return [fetchData, datos, loadingData];
};
