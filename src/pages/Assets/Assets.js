import React from "react";
import { Header } from "../../components/Header/Header";
import { Table } from "../../components/Table_Asset/Table";
import styles from "./Assets.module.css";
import { useColumns } from "./useColumns";
import { Toaster } from "react-hot-toast";
import _ from "lodash";
import { useFetchDataParams } from "../../hooks/useFetchDataParams";

function Assets() {

  const uri = "/equipos/ver_equipos";
  const isAsset = 1;
  const [fetchData, datos, loading] =
    useFetchDataParams(uri, isAsset);

  return (
    <div className={styles.contenedorPrincipal}>
      <Header />
      {<Toaster toastOptions={{ duration: 4000 }} />}
      <div className={styles.contenedor}>
        {
          <div className={styles.tabla}>
            <h1 className={styles.titulo_verEquipo}>Equipos</h1>
            {
              <Table
                useColumns={useColumns}
                datos={datos || []} //paso los datos llenar la tabla
                //pageCount={datos.page?.paginated || 1}
                fetchData={fetchData}
                loading={loading}
                //_handleSearch={_handleSearch}
                //total={datos.page?.total || 0}
                //onSort={handleSort}
                isAsset={true} //<-- indicar que mostrare en la tabla los activos
              />
            }
          </div>
        }
      </div>
    </div>
  );
}

export { Assets };
