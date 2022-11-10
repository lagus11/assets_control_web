import React, { useEffect, useState } from "react";
import { Btn_submit } from "../../buttons/Btn_submit/Btn_submit";
import { Btn_back } from "../../buttons/Btn_back/Btn_back";
import { Formik, Form } from "formik";
import styles from "./ModalAsset.module.css";
import {
  mobile,
  valuesMobile,
  computerDesk,
  valuesComputerDesk,
} from "./InputsFormDet";

function AFormDetails({ submit, prev, selectEquipType, equipo }) {
  const [equipment, setEquipment] = useState(null);
  const [auxInitialValues, setAuxInitialValues] = useState(null);
  const [auxDataDetails, setAuxDataDetails] = useState(""); //url y campo de la tabla de detalles

  const handleSubmit = (values) => {
    submit(values, auxDataDetails.uri, auxDataDetails.field);
  };

  useEffect(() => {
    let auxValues = {};
    switch (selectEquipType) {
      case "631f5852dd685b16b5c73266": //movil
      case "631f58a2dd685b16b5c73284": //tablet
      case "63000daf079aea9be52e64b9": //movil bd atlas
      case "630fa84ab0bebe47e849b8f6": //tablet bd atlas
      case "63000da2079aea9be52e64b6": //telefono fijo bd atlas
        setEquipment(mobile);
        auxValues = valuesMobile;
        break;
      case "631f585add685b16b5c73269": //computadora escritorio
      case "63000dc4079aea9be52e64bc": //computa escr bd atlas
      case "62e2cf65d139006ee5534762": //laptop bd atlas
        setEquipment(computerDesk);
        auxValues = valuesComputerDesk;
        break;
      default:
        setEquipment(null);
        break;
    }
    setAuxDataDetails(auxValues);
    setAuxInitialValues({ ...auxValues.initialValues });
  }, []);

  const FunFormDetails = ({ initialValuesForm }) => {
    return (
      <Formik
        initialValues={
          equipo?.mobileDetail || equipo?.desktopDetail || initialValuesForm
        }
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({}) => (
          <Form id="form">
            <div className={styles.modal_contenido}>{equipment}</div>
            <div className={styles.container_button}>
              <Btn_back title={"Regresar"} onClick={() => prev(null, true)} />
              <Btn_submit title={"Aceptar"} />
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  return <FunFormDetails initialValuesForm={auxInitialValues} />;
}

export { AFormDetails };
