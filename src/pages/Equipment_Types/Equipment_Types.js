import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Table } from "../../components/Table/Table";
import { useModal } from "../../hooks/useModal";
import { useColumns } from "./useColumns";
import toast, { Toaster } from 'react-hot-toast';
import { useFetchData } from '../../hooks/useFetchData';
import { FormInputs } from "./FormInputs";

function Equipment_Types() {
  
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const uri = "/tipo_equipo/ver_tipoEquipo";
  const [fetchData, datos, loadingData] = useFetchData(uri);
  const [equipments_types, setEquipments_types] = useState(null)

  const initialValues = {
    _id: "",
    name: "",
    description: ""
  }


  async function updateDate(result) {
    toast.success(result.status);
    fetchData && fetchData();
  }

  const closeAll = () => {
    setEquipments_types(null);
    closeModal();
  }

  return (
    <Container>
      {
        <FormInputs
          isOpen={isOpenModal} //paso hook si esta true o false para abrir la ventana
          closeModal={closeAll} //paso la funcion cerrar modal
          initialValues={initialValues}
          actualizar={updateDate}
          dataUpdate={equipments_types}
        />
      }
      <Toaster toastOptions={ {duration: 4000} }/>
      <h1 style={{ textAlign: "center" }}>Tipos Equipos</h1>
      {
          <Table
            title={"tipos de equipos"}
            useColumns={useColumns} 
            datos={datos} 
            isOpenModal={isOpenModal}
            openModal={openModal}
            closeModal={closeModal}
            loading={loadingData}
            setDataUpdate={setEquipments_types}
            actualizar={fetchData}
            DeleteUri={"/tipo_equipo/eliminar_tipoEquipo"}
          />
      }
    </Container>
  );
}

export { Equipment_Types };