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
                Header: "Tipo",
                accessor: "type"
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