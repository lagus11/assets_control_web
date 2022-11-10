import React from "react";
import { Formik, Field, Form } from "formik";
import { Btn_submit } from "../../../components/buttons/Btn_submit/Btn_submit";
import styles from "./ModalAsset.module.css";
import { Btn_back } from "../../buttons/Btn_back/Btn_back";
import { Select_location } from "../../Select_location/Select_location";

function AFormPrinc({
  equipo,
  initialValues,
  suppliers,
  asset_companies,
  prev,
  next,
}) {
  const handleSubmit = (values) => {
    next(values);
  };

  return (
    <Formik
      initialValues={equipo || initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => (
        <Form id="form">
          <Field type="text" name="_id" className={styles.input_id} />
          <div className={styles.modal_contenido}>
            <div>
              <label className={styles.isRequerided}>ETIQUETA</label>
              <Field
                placeholder="ETIQUETA"
                type="text"
                name="tag"
                className={styles.input_datos}
                required={true}
              />
            </div>
            <div>
              <label className={styles.isRequerided}>MARCA</label>
              <Field
                placeholder="MARCA"
                type="text"
                name="make"
                className={styles.input_datos}
                required={true}
              />
            </div>

            <div>
              <label className={styles.isRequerided}>MODELO</label>
              <Field
                placeholder="MODELO"
                type="text"
                name="model"
                className={styles.input_datos}
                required={true}
              />
            </div>

            <div>
              <label className={styles.isRequerided}>NÚMERO DE SERIE</label>
              <Field
                placeholder="NÚMERO DE SERIE"
                type="text"
                name="serial_number"
                className={styles.input_datos}
                required={true}
              />
            </div>

            <div>
              <label>CÓDIGO ACTIVO</label>
              <Field
                placeholder="CÓDIGO ACTIVO"
                type="text"
                name="asset_code"
                className={styles.input_datos}
              />
            </div>

            <div>
              <label className={styles.isRequerided}>TIPO DE ACTIVO</label>
              <Field
                name="asset_type"
                className={styles.input_datos}
                as="select"
                required={true}
              >
                <option value="" disabled>
                  SELECCIONE TIPO ACTIVO
                </option>
                <option value="ACTIVO">ACTIVO</option>
                <option value="ARRENDADO">ARRENDADO</option>
              </Field>
            </div>

            <div>
              <label>ESTATUS</label>
              <Field
                placeholder="ESTATUS"
                type="text"
                name="status"
                className={styles.input_datos}
                disabled
              />
            </div>

            <div>
              <label>FACTURA</label>
              <Field
                placeholder="FACTURA"
                type="text"
                name="invoice"
                className={styles.input_datos}
              />
            </div>

            <div>
              <label className={styles.isRequerided}>PROVEEDOR</label>
              <Field
                name="supplier"
                className={styles.input_datos}
                as="select"
                required={true}
              >
                <option value="" disabled>
                  SELECCIONE PROVEEDOR
                </option>
                {suppliers.map((supplier) => {
                  return (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name}
                    </option>
                  );
                })}
              </Field>
            </div>

            <div>
              <label className={styles.isRequerided}>EMPRESA DEL ACTIVO</label>
              <Field
                name="asset_company"
                className={styles.input_datos}
                as="select"
                required={true}
              >
                <option value="" disabled>
                  SELECCIONE EMPRESA ACTIVO
                </option>
                {asset_companies.map((asset_company) => {
                  return (
                    <option key={asset_company._id} value={asset_company._id}>
                      {asset_company.name}
                    </option>
                  );
                })}
              </Field>
            </div>

            {
              //si status == stock muestre editar ubicacion o si equipo es vacio, negacion vuelve true, significa que esta vacio y se puede editar la ubicacion
              (equipo?.status === "STOCK" || !equipo) && (
                <div>
                  <Select_location
                    classNameLabel={styles.isRequerided}
                    classNameInput={styles.input_datos}
                    type={"ALMACEN"}
                  />
                </div>
              )
            }

            <div>
              <label>FECHA COMPRA: </label>
              <Field
                type="date"
                name="datePurchase"
                className={styles.input_datos}
              />
            </div>

            <div>
              <label>OBSERVACIÓN</label>
              <Field
                name="observation"
                as="textarea"
                rows="5"
                className={styles.textArea}
              />
            </div>
          </div>

          <div className={styles.container_button}>
            {!equipo && (
              <Btn_back title={"Regresar"} onClick={() => prev(values)} />
            )}
            <Btn_submit title={"Siguiente"} />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { AFormPrinc };
