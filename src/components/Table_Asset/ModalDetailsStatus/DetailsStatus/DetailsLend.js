import React, { useEffect } from "react";
import styles from "../ModalDetailsStatus.module.css";
import { SweetAlert } from "../../../SweetAlert/SweetAlert";
import { Btn_download } from "../../../buttons/Btn_download/Btn_download";
import { Btn_desaStat } from "../../../buttons/Btn_desaStat/Btn_desaStat";
import axiosJWT from "../../../../intercept/WithAxios";
import { SweetSelect } from "../../../SweetSelect/SweetSelect";
import { toast } from "react-hot-toast";
import { Btn_options } from "../../../buttons/Btn_options/Btn_options";
import { ViewModalStatus } from "../../../ViewModalStatus/ViewModalStatus";
import { useModal } from "../../../../hooks/useModal";
import { SweetFilePdf } from "../../../SweetFilePdf/SweetFilePdf";
import { Btn_updatePdf } from "../../../buttons/Btn_updatePdf/Btn_updatePdf";
import { useDispatch, useSelector } from "react-redux";
import { closeModalStatusDetails } from "../../../../store/slices/modalStatusDetails/modalStatusDetailsSlice";
import { setEmployeeSelectStatus } from "../../../../store/slices/modalSelectStatus/modalSelectStatusSlice";

const DetailsLend = ({ actualizarEquipos }) => {

  const { lend } = useSelector(state => state.lend);
  const user = useSelector((state) => state.userState.user); // obtengo el usuario logeado
  const dispatch = useDispatch();

  useEffect(() => {
    const employee = {
      employeeNumber: lend.employeeNumber,
      fullNameEmployee: lend.name + " " + lend.lastname
    }
    dispatch(setEmployeeSelectStatus({employeeSelectStatus: employee }));
  },[]);

  const [isOpenModalStatus, openModalStatus, closeModalStatus] =
    useModal(false);

  const viewPdf = () => {
    axiosJWT
      .get("/status_lend/viewPdf/" + lend.urlPdf, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "RESGUARDO_" + lend.urlPdf);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        if (error.response.status === 404) toast.error("PDF NO ENCONTRADO");
      });
  };

  const updatePdf = () => {
    SweetFilePdf()
      .then((response) => {
        const formData = new FormData();
        formData.append("file", response.value, lend.urlPdf);
        axiosJWT
          .post("/status_lend/updatePdf/", formData)
          .then((response) => {
            toast.success(response.data.status);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const desasignar = () => {
    SweetAlert("Estás Seguro que desea quitar prestamo a este equipo?").then(
      (resAlert) => {
        if (resAlert.isConfirmed) {
          axiosJWT
            .get("/ubicaciones/ver_ubicaciones")
            .then((response) => {
              SweetSelect(response.data, "ALMACEN").then((resSelect) => {
                const location = resSelect.value;
                const history = {
                  idAsset: lend.idAsset._id,
                  EmployeeNumber: lend.employeeNumber,
                  fullNameEmployee: lend.name + " " + lend.lastname
                };
                if (resSelect.isConfirmed) {
                  axiosJWT
                    .post("/historial/agregar_historial", history)
                    .then((response) => {
                      axiosJWT
                        .put(
                          `/equipos/cambioState_equipo/${lend.idAsset._id}`,
                          {
                            status: "STOCK",
                            location: location,
                          }
                        )
                        .then((response) => {
                          actualizarEquipos(response.data);
                          dispatch(closeModalStatusDetails())
                        });
                    });
                }
              });
            })
            .catch((error) => console.log(error));
        }
      }
    );
  };

  return (
    <>
      <div className={styles.container_data}>
        <div>
          <label>NOMBRE</label>
          <input value={lend?.name} disabled />
        </div>

        <div>
          <label>APELLIDOS</label>
          <input value={lend?.lastname} disabled />
        </div>

        <div>
          <label>AREA</label>
          <input value={lend?.area} disabled />
        </div>

        <div>
          <label>JEFE INMEDIATO</label>
          <input value={lend?.immBoss} disabled />
        </div>

        <div>
          <label>FECHA INICIO</label>
          <input value={lend?.dateLendInit} disabled />
        </div>

        <div>
          <label>FECHA FINAL</label>
          <input value={lend?.dateLendFinish} disabled />
        </div>

        <div>
          <label>RESGUARDO</label>
          <Btn_download title={"Descargar"} onClick={viewPdf} />
        </div>
        
      </div>

      {(user.role.type.name !== "user_read" && !!user.role.type.name && isOpenModalStatus) && (
        <ViewModalStatus
          titulo="ESTATUS PRESTAMO"
          isOpenModalStatus={isOpenModalStatus}
          closeModalStatus={closeModalStatus}
          dataStatus={lend.idAsset}
          actualizarEquipos={actualizarEquipos}
          employeeNumber={lend.employeeNumber}
          fullNameEmployee={lend.name + " " + lend.lastname}
        />
      )}

        {
          (user.role.type.name !== "user_read" && !!user.role.type.name) &&
          <div className={styles.container_buttons}>
            <Btn_desaStat title={"Desasignar"} onClick={desasignar} />
            <Btn_options title={"Opciones"} onClick={openModalStatus} />
            <Btn_updatePdf title={"Resguardo"} onClick={updatePdf} />
          </div>
        }
    </>
  );
};

export default DetailsLend;
