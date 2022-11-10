import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Table } from "../../components/Table/Table";
import { useColumns } from "./useColumns";
import { useModal } from "../../hooks/useModal";
import toast, { Toaster } from 'react-hot-toast';
import { useFetchData } from '../../hooks/useFetchData';
import { FormInputs } from "./FormInputs";

function Suppliers() {
  
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const uri = "/proveedores/ver_proveedores";
  const [fetchData, datos, loadingData] = useFetchData(uri);
  const [suppliers, setSuppliers] = useState(null);

  const initialValues = {
    _id: "",
    name: "",
    address: "",
    phone_number: "",
    email: "",
    type: "",
    comment: ""
  }

  async function updateDate(result) {
    toast.success(result.status);
    fetchData && fetchData();
  }

  const closeAll = () => {
    setSuppliers(null);
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
          dataUpdate={suppliers}
        />
      }
      <Toaster toastOptions={ {duration: 4000} }/>
      <h1 style={{ textAlign: "center" }}>Proveedores</h1>
      {
          <Table 
            title={"proveedores"}
            useColumns={useColumns} 
            datos={datos} 
            isOpenModal={isOpenModal}
            openModal={openModal}
            closeModal={closeModal}
            loading={loadingData}
            setDataUpdate={setSuppliers}
            actualizar={fetchData}
            DeleteUri={"/proveedores/eliminar_proveedor"}
            />
      }
    </Container>
  );
}

export { Suppliers };