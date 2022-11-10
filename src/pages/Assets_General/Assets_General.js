import React, { useEffect, useState } from "react";
import { Btn_submit } from "../../components/buttons/Btn_submit/Btn_submit";
import { Container } from "../../components/Container/Container";
import { useFetchData } from "../../hooks/useFetchData";
import Multiselect from "multiselect-react-dropdown";
import styles from "../Assets_ Specific/styles.module.css";
import axiosJWT from "../../intercept/WithAxios";
import { useColumns } from "./useColumns";
import { TableLends } from "../../components/TableLends/TableLends";

function Assets_General() {
  const uri = "/tipo_equipo/ver_tipoEquipo";
  const [fetchData, equipments_types, loadingData] = useFetchData(uri);
  const [selectEquipments_types, setSelectEquipment_types] = useState([]);
  const [assets, setAssets] = useState([]);

  //effect hace peticion
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    let idEquipmentToSearch = [];
    selectEquipments_types.map((selectEquipment_type) => {
      idEquipmentToSearch.push(selectEquipment_type._id);
    });
    axiosJWT
      .post("/equipos/ver_tipos_equipos", {type: idEquipmentToSearch})
      .then(async (response) => {
        setAssets(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Activos General</h1>
      <div className={styles.container_selectSpecific }>
        <div className={styles.selectGeneral}>
          {
            <Multiselect
              showArrow={true}
              isObject={true}
              placeholder="TIPO DE EQUIPO"
              onSelect={(event) => {
                setSelectEquipment_types(event);
              }}
              options={equipments_types}
              displayValue="name"
              showCheckbox={true}
            />
          }
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <Btn_submit title={"Buscar"} />
          </form>
        </div>
      </div>
        <TableLends 
          useColumns={useColumns}
          datos={assets || []}
          loading={loadingData}
          title={""}
        />
    </Container>
  );
}

export { Assets_General };
