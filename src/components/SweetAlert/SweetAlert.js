import React from 'react';
import Swal from 'sweetalert2';

async function SweetAlert (message){

    return(
        Swal.fire({
            title: "Alerta",
            text: message,
            icon: "error",
            reverseButtons: true,
            confirmButtonText: "Eliminar",
            confirmButtonColor: "#E24646",
            showDenyButton: true,
            denyButtonText: "Cancelar",
            denyButtonColor: "#1C851C"
        })
    );
}

export { SweetAlert };