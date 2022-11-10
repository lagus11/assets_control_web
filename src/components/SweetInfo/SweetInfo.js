import React from "react";
import swal from "sweetalert2";

async function SweetInfo(message) {
  return swal.fire({
    title: "Historial Equipo",
    html: `# Empleado: ${message.EmployeeNumber} <br />
           Nombre: ${message.fullNameEmployee} <br />
             Fecha Entrega: ${message.dateDelivery}
            `,
    confirmButtonColor: "#1C851C",
    confirmButtonText: "Cerrar",
  });
}

export { SweetInfo };
