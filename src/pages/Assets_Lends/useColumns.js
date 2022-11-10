import { useMemo } from 'react';

function useColumns(){

    const columns = useMemo(
        () => [
            /*{
                Header: "ID Activo",
                accessor: "_id"//"id_activo"
            },*/
            {
                Header: "Num Empleado",
                accessor: "employeeNumber"
            },
            {
                Header: "Nombre",
                accessor: "name"
            },
            {
                Header: "Etiqueta",
                accessor: "idAsset.tag"
            },
            {
                Header: "Fecha Inicio",
                accessor: "dateLendInit"
            },
            {
                Header: "Fecha Entrega",
                accessor: "dateLendFinish"
            },
            
            
        ],
        []
    );


    return (
        columns
    );
}

export { useColumns };