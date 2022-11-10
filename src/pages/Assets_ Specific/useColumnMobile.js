import React, { useMemo } from 'react';
import { statusBackgroundMap, statusColorMap } from '../../utils/colorsColumns';

function useColumnsMobile(){

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
                Header: "Num Telefono",
                accessor: "mobileDetail.numberPhone",//"fecha_compra"
                id: "mobileDetail.numberPhone"
            },
            {
                Header: "Imei",
                accessor: "mobileDetail.imei",//"fecha_compra"
                id: "mobileDetail.imei"
            },
            {
                Header: "Compañia",
                accessor: "mobileDetail.company",//"fecha_compra"
                id: "mobileDetail.company"
            }

            
        ],
        []
    );

    return (
        columns
    );
}

export { useColumnsMobile };