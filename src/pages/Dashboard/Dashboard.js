import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import styles from "./Dashboard.module.css";
import { Graphic_bar } from "../../components/Graphics/Graphic_bar/Graphic_bar";
import { Pie_chart } from "../../components/Graphics/Pie_chart/Pie_chart";
import { Doughnut_graphic } from "../../components/Graphics/Doughnut_graphic/Doughnut_graphic";

import icono_user from "../../iconos/icono/icono_user.png";
import icono_suppliers from "../../iconos/icono/icono_suppliers.png";
import icono_assets from "../../iconos/icono/icono_assets.png";
import icono_typeEquipment from "../../iconos/icono/icono_typeEquipment.png";

import axiosJWT from '../../intercept/WithAxios';


function Dashboard() {
  
  const [loadingData, setLoadingData] = useState(true);
  const [loadingData1, setLoadingData1] = useState(true);
  const [loadingData2, setLoadingData2] = useState(true);
  const [loadingData3, setLoadingData3] = useState(true);

  const [assets, setAssets] = useState({
    assets: 0,
    almacen: 0,
    prestamo: 0,
    reparacion: 0,
    robado: 0,
    baja: 0,
  });
  const [usersMicrosoft, setUserMicrosoft] = useState(0);
  const [equipments_types, setEquipments_types] = useState(0);
  const [suppliers, setSuppliers] = useState(0);

  
  useEffect(() => {
    async function getData() {
      axiosJWT.get("/equipos/detalles_equipos")
        .then((response) => {
          setAssets(response.data.data); //paso los datos json al hook
          setLoadingData(false); //paso falso indicar ya tengo los datos
        })
        /*.catch((error) => toast.error(error.data))*/;
    }
    //si no obtuve los datos vuelvo a hacer la consulta
    if (loadingData) {
      getData();
    }
  }, []);


  useEffect(() => {
    async function getData1() {
      axiosJWT.get("/usuario_autorizado/detalles_usuarios")
        .then((response) => {
          setUserMicrosoft(response.data); //paso los datos json al hook
          setLoadingData1(false); //paso falso indicar ya tengo los datos
        })
        /*.catch((error) => toast.error(error.data))*/;
    }
    //si no obtuve los datos vuelvo a hacer la consulta
    if (loadingData1) {
      getData1();
    }
  }, []);
  

  useEffect(() => {
    async function getData2() {
      axiosJWT.get("/tipo_equipo/detalles_tiposEquipos")
        .then((response) => {
          setEquipments_types(response.data); //paso los datos json al hook
          setLoadingData2(false); //paso falso indicar ya tengo los datos
        })
        /*.catch((error) => toast.error(error.data))*/;
    }
    //si no obtuve los datos vuelvo a hacer la consulta
    if (loadingData2) {
      getData2();
    }
  }, []);
  

  useEffect(() => {
    async function getData3() {
      axiosJWT.get("/proveedores/detalles_proveedores")
        .then((response) => {
          setSuppliers(response.data); //paso los datos json al hook
          setLoadingData3(false); //paso falso indicar ya tengo los datos
        })
        /*.catch((error) => toast.error(error.data))*/;
    }
    //si no obtuve los datos vuelvo a hacer la consulta
    if (loadingData3) {
      getData3();
    }
  }, []);

  

  return (
    <div className={styles.contenedor_principal}>
      <Header />
      <div className={styles.values}>
        <div className={styles.val_box}>
          <img className={styles.icono_dashboard} src={icono_assets} />
          <div>
            <h3>{assets.assets}</h3>
            <span>Total Activos</span>
          </div>
        </div>

        <div className={styles.val_box}>
          <img className={styles.icono_dashboard} src={icono_user} />
          <div>
            <h3>{usersMicrosoft}</h3>
            <span>Usuarios Registrados</span>
          </div>
        </div>

        <div className={styles.val_box}>
          <img className={styles.icono_dashboard} src={icono_typeEquipment} />
          <div>
            <h3>{equipments_types}</h3>
            <span>Tipos de Equipos</span>
          </div>
        </div>

        <div className={styles.val_box}>
          <img className={styles.icono_dashboard} src={icono_suppliers} />
          <div>
            <h3>{suppliers}</h3>
            <span>Proveedores</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          height: "auto",
        }}
      >
        <div className={styles.container_graphic}>
          <Graphic_bar
            title={"Estatus Activo"}
            labels={["Stock", "Asignado", "Prestamo", "Reparación", "Robado", "Baja"]}
            datas={[
              assets.stock,
              assets.asignado,
              assets.prestamo,
              assets.reparacion,
              assets.robado,
              assets.baja,
            ]}
          />
        </div>

        <div className={styles.container_graphic}>
          <h3>Estatus Activo</h3>
          <Pie_chart
            title={"Estatus Activo"}
            labels={["Stock", "Asignado", "Prestamo", "Reparación", "Robado", "Baja"]}
            datas={[
              assets.stock,
              assets.asignado,
              assets.prestamo,
              assets.reparacion,
              assets.robado,
              assets.baja,
            ]}
          />
        </div>

        <div className={styles.container_graphic}>
          <h2>{(assets.stock * 100 ) / assets.assets || 0} %</h2>
          <span>Disponibles</span>
        </div>

        <div className={styles.container_graphic}>
          <Graphic_bar
            title={"Estatus Activo"}
            labels={["Stock", "Asignado", "Prestamo", "Reparación", "Robado", "Baja"]}
            datas={[
              assets.stock,
              assets.asignado,
              assets.prestamo,
              assets.reparacion,
              assets.robado,
              assets.baja,
            ]}
            orientation={"y"}
          />
        </div>

        <div className={styles.container_graphic}>
          <Graphic_bar
            title={"personas"}
            labels={["pers1", "pers2", "pers3"]}
            datas={[575, 725, 212]}
          />
        </div>

        <div className={styles.container_graphic}>
          <Graphic_bar
            title={"personas"}
            labels={["pers1", "pers2", "pers3"]}
            datas={[575, 725, 212]}
            orientation={"y"}
          />
        </div>

        <div className={styles.container_graphic}>
          <Doughnut_graphic
            Pie_chart
            title={"Estatus Activo"}
            labels={["Stock", "Asignado", "Prestamo", "Reparación", "Robado", "Baja"]}
            datas={[
              assets.stock,
              assets.asignado,
              assets.prestamo,
              assets.reparacion,
              assets.robado,
              assets.baja,
            ]}
          />
        </div>

        <div className={styles.container_graphic}>
          <Graphic_bar
            title={"personas"}
            labels={["pers1", "pers2", "pers3"]}
            datas={[575, 725, 212]}
          />
        </div>
      </div>
     
    </div>
  );
}

export { Dashboard };
