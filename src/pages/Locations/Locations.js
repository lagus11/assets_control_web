import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Table } from "../../components/Table/Table";
import { useModal } from "../../hooks/useModal";
import { useColumns } from "./useColumns";
import toast, { Toaster } from 'react-hot-toast';
import { useFetchData } from '../../hooks/useFetchData';
import { FormInputs } from "./FormInputs";

function Locations() {
  
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const uri = "/ubicaciones/ver_ubicaciones";
  const [fetchData, datos, loadingData] = useFetchData(uri);
  const [locations, setLocations] = useState(null);

  const initialValues = {
    _id: "",
    name: "",
    type: "",
  };

  async function updateDate(result) {
    toast.success(result.status);
    fetchData && fetchData();
  }

  const closeAll = () => {
    setLocations(null);
    closeModal();
  };

  
  
  return (
    <Container>
      {
        <FormInputs
          isOpen={isOpenModal} //paso hook si esta true o false para abrir la ventana
          closeModal={closeAll} //paso la funcion cerrar modal
          initialValues={initialValues}
          actualizar={updateDate}
          dataUpdate={locations}
        />
      }
      <Toaster toastOptions={ {duration: 4000} }/>
      <h1 style={{ textAlign: "center" }}>Ubicaciones</h1>
      {
          <Table 
            title={"ubicaciones"}
            useColumns={useColumns} 
            datos={datos} 
            isOpenModal={isOpenModal}
            openModal={openModal}
            closeModal={closeModal}
            loading={loadingData}
            actualizar={fetchData}
            setDataUpdate={setLocations}
            DeleteUri={"/ubicaciones/eliminar_ubicacion"}
          />
      }
    </Container>
  );
}

export { Locations };