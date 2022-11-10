import React, { useState, useRef } from "react";
import { Btn_cancel } from "../buttons/Btn_cancel/Btn_cancel";
import { Btn_submit } from "../buttons/Btn_submit/Btn_submit";
import styles from "./ViewModalStatus.module.css";
import axiosJWT from "../../intercept/WithAxios";
import { SweetAlert } from "../SweetAlert/SweetAlert";

import {
  OpenAssignation,
  OpenLend,
  OpenRepair,
  OpenOptions,
  OpenDamaged,
  OpenLost,
  OpenStolen,
} from "./formsStatus"; //importo las opciones de las acciones que tendre
import {  useDispatch, useSelector } from "react-redux";
import { closeModalStatusDetails } from "../../store/slices/modalStatusDetails/modalStatusDetailsSlice";

function ViewModalStatus({
  titulo,
  actualizarEquipos,
  isOpenModalStatus,
  closeModalStatus,
}) {
  const [options, setOptions] = useState("");
  const inputTag = useRef("");

  const { assetSelectStatus} = useSelector(state => state.modalSelectStatus);
  const dispatch = useDispatch();
  const cerrarModal = () => {
    closeModalStatus()
    setOptions("");
  };

  const renderSwitch = () => {
    switch (options) {
      case "assignation":
        return (
          <OpenAssignation
            inputTag={inputTag}
            cerrarModal={cerrarModal}
            actualizarEquipos={actualizarEquipos}
          />
        );
      case "lend":
        return (
          <OpenLend
            inputTag={inputTag}
            cerrarModal={cerrarModal}
            actualizarEquipos={actualizarEquipos}
          />
        );
      case "repair":
        return (
          <OpenRepair
            inputTag={inputTag}
            cerrarModal={cerrarModal}
            actualizarEquipos={actualizarEquipos}
          />
        );
      case "damaged":
        return (
          <OpenDamaged 
            inputTag={inputTag}
            cerrarModal={cerrarModal}
            actualizarEquipos={actualizarEquipos}
          />
        );
        case "lost":
          return (
            <OpenLost
              inputTag={inputTag}
              cerrarModal={cerrarModal}
              actualizarEquipos={actualizarEquipos}
            />
          );
      case "stolen":
        return (
          <OpenStolen
            inputTag={inputTag}
            cerrarModal={cerrarModal}
            actualizarEquipos={actualizarEquipos}
          />
        );
      case "remove":
        onBajaAsset();
      default:
        return (
          <OpenOptions
            actualizarEquipos={actualizarEquipos}
            setOptions={setOptions}
            cerrarModal={cerrarModal}
          />
        );
    }
  };

  const onBajaAsset = () => {
    SweetAlert("Estás Seguro que desea dar de Baja este equipo?").then(
      (res) => {
        if (res.isConfirmed) {
          axiosJWT
            .put(`/equipos/editar_equipo/${assetSelectStatus._id}`, { status: "BAJA", dateDrop: new Date() })
            .then((response) => {
              actualizarEquipos(response.data); //Hice otra funcion para actualizar los datos.
              dispatch(closeModalStatusDetails());
              cerrarModal();
            });
        }
      }
    );
    setOptions("");
  };

  return (
    <div className={`${styles.modal} ${isOpenModalStatus && styles.isOpen}`}>
      <div className={styles.modal_contenedor}>
        <div className={styles.modal_cabecero}>
          <h1>{titulo}</h1>
        </div>

        <div className={styles.flexContenedor}>
          <div className={styles.subContenedor}>
            <h2>Equipo</h2>
            <label>Etiqueta</label>
            <input
              type="text"
              name="tag"
              disabled
              value={assetSelectStatus.tag}
              ref={inputTag}
            />
            <label>Marca</label>
            <input type="text" name="make" disabled value={assetSelectStatus.make} />
            <label>Modelo</label>
            <input type="text" name="model" disabled value={assetSelectStatus.model} />
            <label>Codigo Activo</label>
            <input
              type="text"
              name="asset_code"
              disabled
              value={assetSelectStatus.asset_code}
            />
          </div>
          <div className={styles.subContenedor}>{renderSwitch()}</div>
        </div>
        <div className={styles.divButton}>
          <Btn_cancel
            title="CANCELAR"
            onPress={() => {
              options === "" ? cerrarModal() : setOptions("");
            }}
          />
          {options !== "" && <Btn_submit title="GUARDAR" form={"formStatus"} />}
        </div>
      </div>
    </div>
  );
}

export { ViewModalStatus };
