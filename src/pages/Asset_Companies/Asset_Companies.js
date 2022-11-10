import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Table } from "../../components/Table/Table";
import { useColumns } from "./useColumns";
import { useModal } from "../../hooks/useModal";
import toast, { Toaster } from "react-hot-toast";
import { useFetchData } from "../../hooks/useFetchData";
import { FormInputs } from "./FormInputs";

function Asset_Companies() {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const uri = "/empresas_activo/ver_empresas_activo";
  const [fetchData, datos, loadingData] = useFetchData(uri);
  const [asset_companies, setAsset_companies] = useState(null);

  const initialValues = {
    _id: "",
    name: "",
    businessName: "",
    location: "",
  };

  async function updateDate(result) {
    toast.success(result.status);
    fetchData && fetchData();
  }

  const closeAll = () => {
    setAsset_companies(null);
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
          dataUpdate={asset_companies}
        />
      }
      <Toaster toastOptions={{ duration: 4000 }} />
      <h1 style={{ textAlign: "center" }}>Empresas Activo</h1>
      {
        <Table
          title={"empresas"}
          useColumns={useColumns}
          datos={datos}
          isOpenModal={isOpenModal}
          openModal={openModal}
          closeModal={closeModal}
          loading={loadingData}
          setDataUpdate={setAsset_companies}
          actualizar={fetchData}
          DeleteUri={"/empresas_activo/eliminar_empresa_activo"}
        />
      }
    </Container>
  );
}

export { Asset_Companies };
