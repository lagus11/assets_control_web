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
                Header: "Dirección",
                accessor: "address"
            },
            {
                Header: "Teléfono",
                accessor: "phone_number"
            },
            {
                Header: "Correo",
                accessor: "email"
            },
            {
                Header: "Tipo",
                accessor: "type"
            },
            {
                Header: "Comentario",
                accessor: "comment"
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