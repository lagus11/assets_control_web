import { useMemo } from 'react';

function useColumns(){

    const columns = useMemo(
        () => [
            {
                Header: "ID AccessControl",
                accessor: "_id"//"id_activo"
            },
            {
                Header: "Correo",
                accessor: "email"
            },
            {
                Header: "Nombre",
                accessor: "name"
            },
            {
                Header: "Rol",
                accessor: "role.type.name"
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