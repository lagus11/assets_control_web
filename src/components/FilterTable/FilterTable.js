import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import React from "react";
import styles from './FilterTable.module.css';
import imgIcono_lupa from '../../iconos/icono_lupaW.png';

function FilterTable({ globalFilter, setGlobalFilter }) {
    const [value, setValue] = useState(globalFilter);

const onFilterChange = useAsyncDebounce(
  (value) => setGlobalFilter(value || undefined),
  200
);

const handleInputChange = (e) => {
  setValue(e.target.value);
  onFilterChange(e.target.value);
};

return (
  <div className={styles.cars_filter}>
    <input
      type = "text"
      onChange={handleInputChange}
      placeholder={`BUSCAR`}
    />
    <a><img src={imgIcono_lupa}/></a>
  </div>

);
}

export { FilterTable };