import React from 'react';
import { Field } from 'formik';
import styles from './ModalAsset.module.css';

const mobile = () => {
    return (
      <>
      <Field type="text" name="_id" className={styles.input_id} />
        <div>
          <label>Numero Telefono</label>
          <Field
            placeholder="Numero Telefono"
            name="numberPhone"
            className={styles.input_datos}
            type="text"
          />
        </div>

        <div>
          <label>IMEI</label>
          <Field
            placeholder="IMEI"
            name="imei"
            className={styles.input_datos}
            type="text"
          />
        </div>

        <div>
          <label>Compañia</label>
          <Field
            placeholder="Compañia"
            name="company"
            className={styles.input_datos}
            type="text"
          />
        </div>
      </>
    );
  };

  const valuesMobile = {
    initialValues: {
    _id: '',
    numberPhone: '',
    imei: '',
    company: ''
    },
    uri: {
      create: '/asset_detailsMobile/agregar_detalles_movil',
      update: '/asset_detailsMobile/editar_detalles_movil',
    },
    field: 'mobileDetail'
  }

  const computerDesk = () => {
    return (
      <>
      <Field type="text" name="_id" className={styles.input_id} />
        <div>
          <label>Sistema Operativo</label>
          <Field
            placeholder="Sistema Operativo"
            name="so"
            className={styles.input_datos}
            type="text"
          />
        </div>

        <div>
          <label>Procesador</label>
          <Field
            placeholder="Procesador"
            name="procesador"
            className={styles.input_datos}
            type="text"
          />
        </div>

        <div>
          <label>GB</label>
          <Field
            placeholder="GB"
            name="gb"
            className={styles.input_datos}
            type="text"
          />
        </div>
      </>
    );
  };

const valuesComputerDesk = {
  initialValues: {
    _id: '',
    so: '',
    procesador: '',
    gb: ''
  },
  uri: {
    create: '/asset_detailsDesktop/agregar_detalles_desktop',
    update: '/asset_detailsDesktop/editar_detalles_desktop',
  },
  field: 'desktopDetail'
}

export {mobile, valuesMobile, computerDesk, valuesComputerDesk}