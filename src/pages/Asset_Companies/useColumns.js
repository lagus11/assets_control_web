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
                Header: "Razón Social",
                accessor: "businessName"
            },
            {
                Header: "Ubicación",
                accessor: "location"
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