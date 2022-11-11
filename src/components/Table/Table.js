import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
  useFilters,
  useResizeColumns,
} from "react-table";
import styles from "./styles.module.css";
import { SweetAlert } from "../SweetAlert/SweetAlert";
import { FilterTable } from "../FilterTable/FilterTable";
import { ColumnFilter } from "../ColumnFilter/ColumnFilter";
import { Pagination } from "../PaginationTable/PaginationTable";
//import toast from "react-hot-toast";
import icono_editar from "../../iconos/icono_editar.png";
import icono_eliminar from "../../iconos/icono_eliminar.png";
import icono_agregar from "../../iconos/icono_agregar.png";
import axiosJWT from "../../intercept/WithAxios";
import { useSelector } from "react-redux";

function Table({
  title,
  useColumns,
  datos,
  openModal,
  actualizar,
  loading,
  setDataUpdate,
  DeleteUri,
}) {
  const columns = useColumns(); // paso lo de columns
  const [dataRow, setDataRow] = useState(null);
  const [filter, setFilter] = useState(false);
  const user = useSelector((state) => state.userState.user); // obtengo el usuario logeado

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
    state: { globalFilter, pageIndex, pageSize },
  } = table;

  //solicitar get datos al cargar la pagina
  useEffect(() => {
    actualizar && actualizar();
  }, []);

  //solicitar get datos al agregar, actualizar o borrar dato
  async function actualizarDatos(result) {
    //toast.success(result.status);
    actualizar && actualizar();
  }

  async function messageError(result) {
    //toast.error(result.status);
  }

  const agregar = () => {
    //setTitulo("Agregar"); //indico titulo que sera agregar equipo
    setDataRow(null); //paso hook equipo null para indicarle que sera agregar equipo
    openModal(); //cambio hook a true para abrir la ventana modal
  };

  const llenarDatos = (datos) => {
    setDataUpdate(datos.row.original);
    openModal();
  };

  const eliminar = (datos) => {
    //pregunto si esta seguro eliminar a traves libreria sweet
    SweetAlert("Estás Seguro que desea eliminar este registro?").then((res) => {
      if (res.isConfirmed) {
        axiosJWT
          .delete(`${DeleteUri}/${datos.row.original._id}`)
          .then((response) => {
            actualizarDatos(response.data); //Hice otra funcion para actualizar los datos.
          })
          .catch((error) => messageError(error.response.status));
      }
    });
  };

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
            Total {title}: {preGlobalFilteredRows.length}
          </label>
          {((user.role.type.name !== "user_read" && 
             user.role.type.name !== "user_type_equipment") 
             && !!user.role.type.name) && (
            <button onClick={agregar}>
              <img src={icono_agregar} alt="icono_agregar" />
              &nbsp;Agregar
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Loading... Please Wait</p>
      ) : (
        <>
          <table {...getTableProps()}>
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
                            filter
                              ? styles.columnFilterOn
                              : styles.columnFilterOff
                          }
                          onClick={() => {
                            setFilter(true);
                          }}
                        >
                          {filter ? column.render("Filter") : null}
                        </div>
                        {filter ? (
                          <span
                            onClick={() => {
                              setFilter(false);
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
                          {j === columns.length - 1
                            ? //botones

                              
                              ((user.role.type.name !== "user_read" &&
                                user.role.type.name !== "user_type_equipment"
                              ) && !!user.role.type.name) && (
                                <div className={styles.contenedor_botones}>
                                  <button
                                    className={styles.button_editar}
                                    title="Editar"
                                    onClick={() => {
                                      llenarDatos(cell);
                                    }}
                                  >
                                    <img
                                      src={icono_editar}
                                      alt="icono editar"
                                    />
                                  </button>
                                  <button
                                    className={styles.button_eliminar}
                                    title="Eliminar"
                                    onClick={() => {
                                      eliminar(cell);
                                    }}
                                  >
                                    <img
                                      src={icono_eliminar}
                                      alt="icono_eliminar"
                                    />
                                  </button>
                                </div>
                              )
                            : cell.render("Cell")}
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

export { Table };
