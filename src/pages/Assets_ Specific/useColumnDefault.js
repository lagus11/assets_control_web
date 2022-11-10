import React, { useMemo } from 'react';
import { statusBackgroundMap, statusColorMap } from '../../utils/colorsColumns';

function useColumnDefault(){

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
            }
            
        ],
        []
    );

    return (
        columns
    );
}

export { useColumnDefault };