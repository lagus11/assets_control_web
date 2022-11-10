import React from "react";
import styles from "../ModalAsset/ModalAsset.module.css";
import axiosJWT from "../../../intercept/WithAxios";
import { SweetInfo } from "../../SweetInfo/SweetInfo";
import { Btn_history } from "../../buttons/Btn_history/Btn_history";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAssetDetails } from "../../../store/slices/assetDetails/assetDetailsSlice";

function ModalDetailsAssets() {

  const { assetDetails, isOpenModalAssetDetails } = useSelector(state => state.assetDetails);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModalAssetDetails());
  }
 
  const historyAsset = () => {
    axiosJWT
      .get("historial/ver_historial/" + assetDetails._id)
      .then((response) => {
        SweetInfo({
          EmployeeNumber: response.data[0]?.EmployeeNumber || "Sin Historial",
          fullNameEmployee:
            response.data[0]?.fullNameEmployee || "Sin Historial",
          dateDelivery: response.data[0]?.dateDelivery || "Sin Historial",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={`${styles.modal} ${isOpenModalAssetDetails && styles.isOpen}`}>
      <div className={styles.modal_contenedor}>
        <div className={styles.modal_cabecero}>
          <h1 className={styles.modal_titulo}>Detalles Equipo</h1>
          <label onClick={closeModal}>X</label>
        </div>
        <div className={styles.modal_contenido}>
          <div>
            <label>ETIQUETA</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.tag || ""}
            />
          </div>

          <div>
            <label>MARCA</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.make || ""}
            />
          </div>

          <div>
            <label>MODELO</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.model || ""}
            />
          </div>

          <div>
            <label>NUMERO DE SERIE</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.serial_number || ""}
            />
          </div>

          <div>
            <label>CODIGO DE ACTIVO</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.asset_code || ""}
            />
          </div>

          <div>
            <label>TIPO DE ACTIVO</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.asset_type || ""}
            />
          </div>

          <div>
            <label>TIPO DE EQUIPO</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.equipment_type.name || ""}
            />
          </div>

          <div>
            <label>FACTURA</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.invoice || ""}
            />
          </div>

          <div>
            <label>PROVEEDOR</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.supplier?.name || ""}
            />
          </div>

          <div>
            <label>EMPRESA ACTIVO</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.asset_company?.name || ""}
            />
          </div>

          <div>
            <label>UBICACIÓN</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.location?.name || ""}
            />
          </div>

          <div>
            <label>FECHA COMPRA</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.datePurchase || ""}
            />
          </div>

          <div>
            <label>FECHA REGISTRO</label>
            <input
              className={styles.input_datos}
              disabled
              value={assetDetails?.dateRegistration || ""}
            />
          </div>

          {!!assetDetails?.dateDrop && (
            <div>
              <label>FECHA BAJA</label>
              <input
                className={styles.input_datos}
                disabled
                value={assetDetails?.dateDrop || ""}
              />
            </div>
          )}

          <div>
            <label>OBSERVACIÓN</label>
            <textarea
              disabled
              rows="5"
              className={styles.textArea}
              value={assetDetails?.observation || ""}
            />
          </div>

          {assetDetails !== null
            ? !!assetDetails?.mobileDetail
              ? Object.entries(assetDetails.mobileDetail).map((detail) => {
                  return (
                    <div key={detail[0]}>
                      <label>{detail[0]}</label>
                      <input
                        className={styles.input_datos}
                        disabled
                        value={detail[1] || ""}
                      />
                    </div>
                  );
                })
              : null
            : null}

          {assetDetails !== null
            ? !!assetDetails?.desktopDetail
              ? Object.entries(assetDetails.desktopDetail).map((detail) => {
                  return (
                    <div key={detail[0]}>
                      <label>{detail[0]}</label>
                      <input
                        className={styles.input_datos}
                        disabled
                        value={detail[1] || ""}
                      />
                    </div>
                  );
                })
              : null
            : null}
        </div>
        <div className={styles.container_button}>
          <Btn_history onClick={() => historyAsset()} title={""} />
        </div>
      </div>
    </div>
  );
}

export { ModalDetailsAssets };
