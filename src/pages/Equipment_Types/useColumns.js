import { useMemo } from 'react';

function useColumns(){

    const columns = useMemo(
        () => [
            {
                Header: "ID Activo",
                accessor: "_id"//"id_activo"
            },
            {
                Header: "Nombre",
                accessor: "name"
            },
            {
                Header: "Descripción",
                accessor: "description"
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