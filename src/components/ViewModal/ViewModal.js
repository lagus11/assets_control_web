import React from "react";
import styles from "./ViewModal.module.css";
import { Btn_submit } from "../buttons/Btn_submit/Btn_submit";
import { Formik, Field, Form } from "formik";
import { postData, putData } from "../../hooks/useApiData";

function ViewModal({ title, isOpen, closeModal, initialValues, formInputs, CreateUri, UpdateUri,actualizar, dataUpdate }) {
  const add = (dateForm) => {
    !dataUpdate ? (
      postData(CreateUri, dateForm, actualizar)
    ):
    (
      putData(UpdateUri, dateForm, actualizar)
    )
  };  

  return (
    <div className={`${styles.modal} ${isOpen && styles.isOpen}`}>
      <div className={styles.modal_contenedor}>
        <div className={styles.modal_cabecero}>
          <h1 className={styles.modal_titulo}>{title}</h1>
          <label onClick={closeModal}>X</label>
        </div>

        <Formik initialValues={dataUpdate || initialValues} onSubmit={add} enableReinitialize>
          {(formik) => (
            <Form id="form">
              <Field type="text" name="_id" className={styles.input_id} />
              <div className={styles.modal_contenido}>{formInputs(formik)}</div>
              <div className={styles.container_button}>
                <Btn_submit title={"ACEPTAR"} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export { ViewModal };
