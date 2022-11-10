import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Toaster } from "react-hot-toast";
import { useFetchData } from "../../hooks/useFetchData";
import { Formik, Field, Form } from "formik";
import { Btn_submit } from "../../components/buttons/Btn_submit/Btn_submit";
import axiosJWT from "../../intercept/WithAxios";
import { TableLends } from "../../components/TableLends/TableLends";
import { useColumnDefault } from "./useColumnDefault";
import { useColumnsMobile } from "./useColumnMobile";
import { useColumnsComputer } from "./useColumnComputer";
import styles from "./styles.module.css";

function Assets_Specific() {
  const uri = "/tipo_equipo/ver_tipoEquipo";
  const [fetchData, equipments_types, loadingData] = useFetchData(uri);
  const [assets, setAssets] = useState([]);
  const [valueEquiment_type, setValueEquipment_type] = useState("");
  const [positViewTable, setPositViewTable] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const viewTable = [
    <h3>No encontrado</h3>,
    <TableLends
      useColumns={useColumnDefault}
      datos={assets || []}
      loading={loadingData}
      title={""}
    />,
    <TableLends
      useColumns={useColumnsMobile}
      datos={assets || []}
      loading={loadingData}
      title={""}
    />,
    <TableLends
      useColumns={useColumnsComputer}
      datos={assets || []}
      loading={loadingData}
      title={""}
    />,
  ];

  const handleSubmit = (values) => {
    if(!values.equipment_type) return; //caso values sea vacio, no haga nada
    setPositViewTable(0);
    setLoading(true);
    axiosJWT
      .get("/equipos/ver_tipo_equipo/" + values.equipment_type)
      .then(async (response) => {
        setAssets(response.data);
        setValueEquipment_type(values.equipment_type);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const columns = () => {
    if (assets.length > 0) {
      switch (valueEquiment_type) {
        case "63000dc4079aea9be52e64bc": //computa escr bd atlas
        case "62e2cf65d139006ee5534762": //laptop bd atl
        case "631f585add685b16b5c73269":
        case "631f582add685b16b5c7325e":
          setPositViewTable(3);
          break;
        case "631f5852dd685b16b5c73266": //movil
        case "631f58a2dd685b16b5c73284": //tablet
        case "63000daf079aea9be52e64b9": //movil bd atlas
        case "630fa84ab0bebe47e849b8f6": //tablet bd atlas
        case "63000da2079aea9be52e64b6": //telefono fijo bd atlas
          setPositViewTable(2);
          break;
        default:
          setPositViewTable(1);
          break;
      }
    } else {
      setPositViewTable(0);
    }
  };

  //effect hace peticion
  useEffect(() => {
    fetchData();
  }, []);

  //effect ejecuta cuando hay cambio select tipo equipo
  useEffect(() => {
    columns();
  }, [assets]);

  return (
    <Container>
      <Toaster toastOptions={{ duration: 4000 }} />
      <h1 style={{ textAlign: "center" }}>Activos Especificos</h1>

      <div className={styles.container_selectSpecific}>
        <Formik
          initialValues={{ equipment_type: "" }}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form id="form">
              <Field name="equipment_type" as="select" className={styles.selectInput}>
                <option value="" disabled>
                  TIPO DE EQUIPO
                </option>
                {equipments_types.map((equipment_type) => {
                  return (
                    <option key={equipment_type._id} value={equipment_type._id}>
                      {equipment_type.name}
                    </option>
                  );
                })}
              </Field>
              <Btn_submit title={"Buscar"} />
            </Form>
          )}
        </Formik>
      </div>
      {isLoading && <p>Loading....</p>}

      {viewTable[positViewTable]}
    </Container>
  );
}

export { Assets_Specific };
