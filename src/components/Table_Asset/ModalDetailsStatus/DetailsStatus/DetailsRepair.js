import React from "react";
import styles from "../ModalDetailsStatus.module.css";
import { Btn_download } from "../../../buttons/Btn_download/Btn_download";
import axiosJWT from "../../../../intercept/WithAxios";
import { toast } from "react-hot-toast";
import { ViewModalStatus } from "../../../ViewModalStatus/ViewModalStatus";
import { useModal } from "../../../../hooks/useModal";
import { Btn_options } from "../../../buttons/Btn_options/Btn_options";
import { useSelector } from "react-redux";
import { SweetFilePdf } from "../../../SweetFilePdf/SweetFilePdf";
import { Btn_updatePdf } from "../../../buttons/Btn_updatePdf/Btn_updatePdf";

const DetailsRepair = ({ actualizarEquipos }) => {
  const { repair } = useSelector((state) => state.repair);
  const user = useSelector((state) => state.userState.user); // obtengo el usuario logeado

  const [isOpenModalStatus, openModalStatus, closeModalStatus] =
    useModal(false);

  const viewPdf = () => {
    axiosJWT
      .get("/status_repair/viewPdf/" + repair.invoice_url, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "FACTURA_" + repair.invoice_url);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        if (error.response.status === 404) toast.error("PDF NO ENCONTRADO");
      });
  };

  const updateInvoice= () => {
    SweetFilePdf()
      .then((response) => {
        const formData = new FormData();
        formData.append("file", response.value, repair.invoice_url);
        axiosJWT
          .post("/status_repair/updateInvoice/", formData)
          .then((response) => {
            toast.success(response.data.status);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={styles.container_data}>
        <div>
          <label>Proveedor</label>
          <input value={repair?.supplier?.name} disabled />
        </div>

        <div>
          <label>Fecha Reparación</label>
          <input value={repair?.dateRepair} disabled />
        </div>

        <div>
          <label>Factura</label>
          <Btn_download title={"Descargar"} onClick={viewPdf} />
        </div>
      </div>

      {user.role.type.name !== "user_read" &&
        !!user.role.type.name &&
        isOpenModalStatus && (
          <ViewModalStatus
            titulo="ESTATUS REPARACIÓN"
            isOpenModalStatus={isOpenModalStatus}
            closeModalStatus={closeModalStatus}
            dataStatus={repair.idAsset}
            actualizarEquipos={actualizarEquipos}
          />
        )}

      {(user.role.type.name !== "user_read" && !!user.role.type.name) && (
          <div className={styles.container_buttons}>
            <Btn_options title={"Opciones"} onClick={openModalStatus} />
            <Btn_updatePdf title={"Factura"} onClick={updateInvoice} />
          </div>
        )}
    </>
  );
};

export default DetailsRepair;
