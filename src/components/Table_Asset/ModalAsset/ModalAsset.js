import React, { useEffect, useState } from "react";
import styles from "./ModalAsset.module.css";
import axiosJWT from "../../../intercept/WithAxios";
import { AFormPrinc } from "./AFormPrinc";
import { AFormSelect } from "./AFormSelect";
import { AFormDetails } from "./AFormDetails";

function ModalAsset({
  titulo,
  isOpen,
  closeModal,
  actualizarEquipos,
  messageError,
  equipo,
}) {
  const [equipments_types, setEquipments_Types] = useState([]); //state llenar select equipments types
  const [suppliers, setSuppliers] = useState([]); //state llenar select suplliers
  const [asset_companies, setAsset_Companies] = useState([]); //state llenar select asset_companies
  const [locations, setLocations] = useState([]); //state llenar select asset_companies
  const [selectEquipType, setSelectEquipType] = useState(null);

  const dataAsset = {
    _id: "",
    tag: "",
    make: "",
    model: "",
    serial_number: "",
    asset_code: "",
    asset_type: "",
    equipment_type: "",
    status: "STOCK",
    invoice: "",
    supplier: "",
    asset_company: "",
    location: "",
    datePurchase: "",
    observation: ""
  };

  const [initialValues, setInitialValues] = useState(dataAsset);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if(!!equipo){
      setCurrentStep(1);
    }else{
      setCurrentStep(0);
    }
  },[equipo]);
  
  const steps = [
    <AFormSelect
      styles={styles}
      initialValues={initialValues}
      equipo={equipo}
      equipments_types={equipments_types}
      next={handleNextStep}
      setSelectEquipType={setSelectEquipType}
    />,
    <AFormPrinc
      initialValues={initialValues}
      next={handleNextStep}
      prev={handlePrevStep}
      equipo={equipo}
      suppliers={suppliers}
      asset_companies={asset_companies}
      locations={locations}
    />,
    <AFormDetails
      submit={handleOnSubmit}
      prev={handlePrevStep}
      selectEquipType={ equipo?.equipment_type || selectEquipType}
      equipo={equipo}
    />,
  ];
  function handleNextStep(newData) {
    setInitialValues((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  }

  function handlePrevStep(newData, endForm = false) {
    if (!endForm) {
      setInitialValues((prev) => ({ ...prev, ...newData }));
    }
    setCurrentStep((prev) => prev - 1);
  }

  function handleOnSubmit(assetDetails, uri, field) {
    
    if (!!field) {
      addDetailEquipo(assetDetails, uri, field);
    } else {
      addEquipo(initialValues);
    }
  }

  const restarModal = () => {
    closeModal(); //cierra la ventana modal
    setCurrentStep(0); //regresa primera ventana
    setInitialValues(dataAsset); //regresa los valores
    console.log("regresa a la ventana inicial");
  };

  /* obtener tipo de equipo */
  useEffect(() => {
    axiosJWT
      .get("/tipo_equipo/ver_tipoEquipo")
      .then((response) => {
        setEquipments_Types(response.data); //paso los datos json al hook
      })
      .catch((error) => console.log(error));
  }, []);

  /* obtener proovedores*/
  useEffect(() => {
    axiosJWT
      .get("/proveedores/ver_proveedores")
      .then((response) => {
        setSuppliers(response.data); //paso los datos json al hook
      })
      .catch((error) => console.log(error));
  }, []);

  /* obtener empresas activo */
  useEffect(() => {
    axiosJWT
      .get("/empresas_activo/ver_empresas_activo")
      .then((response) => {
        setAsset_Companies(response.data); //paso los datos json al hook
      })
      .catch((error) => console.log(error));
  }, []);

  /* obtener ubicaciones */
  /* obtener empresas activo */
  useEffect(() => {
    axiosJWT
      .get("/ubicaciones/ver_ubicaciones")
      .then((response) => {
        setLocations(response.data); //paso los datos json al hook
      })
      .catch((error) => console.log(error));
  }, []);

  const addEquipo = (asset) => {
    //Aqui mando los datos a la BD
    equipo === null
      ? axiosJWT
          .post("/equipos/agregar_equipo", asset)
          .then((response) => {
            //form.reset(); //funcion limpiar los campos
            actualizarEquipos(response.data); //Hice otra funcion para actualizar los datos.
            setInitialValues(dataAsset); //regresa los valores
            setCurrentStep(0); //<--- regreso a la ventana select 
          })
          .catch((error) => messageError(error.response.data))
      : axiosJWT
          .put(`/equipos/editar_equipo/${equipo._id}`, asset)
          .then((response) => {
            closeModal(); //cierro la ventana modal
            actualizarEquipos(response.data); //Hice otra funcion para actualizar los datos.
          })
          .catch((error) => messageError(error.response.data));
    //AddInputs("null");
  };

  const addDetailEquipo = (details, uri, field) => {
    //Aqui mando los datos a la BD

    if (equipo === null) {
      console.log("addDetails post");
      axiosJWT
        .post(uri.create, details)
        .then((response) => {
          const newAssetDetail = {
            ...initialValues,
            [field]: response.data.id,
          };
          addEquipo(newAssetDetail);
        })
        .catch((error) => {});
    } else {
      if (!details._id) {
        console.log("segundo if");
        axiosJWT
          .post(uri.create, details)
          .then((response) => {
            const newAssetDetail = {
              ...initialValues,
              [field]: response.data.id,
            };
            addEquipo(newAssetDetail);
          })
          .catch((error) => {});
      } else {
        console.log("else segundo if");
        axiosJWT
          .put(`${uri.update}/${details._id}`, details)
          .then((response) => {
            addEquipo(initialValues);
          })
          .catch((error) => messageError(error.response.data));
        //setCurrentStep(0);
        setInitialValues(dataAsset);
      }
    }
  };

  return (
    <div className={`${styles.modal} ${isOpen && styles.isOpen}`}>
      <div className={styles.modal_contenedor}>
        <div className={styles.modal_cabecero}>
          <h1 className={styles.modal_titulo}>{titulo}</h1>
          <label onClick={() => restarModal()}>X</label>
        </div>

        {steps[currentStep]}
      </div>
    </div>
  );
}

export { ModalAsset };
