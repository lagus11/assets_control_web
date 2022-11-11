import React, { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import axiosJWT from "../intercept/WithAxios";

export const useFetchDataParams = (uri, isAsset = 0) => { 
  const [loading, setLoading] = useState(true); //hook para preguntar si ya se cargaron los datos
  const [datos, setDatos] = useState([]); //hook para guardar los datos de consulta de equipos
  const fetchIdRef = useRef(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByData, setSortByData] = useState(undefined);

  const fetchAPIData = async () => {
    setLoading(true);
    axiosJWT
      .get(
        `${uri}/?isAsset=${isAsset}`
      )
      .then((response) => {
        setDatos(response.data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.response.status));
  };
  const fetchData = useCallback(
    () => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      if (fetchId === fetchIdRef.current) {
        fetchAPIData();
      }
    },
    [searchTerm, sortByData]
  );

 
  return [ fetchData, datos, loading ];

}