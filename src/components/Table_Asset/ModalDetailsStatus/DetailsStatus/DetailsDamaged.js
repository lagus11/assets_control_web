import React from "react";
import styles from "../ModalDetailsStatus.module.css";
import { Btn_download } from "../../../buttons/Btn_download/Btn_download";
import axiosJWT from "../../../../intercept/WithAxios";
import { toast } from "react-hot-toast";
import { ViewModalStatus } from "../../../ViewModalStatus/ViewModalStatus";
import { useModal } from "../../../../hooks/useModal";
import { Btn_options } from "../../../buttons/Btn_options/Btn_options";
import { useDispatch, useSelector } from "react-redux";
import { Btn_updatePdf } from "../../../buttons/Btn_updatePdf/Btn_updatePdf";
import { SweetFilePdf } from "../../../SweetFilePdf/SweetFilePdf";

const DetailsDamaged = ({ actualizarEquipos }) => {
  const { damaged } = useSelector((state) => state.damaged);
  const user = useSelector((state) => state.userState.user); // obtengo el usuario logeado

  const [isOpenModalStatus, openModalStatus, closeModalStatus] =
    useModal(false);

  const viewInvestReport = () => {
    axiosJWT
      .get("/status_damaged/viewInvestReport/" + damaged.investReport_url, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ActInv_" + damaged.investReport_url);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        if (error.response.status === 404) toast.error("PDF NO ENCONTRADO");
      });
  };

  const viewReceiPayment = () => {
    axiosJWT
      .get("/status_damaged/viewReceiPayment/" + damaged.receiPayment_url, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "RecCob_" + damaged.receiPayment_url);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        if (error.response.status === 404) toast.error("PDF NO ENCONTRADO");
      });
  };

  const updateInvestReport= () => {
    SweetFilePdf()
      .then((response) => {
        const formData = new FormData();
        formData.append("file", response.value, damaged.investReport_url);
        axiosJWT
          .post("/status_damaged/updateInvestReport/", formData)
          .then((response) => {
            toast.success(response.data.status);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const updateReceiPayment= () => {
    SweetFilePdf()
      .then((response) => {
        const formData = new FormData();
        formData.append("file", response.value, damaged.receiPayment_url);
        axiosJWT
          .post("/status_damaged/updateReceiPayment/", formData)
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
          <label>NÚMERO EMPLEADO</label>
          <input value={damaged?.employeeNumber} disabled />
        </div>

        <div>
          <label>NOMBRE COMPLETO</label>
          <input value={damaged?.fullNameEmployee} disabled />
        </div>

        <div>
          <label>FECHA DAÑADO</label>
          <input value={damaged?.dateDamaged} disabled />
        </div>

        <div></div>

        <div>
          <label>Acta de investigación</label>
          <Btn_download title={"Descargar"} onClick={viewInvestReport} />
        </div>

        <div>
          <label>Recibo de cobro</label>
          <Btn_download title={"Descargar"} onClick={viewReceiPayment} />
        </div>
      </div>

      {user.role.type.name !== "user_read" &&
        !!user.role.type.name &&
        isOpenModalStatus && (
          <ViewModalStatus
            titulo="ESTATUS DAÑADO"
            isOpenModalStatus={isOpenModalStatus}
            closeModalStatus={closeModalStatus}
            actualizarEquipos={actualizarEquipos}
          />
        )}

      {(user.role.type.name !== "user_read" &&
        !!user.role.type.name) && (
          <div className={styles.container_buttons}>
            <Btn_options title={"Opciones"} onClick={openModalStatus} />
            <Btn_updatePdf title={"Acta Inv."} onClick={updateInvestReport} />
            <Btn_updatePdf title={"Recibo Cob."} onClick={updateReceiPayment} />
          </div>
        )}
    </>
  );
};

export default DetailsDamaged;
