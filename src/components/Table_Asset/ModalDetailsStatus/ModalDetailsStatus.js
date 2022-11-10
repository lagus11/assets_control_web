import React from "react";
import styles from "./ModalDetailsStatus.module.css";
import DetailsAssignation from "./DetailsStatus/DetailsAssignation";
import DetailsLend from "./DetailsStatus/DetailsLend";
import DetailsRepair from "./DetailsStatus/DetailsRepair";
import DetailsStolen from "./DetailsStatus/DetailsStolen";
import DetailsDamaged from "./DetailsStatus/DetailsDamaged";
import DetailsLost from "./DetailsStatus/DetailsLost";
import { useDispatch, useSelector } from "react-redux";
import { closeModalStatusDetails } from "../../../store/slices/modalStatusDetails/modalStatusDetailsSlice";

function ModalDetailStatus({
  titulo,
  actualizarEquipos,
}) {

  const { isOpenModalStatusDetails, assetStatusDetails } = useSelector(state => state.modalStatusDetails);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModalStatusDetails());
  }

  return (
    <div className={`${styles.modal} ${isOpenModalStatusDetails && styles.isOpen}`}>
      <div className={styles.modal_contenedor}>
        <div className={styles.modal_cabecero}>
          <h1 className={styles.modal_titulo}>{titulo}</h1>
          <label onClick={closeModal}>X</label>
        </div>
        <div className={styles.modal_contenido}>
          <div className={styles.container_data}>
            <div>
              <label>ETIQUETA</label>
              <input defaultValue={assetStatusDetails?.tag || ""} disabled />
            </div>

            <div>
              <label>MARCA</label>
              <input defaultValue={assetStatusDetails?.make || ""} disabled />
            </div>

            <div>
              <label>MODELO</label>
              <input defaultValue={assetStatusDetails?.model || ""} disabled />
            </div>

            <div>
              <label>NUM SERIE</label>
              <input
                defaultValue={assetStatusDetails?.serial_number || ""}
                disabled
              />
            </div>
          </div>

          <hr />

          {assetStatusDetails?.status === "ASIGNADO" && (
            <DetailsAssignation
              actualizarEquipos={actualizarEquipos}
            />
          )}
          {assetStatusDetails?.status === "PRESTAMO" && (
            <DetailsLend
              actualizarEquipos={actualizarEquipos}
            />
          )}
          {assetStatusDetails?.status === "DAÑADO" && (
            <DetailsDamaged
              actualizarEquipos={actualizarEquipos}
            />
          )}
          {assetStatusDetails?.status === "REPARACIÓN" && (
            <DetailsRepair
              actualizarEquipos={actualizarEquipos}
            />
          )}
          {assetStatusDetails?.status === "ROBADO" && (
            <DetailsStolen
              actualizarEquipos={actualizarEquipos}
            />
          )}
          {assetStatusDetails?.status === "EXTRAVIADO" && (
            <DetailsLost
              actualizarEquipos={actualizarEquipos}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { ModalDetailStatus };
