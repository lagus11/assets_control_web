import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import React from "react";
import styles from './FilterTable.module.css';
import imgIcono_lupa from '../../../iconos/icono_lupaW.png';

function FilterTable({ _handleSearch }) {


return (
  <div className={styles.cars_filter}>
    <input
      type = "text"
      onChange={(e) => _handleSearch(e.target.value)}
      placeholder={`BUSCAR`}
    />
    <a><img src={imgIcono_lupa}/></a>
  </div>

);
}

export { FilterTable };