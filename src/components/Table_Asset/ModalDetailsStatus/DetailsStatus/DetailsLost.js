import React from "react";
import styles from "../ModalDetailsStatus.module.css";
import { Btn_download } from "../../../buttons/Btn_download/Btn_download";
import axiosJWT from "../../../../intercept/WithAxios";
import { toast } from "react-hot-toast";
import { ViewModalStatus } from "../../../ViewModalStatus/ViewModalStatus";
import { useModal } from "../../../../hooks/useModal";
import { Btn_options } from "../../../buttons/Btn_options/Btn_options";
import { useSelector } from "react-redux";
import { Btn_updatePdf } from "../../../buttons/Btn_updatePdf/Btn_updatePdf";
import { SweetFilePdf } from "../../../SweetFilePdf/SweetFilePdf";

const DetailsLost = ({
  actualizarEquipos
}) => {

  const { lost } = useSelector(state => state.lost);
  const user = useSelector((state) => state.userState.user); // obtengo el usuario logeado

  const [isOpenModalStatus, openModalStatus, closeModalStatus] =
    useModal(false);

    const viewInvestReport = () => {
      axiosJWT
        .get("/status_lost/viewInvestReport/" + lost.investReport_url, {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "ActInv_" + lost.investReport_url);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          if (error.response.status === 404) toast.error("PDF NO ENCONTRADO");
        });
    };
  
    const viewReceiPayment = () => {
      axiosJWT
        .get("/status_lost/viewReceiPayment/" + lost.receiPayment_url, {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "RecCob" + lost.receiPayment_url);
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
          formData.append("file", response.value, lost.investReport_url);
          axiosJWT
            .post("/status_lost/updateInvestReport/", formData)
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
          formData.append("file", response.value, lost.receiPayment_url);
          axiosJWT
            .post("/status_lost/updateReceiPayment/", formData)
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
          <label>Número de Empleado</label>
          <input value={lost?.employeeNumber} disabled />
        </div>

        <div>
          <label>Nombre Completo</label>
          <input value={lost?.fullNameEmployee} disabled />
        </div>

        <div>
          <label>Fecha Extraviado</label>
          <input value={lost?.dateLost} disabled />
        </div>

        <div></div>

        <div>
          <label>Acta de Investigación</label>
          <Btn_download title={"Descargar"} onClick={viewInvestReport} />
        </div>

        <div>
          <label>Recibo de Cobro</label>
          <Btn_download title={"Descargar"} onClick={viewReceiPayment} />
        </div>
      </div>

      {(user.role.type.name !== "user_read" && !!user.role.type.name && isOpenModalStatus) && (
        <ViewModalStatus
          titulo="ESTATUS EXTRAVIADO"
          isOpenModalStatus={isOpenModalStatus}
          closeModalStatus={closeModalStatus}
          dataStatus={lost.idAsset}
          actualizarEquipos={actualizarEquipos}
        />
      )}

      {
        (user.role.type.name !== "user_read" && !!user.role.type.name) &&
        <div className={styles.container_buttons}>
          <Btn_options title={"Opciones"} onClick={openModalStatus} />
          <Btn_updatePdf title={"Acta Inv."} onClick={updateInvestReport} />
          <Btn_updatePdf title={"Recibo Cob."} onClick={updateReceiPayment} />
        </div>
      }

    </>
  );
};

export default DetailsLost;
