import React, { useMemo } from 'react';
import { statusBackgroundMap, statusColorMap } from '../../utils/colorsColumns';

function useColumns(){

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
                Header: "Cod Activo",
                accessor: "asset_code",
                id: "asset_code"
            },
            {
                Header: "Tipo Activo",
                accessor: "asset_type",
                id: "asset_type"
            },
            {
                Header: "Tipo Equipo",
                accessor: "equipment_type.name",
                id: "equipment_type.name"
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
                Header: "Proveedor",
                accessor: "supplier.name",
                id: "supplier.name"
            },
            {
                Header: "Empresa Activo",
                accessor: "asset_company.name",
                id: "asset_company.name"
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
                Header: "Acción"
        
            }
            
        ],
        []
    );

    return (
        columns
    );
}

export { useColumns };