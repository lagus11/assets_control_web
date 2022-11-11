import React, { useEffect } from "react";
import styles from "../ModalDetailsStatus.module.css";
import { SweetAlert } from "../../../SweetAlert/SweetAlert";
import { SweetSelect } from "../../../SweetSelect/SweetSelect";
import { Btn_download } from "../../../buttons/Btn_download/Btn_download";
import { Btn_desaStat } from "../../../buttons/Btn_desaStat/Btn_desaStat";
import axiosJWT from "../../../../intercept/WithAxios";
import { toast } from "react-hot-toast";
import { ViewModalStatus } from "../../../ViewModalStatus/ViewModalStatus";
import { useModal } from "../../../../hooks/useModal";
import { Btn_options } from "../../../buttons/Btn_options/Btn_options";
import { SweetFilePdf } from "../../../SweetFilePdf/SweetFilePdf";
import { Btn_updatePdf } from "../../../buttons/Btn_updatePdf/Btn_updatePdf";
import { useDispatch, useSelector } from "react-redux";
import { closeModalStatusDetails } from "../../../../store/slices/modalStatusDetails/modalStatusDetailsSlice";
import { setEmployeeSelectStatus } from "../../../../store/slices/modalSelectStatus/modalSelectStatusSlice";

const DetailsAssignation = ({ actualizarEquipos }) => {
  const { assignation } = useSelector((state) => state.assignation);
  const dispatch = useDispatch();

  const [isOpenModalStatus, openModalStatus, closeModalStatus] =
    useModal(false);

  const user = useSelector((state) => state.userState.user); // obtengo el usuario logeado

  useEffect(() => {
    const employee = {
      employeeNumber: assignation.employeeNumber,
      fullNameEmployee: assignation.name + " " + assignation.lastname,
    };
    dispatch(setEmployeeSelectStatus({ employeeSelectStatus: employee }));
  }, []);

  const viewPdf = () => {
    axiosJWT
      .get("/status_assignation/viewPdf/" + assignation.urlPdf, {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "RESGUARDO_" + assignation.urlPdf);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        if (error.response.status === 404) toast.error("PDF NO ENCONTRADO");
      });
  };

  const desasignar = () => {
    SweetAlert("Estás Seguro que desea desasignar este equipo?").then(
      (resAlert) => {
        if (resAlert.isConfirmed) {
          axiosJWT
            .get("/ubicaciones/ver_ubicaciones")
            .then((response) => {
              SweetSelect(response.data, "ALMACEN").then((resSelect) => {
                if (resSelect.isConfirmed) {
                  const location = resSelect.value;
                  const history = {
                    idAsset: assignation.idAsset._id,
                    EmployeeNumber: assignation.employeeNumber,
                    fullNameEmployee:
                      assignation.name + " " + assignation.lastname,
                  };
                  axiosJWT
                    .post("/historial/agregar_historial", history)
                    .then((response) => {
                      axiosJWT
                        .put(
                          `/equipos/cambioState_equipo/${assignation.idAsset._id}`,
                          {
                            status: "STOCK",
                            location: location,
                          }
                        )
                        .then((response) => {
                          actualizarEquipos(response.data);
                          dispatch(closeModalStatusDetails());
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

  const updatePdf = () => {
    SweetFilePdf()
      .then((response) => {
        const formData = new FormData();
        formData.append("file", response.value, assignation.urlPdf);
        axiosJWT
          .post("/status_assignation/updatePdf/", formData)
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
          <label>NOMBRE</label>
          <input value={assignation?.name} disabled />
        </div>

        <div>
          <label>APELLIDOS</label>
          <input value={assignation?.lastname} disabled />
        </div>

        <div>
          <label>AREA</label>
          <input value={assignation?.area} disabled />
        </div>

        <div>
          <label>JEFE INMEDIATO</label>
          <input value={assignation?.immBoss} disabled />
        </div>

        <div>
          <label>FECHA ASIGNACIÓN</label>
          <input value={assignation?.dateAssignation} disabled />
        </div>

        <div>
          <label>RESGUARDO</label>
          <Btn_download title={"Descargar"} onClick={viewPdf} />
        </div>
      </div>

      {user.role.type.name !== "user_read" &&
        !!user.role.type.name &&
        isOpenModalStatus && (
          <ViewModalStatus
            titulo="ESTATUS ASIGNADO"
            isOpenModalStatus={isOpenModalStatus}
            closeModalStatus={closeModalStatus}
            actualizarEquipos={actualizarEquipos}
            employeeNumber={assignation.employeeNumber}
            fullNameEmployee={assignation.name + " " + assignation.lastname}
          />
        )}
      {(user.role.type.name !== "user_read" && !!user.role.type.name) && (
          <div className={styles.container_buttons}>
            <Btn_desaStat title={"Desasignar"} onClick={desasignar} />
            <Btn_options title={"Opciones"} onClick={openModalStatus} />
            <Btn_updatePdf title={"Resguardo"} onClick={updatePdf} />
          </div>
        )}
    </>
  );
};

export default DetailsAssignation;
