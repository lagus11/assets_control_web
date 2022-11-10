import React from "react";
import { Field, Form, Formik } from "formik";
import styles from "../../components/ViewModal/ViewModal.module.css";
import { Btn_submit } from "../../components/buttons/Btn_submit/Btn_submit";
import { postData, putData } from "../../hooks/useApiData";

const CreateUri="/empresas_activo/agregar_empresa_activo";
const UpdateUri="/empresas_activo/editar_empresa_activo";

export const FormInputs = ({
  isOpen,
  closeModal,
  initialValues,
  dataUpdate,
  actualizar,
}) => {

  const add = (dataForm) => {
    let newDataForm = dataForm;
    if (!dataUpdate) {
      postData(CreateUri, dataForm, actualizar);
    } else {
      putData(UpdateUri, newDataForm, actualizar, closeModal);
    }
  };

  return (
    <div className={`${styles.modal} ${isOpen && styles.isOpen}`}>
      <div className={styles.modal_contenedor}>
        <div className={styles.modal_cabecero}>
          <h1 className={styles.modal_titulo}>Proveedores</h1>
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
                  <label>Nombre</label>
                  <Field
                    placeholder="Nombre"
                    type="text"
                    name="name"
                    className={styles.input_datos}
                    required={true} //required si existe es requerido si no, no lo es xd
                  />
                </div>

                <div>
                  <label>Razón Social</label>
                  <Field
                    placeholder="Razón social"
                    type="text"
                    name="businessName"
                    className={styles.input_datos}
                    required={true} //required si existe es requerido si no, no lo es xd
                  />
                </div>

                <div>
                  <label>Ubicación</label>
                  <Field
                    placeholder="Ubicación"
                    type="text"
                    name="location"
                    className={styles.input_datos}
                    required={true} //required si existe es requerido si no, no lo es xd
                  />
                </div>

                
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
