import React, { useRef } from "react";
import { Formik, Field, Form } from "formik";
import { Btn_submit } from "../../buttons/Btn_submit/Btn_submit";

function AFormSelect({
  styles,
  initialValues,
  equipo,
  equipments_types,
  next,
  setSelectEquipType,
}) {
  const refSelectEquipType = useRef(null);

  const handleSubmit = (values) => {
    if(values.equipment_type !== ''){
      const textSelectE = refSelectEquipType.current.value;
      setSelectEquipType(textSelectE); //hook para mandar a detail de que dispositivo seleccionado
      next(values);
    }
  };

  return (
    <div>
      <Formik
        initialValues={equipo || initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form>
            <div className={styles.modal_contenido_unInput}>
              <div>
                <label className={styles.isRequerided}>TIPO DE EQUIPO</label>
                <Field
                  name="equipment_type"
                  className={styles.input_datos}
                  as="select"
                  disabled={!!equipo}
                  innerRef={refSelectEquipType}
                >
                  <option value="" disabled>
                    SELECCIONE TIPO EQUIPO
                  </option>
                  {
                    equipments_types.map((equipment_type) => {
                      return (
                        <option
                          key={equipment_type._id}
                          value={equipment_type._id}
                        >
                          {equipment_type.name}
                        </option>
                      );
                    })
                  }
                </Field>
              </div>
            </div>
            <div className={styles.container_button}>
              <Btn_submit title={"Siguiente"} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AFormSelect };
