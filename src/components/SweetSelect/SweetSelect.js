import React from "react";
import Swal from "sweetalert2";

async function SweetSelect(options, type = "CEDIS") {
  let myArrayOfThings = {};

  for (const option of options) {
    if (type === option.type) {
      myArrayOfThings = { ...myArrayOfThings, [`${option._id}`]: option.name };
    }
  }

  return Swal.fire({
    title: "Selecciona una ubicación",
    input: "select",
    inputOptions: myArrayOfThings,
    inputPlaceholder: "Selecciona una ubicación",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#1C851C",
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value !== '') {
          resolve()
        } else {
          resolve('Necesitas seleccionar una ubicación')
        }
      })
    }
  });
}

export { SweetSelect };
