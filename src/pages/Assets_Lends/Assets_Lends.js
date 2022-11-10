import React, { useEffect } from "react";
import { TableLends } from "../../components/TableLends/TableLends";
import { useColumns } from "./useColumns";
import { Container } from "../../components/Container/Container";
import { Toaster } from "react-hot-toast";
import { useFetchData } from "../../hooks/useFetchData";

function Assets_Lends() {
  
  const uri = "/status_lend/expireLend";
  const [fetchData, datos, loadingData] = useFetchData(uri);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Toaster toastOptions={{ duration: 4000 }} />
      <h1 style={{ textAlign: "center" }}>Activos Prestamo</h1>
      {
        <TableLends
          useColumns={useColumns}
          datos={datos.inTime || []}
          loading={loadingData}
          title={"apunto de vencer"}
        />
      }
      {
        <TableLends
          useColumns={useColumns}
          datos={datos.expired || []}
          loading={loadingData}
          title={"vencidos"}
        />
      }
    </Container>
  );
}

export { Assets_Lends };
