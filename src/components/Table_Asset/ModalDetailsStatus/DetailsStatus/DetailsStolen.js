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

const DetailsStolen = ({
  actualizarEquipos
}) => {

  const { stolen } = useSelector(state => state.stolen);
  const user = useSelector((state) => state.userState.user); // obtengo el usuario logeado

  const [isOpenModalStatus, openModalStatus, closeModalStatus] =
    useModal(false);

  const viewInvestReport = () => {
    axiosJWT
      .get("/status_stolen/viewInvestReport/" + stolen.investReport_url, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ActInv_" + stolen.investReport_url);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        if (error.response.status === 404) toast.error("PDF NO ENCONTRADO");
      });
  };

  const viewActPublMinistry = () => {
    axiosJWT
      .get(
        "/status_stolen/viewActPublMinistry/" + stolen.actPublMinistry_url,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          "ActMinisPublic_" + stolen.actPublMinistry_url
        );
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
        formData.append("file", response.value, stolen.investReport_url);
        axiosJWT
          .post("/status_stolen/updateInvestReport/", formData)
          .then((response) => {
            toast.success(response.data.status);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const updateActPublMinistry = () => {
    SweetFilePdf()
      .then((response) => {
        const formData = new FormData();
        formData.append("file", response.value, stolen.actPublMinistry_url);
        axiosJWT
          .post("/status_stolen/updateActPublMinistry/", formData)
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
          <input value={stolen?.employeeNumber} disabled />
        </div>

        <div>
          <label>Nombre Completo</label>
          <input value={stolen?.fullNameEmployee} disabled />
        </div>

        <div>
          <label>Fecha de Robo</label>
          <input value={stolen?.dateStolen} disabled />
        </div>

        <div></div>

        <div>
          <label>Acta de Ministerio Público</label>
          <Btn_download title={"Descargar"} onClick={viewActPublMinistry} />
        </div>

        <div>
          <label>Acta de Investigación</label>
          <Btn_download title={"Descargar"} onClick={viewInvestReport} />
        </div>
      </div>

      {(user.role.type.name !== "user_read" && !!user.role.type.name && isOpenModalStatus) && (
        <ViewModalStatus
          titulo="ESTATUS ROBADO"
          isOpenModalStatus={isOpenModalStatus}
          closeModalStatus={closeModalStatus}
          dataStatus={stolen.idAsset}
          actualizarEquipos={actualizarEquipos}
        />
      )}

      {
        (user.role.type.name !== "user_read" && !!user.role.type.name) &&
        <div className={styles.container_buttons}>
          <Btn_options title={"Opciones"} onClick={openModalStatus} />
          <Btn_updatePdf title={"Act. Min. Pub."} onClick={updateActPublMinistry} />
          <Btn_updatePdf title={"Acta Inv."} onClick={updateInvestReport} />
        </div>
      }

    </>
  );
};

export default DetailsStolen;
