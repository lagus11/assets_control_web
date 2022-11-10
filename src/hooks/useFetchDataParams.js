import React, { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import axiosJWT from "../intercept/WithAxios";

export const useFetchDataParams = (uri, isAsset = 0) => { 
  const [loading, setLoading] = useState(true); //hook para preguntar si ya se cargaron los datos
  const [datos, setDatos] = useState([]); //hook para guardar los datos de consulta de equipos
  const fetchIdRef = useRef(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByData, setSortByData] = useState(undefined);

  const fetchAPIData = async ({ limit, skip, search, sort }) => {
    setLoading(true);
    axiosJWT
      .get(
        `${uri}/?isAsset=${isAsset}&limit=${limit}&skip=${skip}&search=${search}&sortByid=${
          sort?.id || ""
        }&sortByDesc=${sort?.desc || ""}`
      )
      .then((response) => {
        setDatos(response.data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.response.status));
  };
  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      if (fetchId === fetchIdRef.current) {
        fetchAPIData({
          limit: pageSize,
          skip: pageSize * pageIndex,
          search: searchTerm,
          sort: sortByData,
        });
      }
    },
    [searchTerm, sortByData]
  );

  //busqueda global
  const _handleSearch = _.debounce(
    (search) => {
      setSearchTerm(search);
    },
    1500,
    {
      maxWait: 1500,
    }
  );

   //ordenar asc o des
  const handleSort = (sortBy) => {
    setSortByData(sortBy[0]);
  };

  return [_handleSearch, fetchData, datos, loading, handleSort];

}