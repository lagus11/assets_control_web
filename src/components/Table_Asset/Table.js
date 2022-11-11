import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
  useFilters,
  useFlexLayout,
  useResizeColumns,
} from "react-table";
import "./styles.css";
import { FilterTable } from "../FilterTable/FilterTable";
import { ColumnFilter } from "../ColumnFilter/ColumnFilter";
import { ModalAsset } from "./ModalAsset/ModalAsset";
import { Pagination } from "../PaginationTable/PaginationTable";

import { ViewModalStatus } from "../ViewModalStatus/ViewModalStatus";
import { toast } from "react-hot-toast";
import icono_editar from "../../iconos/icono_editar.png";
import icono_verDetalles from "../../iconos/icono_verDetalles.png";
import icono_asignar from "../../iconos/icono_asignar.png";
import icono_agregar from "../../iconos/icono_agregar.png";
import icono_watchStatus from "../../iconos/icono/icono_watchStatus.png";
import axiosJWT from "../../intercept/WithAxios";
import { ModalDetailsAssets } from "./ModalDetailsAssets/ModalDetailsAssets";
import { useModal } from "../../hooks/useModal";
import { ModalDetailStatus } from "./ModalDetailsStatus/ModalDetailsStatus";
import { useDispatch, useSelector } from "react-redux";
import { getAssetDetails } from "../../store/slices/assetDetails/thunks";
import { getAssignation } from "../../store/slices/assignation/thunks";
import { setAssetSelectStatus } from "../../store/slices/modalSelectStatus/modalSelectStatusSlice";
import { getLend } from "../../store/slices/lend/thunks";
import { getDamaged } from "../../store/slices/damaged/thunks";
import { getRepair } from "../../store/slices/repair/thunks";
import { getLost } from "../../store/slices/lost/thunks";
import { getStolen } from "../../store/slices/stolen/thunks";

function Table({
  useColumns,
  datos,

  fetchData,
  //pageCount: controlledPageCount,
  loading,
  //_handleSearch,
  //total,
  //onSort,

  isAsset,
}) {
  const [equipo, setEquipo] = useState(null); //hook default null indicar que no se pasaran datos
  const [titulo, setTitulo] = useState("Agregar Equipo"); //hook titulo para la ventana modal equipo

  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user); // obtengo el usuario logeado

  const columns = useColumns(); // paso lo de columns
  const [filter, setFilter] = useState(false); //hook sirve poner visible y no invisible campo busqueda

  const [isOpenModal, openModal, closeModal] = useModal(false);

  const [isOpenModalStatus, openModalStatus, closeModalStatus] =
    useModal(false);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const table = useTable(
    {
      columns: columns,
      data: datos,
      //manualPagination: true, //<-agregado forma manual
      //manualSortBy: true,
      initialState: {
        pageSize: 15,
        pageIndex: 0,
      },
      //pageCount: controlledPageCount,
      defaultColumn,
      autoResetPage: false,
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
    state: { globalFilter, pageIndex, pageSize /*,sortBy*/ },
  } = table;

  //effect para buscar datos primera carga
  useEffect(() => {
    fetchData && fetchData(/*{ pageIndex, pageSize }*/);
  }, [/*fetchData, pageIndex, pageSize*/]);

  /*
  useEffect(() => {
    onSort(sortBy);
  }, [onSort, sortBy]);*/

  //funcion pasar los datos de la tabla a la ventana modal
  const llenarDatosEquipo = (datos) => {
    const idAsset = datos.row.original._id;
    axiosJWT.get("/equipos/ver_editar_equipo/" + idAsset).then((response) => {
      setEquipo(response.data);
      openModal();
    });
  };

  const agregar = () => {
    setTitulo("Agregar Equipo"); //indico titulo que sera agregar equipo
    setEquipo(null); //paso hook equipo null para indicarle que sera agregar equipo
    openModal(); //cambio hook a true para abrir la ventana modal
  };

  //obtener los datos actualizados
  async function actualizarEquipos(result) {
    toast.success(result.status);
    fetchData && fetchData(/*{ pageIndex, pageSize }*/);
  }

  async function messageError(result) {
    toast.error(result.status);
  }

  //funcion para verDetalles un equipo en especifico
  const detailEquipo = (datos) => {
    const idAsset = datos.row.original._id;
    dispatch(getAssetDetails(idAsset));
    setTitulo("Equipo");
  };

  const changeOpenModalStatus = (datos) => {
    const asset = {
      _id: datos.row.original._id,
      tag: datos.row.original.tag,
      make: datos.row.original.make,
      model: datos.row.original.model,
      asset_code: datos.row.original.asset_code,
      status: datos.row.original.status,
    };

    dispatch(setAssetSelectStatus({ assetSelectStatus: asset }));
    openModalStatus();
  };

  const viewInfoStatus = (datos) => {
    const idAsset = datos.row.original._id;
    const status = datos.row.original.status;
    switch (status) {
      case "ASIGNADO":
        dispatch(getAssignation(idAsset));
        break;
      case "PRESTAMO":
        dispatch(getLend(idAsset));
        break;
      case "REPARACIÓN":
        dispatch(getRepair(idAsset));
        break;
      case "DAÑADO":
        dispatch(getDamaged(idAsset));
        break;
      case "EXTRAVIADO":
        dispatch(getLost(idAsset));
        break;
      case "ROBADO":
        dispatch(getStolen(idAsset));
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      {isAsset && (
        <>
          {/* Modal para agregar nuevo activo */}
          {
            (user.role.type.name !== "user_read" && !!user.role.type.name) &&
              <ModalAsset
                titulo={titulo} //paso titulo
                isOpen={isOpenModal} //paso hook si esta true o false para abrir la ventana
                closeModal={closeModal} //paso la funcion cerrar modal
                actualizarEquipos={actualizarEquipos} // paso la funcion para actualizar la tabla
                messageError={messageError}
                equipo={equipo} //paso los datos a actualizar o caso contrario null indicar agregar equipo
              />
          }

          {/* Modal para ver las acciones que tendra el activo */}
          {(user.role.type.name !== "user_read" && !!user.role.type.name && isOpenModalStatus) && (
            <ViewModalStatus
              titulo="ESTATUS"
              isOpenModalStatus={isOpenModalStatus}
              closeModalStatus={closeModalStatus}
              actualizarEquipos={actualizarEquipos}
            />
          )}

          {/* Modal ver detalles del status */}
          {
            
              <ModalDetailStatus
                titulo="Detalles Status"
                actualizarEquipos={actualizarEquipos}
              />
          }
        </>
      )}

      {/* Modal para ver mas detalles del activo */}
      <ModalDetailsAssets />

      <div className="container_encabezado">
        <FilterTable
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
         // _handleSearch={_handleSearch}
        />

        <div className="agregar">
          <label>Total de Equipos: {preGlobalFilteredRows.length}</label>
          {isAsset ? (
            (user.role.type.name !== "user_read" && !!user.role.type.name) &&
              <button onClick={agregar}>
                <img src={icono_agregar} alt="icono_agregar" />
                &nbsp;Agregar
              </button>
          ) : (
            <></>
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
                  className="encabezado"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      /*{...column.getHeaderProps()}*/
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
                      <div className="containerFilter">
                        <div
                          className={
                            filter ? "columnFilterOn" : "columnFilterOff"
                          }
                          onClick={() => {
                            setFilter(true);
                          }}
                        >
                          {filter && column.render("Filter")}
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
            {/* Llenado de de los datos en la tabla */}
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
                          {j === columns.length - 1 ? (
                            //botones
                            <div className="contenedor_botones">
                              {isAsset ? (
                                
                                  (user.role.type.name !== "user_read" && !!user.role.type.name) &&
                                  <button
                                    className="button_editar"
                                    title="Editar"
                                    onClick={() => {
                                      llenarDatosEquipo(cell);
                                    }}
                                  >
                                    <img src={icono_editar} alt="icono editar" />
                                  </button>
                                
                              ) : (
                                <></>
                              )}

                              {cell.row.values.status === "STOCK" ? (
                                <>
                                {
                                  (user.role.type.name !== "user_read" && !!user.role.type.name) &&
                                    <button
                                      className="button_asignar"
                                      title="Acciones"
                                      onClick={() => {
                                        changeOpenModalStatus(cell);
                                      }}
                                    >
                                      <img src={icono_asignar} />
                                    </button>
                                }
                                </>
                              ) : (
                                isAsset && (
                                  (user.role.type.name !== "user_read" && !!user.role.type.name) &&
                                    <button
                                      className="button_ver"
                                      title="Visualizar"
                                      onClick={() => {
                                        viewInfoStatus(cell);
                                      }}
                                    >
                                      <img
                                        src={icono_watchStatus}
                                        alt="icono_verStatus"
                                      />
                                    </button>
                                )
                              )}

                              {
                                <button
                                  className="button_eliminar"
                                  onClick={() => {
                                    detailEquipo(cell);
                                  }}
                                >
                                  <img
                                    src={icono_verDetalles}
                                    title="Ver Detalles"
                                    alt="icono_detalles"
                                  />
                                </button>
                              }
                            </div>
                          ) : (
                            cell.render("Cell")
                          )}
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
