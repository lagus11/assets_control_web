import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Table } from "../../components/Table/Table";
import { useColumns } from "./useColumns";
import { useModal } from "../../hooks/useModal";
import toast, { Toaster } from "react-hot-toast";
import { useFetchData } from "../../hooks/useFetchData";

import { FormInputs } from "./FormInputs";

function AccessControl() {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const uri = "/usuario_autorizado/ver_usuario_autorizado";
  const [fetchData, datos, loadingData] = useFetchData(uri);
  const [userMicrosft, setUserMicrosoft] = useState(null);


  async function updateDate(result) {
    toast.success(result.status);
    fetchData && fetchData();
  }

  const closeAll = () => {
    setUserMicrosoft(null);
    closeModal();
  };


  const initialValues = {
    _id: "",
    email: "",
    name: "",
    role: {
      type: {},
    },
  };

  return (
    <Container>
      {
        <FormInputs
          isOpen={isOpenModal} //paso hook si esta true o false para abrir la ventana
          closeModal={closeAll} //paso la funcion cerrar modal
          initialValues={initialValues}
          actualizar={updateDate}
          dataUpdate={userMicrosft}
        />
      }
      <Toaster toastOptions={{ duration: 4000 }} />
      <h1 style={{ textAlign: "center" }}>Personas Acceso</h1>
      {
        <Table
          title={"registros"}
          useColumns={useColumns}
          datos={datos}
          isOpenModal={isOpenModal}
          openModal={openModal}
          closeModal={closeModal}
          loading={loadingData}
          setDataUpdate={setUserMicrosoft}
          actualizar={fetchData}
          DeleteUri={"/usuario_autorizado/eliminar_usuario_autorizado"}
        />
      }
    </Container>
  );
}

export { AccessControl };
