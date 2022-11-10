import React, { useRef, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
  useFilters,
  useResizeColumns,
} from "react-table";
import styles from "../Table/styles.module.css";
import { FilterTable } from "../FilterTable/FilterTable";
import { ColumnFilter } from "../ColumnFilter/ColumnFilter";
import { Pagination } from "../PaginationTable/PaginationTable";
import { getExcel } from "../../utils/exportTableToExcel";
import { Btn_tableToExcel } from "../buttons/Btn_tableToExcel/Btn_tableToExcel";

//https://codesandbox.io/s/react-table-custom-filtering-multiple-values-filter-forked-uej3jo?file=/index.js

function TableLends({ useColumns, datos, loading, title }) {
  const columns = useColumns(); // paso lo de columns
  const [isFilter, setIsFilter] = useState(false);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const table = useTable(
    {
      columns: columns,
      data: datos,
      initialState: {
        pageSize: 15,
        pageIndex: 0,
      },
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useResizeColumns,
    usePagination
  );

  const {
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    PageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    filterValue,
    preFilteredRows,
    setFilter,
    id,
    state: { globalFilter, pageIndex, pageSize },
  } = table;






  /******************************************* */
  //funcion que filtra solo un dato en columna
  /* function SelectColumnFilter(
     { filterValue, setFilter, preFilteredRows, id }
  ) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
       
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }*/


  return (
    <div className={styles.container}>
      
      <div className={styles.container_encabezado}>
        <FilterTable
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />

        <div className={styles.agregar}>
          <label>
            Total de Equipos {title} : {preGlobalFilteredRows.length}
          </label>
          <Btn_tableToExcel title={"Generar excel"} onClick={() => { getExcel(headerGroups, rows)}} />
        </div>
      </div>

      {loading ? (
        <p>Loading... Please Wait</p>
      ) : (
        <>
          <table id="table-to-xls" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className={styles.encabezado}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    
                      
                    
                    <th
                      /*{...column.getHeaderProps()} */
                      key={column.id}
                      className={
                        column.isSorted
                          ? column.isSortedDesc
                            ? "desc"
                            : "asc"
                          : ""
                      }
                    >
                      {/*SelectColumnFilter(column)*/}
                      
                      {/* Span que muestra el encabezado junto la accion de ordernas asc y des por columna */}
                      <span {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                      </span>
                      <div
                        {...column.getResizerProps()}
                        className={[
                          "ResizeHandle",
                          column.isResizing && "ResizeHandleActive",
                        ]
                          .filter((x) => x)
                          .join(" ")}
                      >
                        &#x22EE;
                      </div>

                      {/* Div que envuelve las acciones para mostrar u ocultar el filtrado por columna */}
                      <div className={styles.containerFilter}>
                        <div
                          className={
                            isFilter
                              ? styles.columnFilterOn
                              : styles.columnFilterOff
                          }
                          onClick={() => {
                            setIsFilter(true);
                          }}
                        >
                          {isFilter ? column.render("Filter") : null}
                        </div>
                        {isFilter ? (
                          <span
                            onClick={() => {
                              setIsFilter(false);
                            }}
                          >
                            X
                          </span>
                        ) : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, j) => {
                      return (
                        <td
                          data-label={columns[j].Header}
                          {...cell.getCellProps()}
                          title={cell.value}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageSize={pageSize}
            previousPage={previousPage}
            nextPage={nextPage}
            setPageSize={setPageSize}
          />
        </>
      )}
      
    </div>
  );
}

export { TableLends };
