import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import Multiselect from "multiselect-react-dropdown";
import { useFetchData } from "../../hooks/useFetchData";
import styles from "./ViewModal.module.css";
import { Btn_submit } from "../../components/buttons/Btn_submit/Btn_submit";
import { postData, putData } from "../../hooks/useApiData";

const CreateUri = "/usuario_autorizado/agregar_usuario_autorizado";
const UpdateUri = "/usuario_autorizado/editar_usuario_autorizado";

export const FormInputs = ({
  isOpen,
  closeModal,
  initialValues,
  dataUpdate,
  actualizar,
}) => {
  const uri = "/tipo_equipo/ver_tipoEquipo";
  const [fetchData, equipments_types, loadingData] = useFetchData(uri);
  const [isReqTypeEquipment, setIsReqTypeEquipment] = useState(false);

  const add = (dataForm) => {
    let newDataForm = dataForm;
    if (!dataUpdate) {
      postData(CreateUri, dataForm, actualizar);
    } else {
      if (dataForm.role.type.name !== "user_type_equipment") {
        newDataForm = {
          _id: dataForm._id,
          email: dataForm.email,
          name: dataForm.name,
          role: {
            type: {
              name: dataForm.role.type.name,
            },
          },
        };
      }
      putData(UpdateUri, newDataForm, actualizar, closeModal);
    }
  };

  const validIsUserTypEquipm = (rol) => {
    if (rol.target[rol.target.selectedIndex].value === "user_type_equipment") {
      setIsReqTypeEquipment(true);
    } else {
      setIsReqTypeEquipment(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dataUpdate?.role?.type?.name === "user_type_equipment" &&
      setIsReqTypeEquipment(true);
  }, [dataUpdate]);

  const getIdEquipment = (value) => {
    const equipments = value;
    const newEquipment = equipments.map((equipment) => {
      return equipment._id;
    });
    return newEquipment;
  };

  return (
    <div className={`${styles.modal} ${isOpen && styles.isOpen}`}>
      <div className={styles.modal_contenedor}>
        <div className={styles.modal_cabecero}>
          <h1 className={styles.modal_titulo}>Personas Acceso</h1>
          <label onClick={closeModal}>X</label>
        </div>

        <Formik
          initialValues={dataUpdate || initialValues}
          onSubmit={add}
          enableReinitialize
        >
          {(formik) => (
            <Form id="form">
              <Field type="text" name="_id" className={styles.input_id} />
              <div className={styles.modal_contenido}>
                <div>
                  <label>Correo</label>
                  <Field
                    placeholder="Correo"
                    type="text"
                    name="email"
                    className={styles.input_datos}
                    required={true} //required si existe es requerido si no, no lo es xd
                  />
                </div>

                <div>
                  <label>Nombre</label>
                  <Field
                    placeholder="Nombre"
                    type="text"
                    name="name"
                    className={styles.input_datos}
                  />
                </div>

                <div>
                  <label className={styles.isRequerided}>Rol</label>
                  <Field
                    as="select"
                    name="role.type.name"
                    className={styles.input_datos}
                    required={true} //required si existe es requerido si no, no lo es xd
                    onChange={(event) => {
                      validIsUserTypEquipm(event);
                      formik.setFieldValue(
                        "role.type.name",
                        event.target.value
                      );
                    }}
                  >
                    <option value="" hidden>
                      Seleccione un rol
                    </option>

                    <option value="admin">Administrador</option>
                    <option value="user_type_equipment">
                      Usuario tipo de equipo
                    </option>
                    <option value="user_read">Usuario lectura</option>
                  </Field>
                </div>

                {isReqTypeEquipment && (
                  <div>
                    <Multiselect
                      showArrow={true}
                      isObject={true}
                      placeholder="TIPO DE EQUIPO"
                      onSelect={(event) => {
                        formik.setFieldValue(
                          "role.type.asset",
                          getIdEquipment(event)
                        );
                      }}
                      onRemove={(event) => {
                        formik.setFieldValue(
                          "role.type.asset",
                          getIdEquipment(event)
                        );
                      }}
                      options={equipments_types}
                      displayValue="name"
                      showCheckbox={true}
                      //selectedValues={}
                      loading={loadingData}
                    />
                  </div>
                )}
              </div>
              <div className={styles.container_button}>
                <Btn_submit title={"ACEPTAR"} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
