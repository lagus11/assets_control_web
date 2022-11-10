
import Swal from "sweetalert2";

async function SweetFilePdf() {

  return Swal.fire({
    title: 'Seleccione PDF',
    input: 'file',
    confirmButtonColor: "#1C851C",
    inputAttributes: {
      'accept': '.pdf',
      'aria-label': 'Upload your profile picture'
    }
  })
}

export { SweetFilePdf };
