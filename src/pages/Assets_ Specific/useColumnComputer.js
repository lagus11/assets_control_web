import React, { useMemo } from 'react';
import { statusBackgroundMap, statusColorMap } from '../../utils/colorsColumns';

function useColumnsComputer(){
    const columns = useMemo(
        () => [
            {
                Header: "ID Activo",
                accessor: "_id",
                id: "_id"
            },
            {
                Header: "Etiqueta",
                accessor: "tag",
                id: "tag"
            },
            {
                Header: "Marca",
                accessor: "make",
                id: "make"
            },
            {
                Header: "Modelo",
                accessor: "model",
                id: "model"
            },
            {
                Header: "Num Serie",
                accessor: "serial_number",
                id: "serial_number"
            },
            {
                Header: "Estatus",
                accessor: "status",
                id: "status",
                Cell: (props) => {
                    return (
                        <p style={{color: statusColorMap[props.value], backgroundColor: statusBackgroundMap[props.value], borderRadius: "4px"}}>
                            {props.value}
                        </p>
                    );
                }
            },
            {
                Header: "Factura",
                accessor: "invoice",
                id: "invoice"
            },
            {
                Header: "Ubicación",
                accessor: "location.name",
                id: "location.name"
            },
            {
                Header: "Fecha Compra",
                accessor: "datePurchase",//"fecha_compra"
                id: "datePurchase"
            },
            {
                Header: "S.O.",
                accessor: "desktopDetail.so",//"fecha_compra"
                id: "desktopDetail.so"
            },
            {
                Header: "Procesador",
                accessor: "desktopDetail.procesador",//"fecha_compra"
                id: "desktopDetail.procesador"
            },
            {
                Header: "GB",
                accessor: "desktopDetail.gb",//"fecha_compra"
                id: "desktopDetail.gb"
            },
                        
        ],
        []
    );

    return (
        columns
    );
}

export { useColumnsComputer };