import React from "react";
import { Field, Form, Formik } from "formik";
import styles from "../../components/ViewModal/ViewModal.module.css";
import { Btn_submit } from "../../components/buttons/Btn_submit/Btn_submit";
import { postData, putData } from "../../hooks/useApiData";

const CreateUri = "/ubicaciones/agregar_ubicacion";
const UpdateUri = "/ubicaciones/editar_ubicacion";

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
                  <label>Tipo</label>
                  <Field
                    placeholder="Tipo"
                    as="select"
                    name="type"
                    className={styles.input_datos}
                    required={ true } //required si existe es requerido si no, no lo es xd
                  >
                    <option value="" disabled>
                      SELECCIONE TIPO LUGAR
                    </option>
                    
                    <option value="CEDIS" >
                      Cedis
                    </option>

                    <option value="ALMACEN" >
                      Almacen
                    </option>
                  </Field>
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
