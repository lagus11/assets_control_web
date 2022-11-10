import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import icono_lupa from "../../iconos/icono_lupaW.png";
import styles from "./ViewModalStatus.module.css";
import axiosJWT from "../../intercept/WithAxios";
import { Select_location } from "../Select_location/Select_location";
import { SweetSelect } from "../SweetSelect/SweetSelect";
import {  useDispatch, useSelector } from "react-redux";
import { closeModalStatusDetails } from "../../store/slices/modalStatusDetails/modalStatusDetailsSlice";

const OpenOptions = ({ actualizarEquipos, setOptions, cerrarModal }) => {

  const { assetSelectStatus } = useSelector(state => state.modalSelectStatus);
  const dispatch = useDispatch();

  const backStatus = () => {
    axiosJWT
      .get("/status_repair/returnStatus/" + assetSelectStatus._id)
      .then((response) => {
        cerrarModal();
        dispatch(closeModalStatusDetails());
        actualizarEquipos(response.data);
      })
      .catch((error) => console.log(error));
  };

  const backStock = () => {
    axiosJWT.get("/ubicaciones/ver_ubicaciones").then((response) => {
      SweetSelect(response.data, "ALMACEN")
        .then((location) => {
          if (!location.isConfirmed) return; //si no confirmo no haga nada
          axiosJWT.get(`status_repair/returnHistory/${assetSelectStatus._id}`).then((response) => {
            if (response.data.ok) {
              const history = {
                idAsset: response.data.status.idAsset,
                EmployeeNumber: response.data.status.employeeNumber,
                fullNameEmployee: response.data.status.fullNameEmployee,
              };
              axiosJWT
                .post("/historial/agregar_historial", history)
                .then((response) => {});
            } //if
            axiosJWT
              .put(`/equipos/cambioState_equipo/${assetSelectStatus._id}`, {
                status: "STOCK",
                location: location.value,
              })
              .then((response) => {
                cerrarModal();
                dispatch(closeModalStatusDetails());
                actualizarEquipos(response.data); //Hice otra funcion para actualizar los datos.
              });
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <h2>Acción</h2>
      {assetSelectStatus.status === "STOCK" && (
        <>
          <button
            className={`${styles.buttonStatus} ${styles.buttonsPrestamo}`}
            onClick={() => setOptions("assignation")}
          >
            Asignación
          </button>
          <button
            className={`${styles.buttonStatus} ${styles.buttonsPrestamo}`}
            onClick={() => setOptions("lend")}
          >
            Prestamo
          </button>

          <button
            className={`${styles.buttonStatus} ${styles.buttonsPrestamo}`}
            onClick={() => setOptions("repair")}
          >
            Reparación
          </button>

          <button
            className={`${styles.buttonStatus} ${styles.buttonsBaja}`}
            onClick={() => setOptions("remove")}
          >
            Baja
          </button>
        </>
      )}

      {(assetSelectStatus.status === "ASIGNADO" || assetSelectStatus.status === "PRESTAMO") && (
        <>
          <button
            className={`${styles.buttonStatus} ${styles.buttonsPrestamo}`}
            onClick={() => setOptions("damaged")}
          >
            Dañado
          </button>
          <button
            className={`${styles.buttonStatus} ${styles.buttonsPrestamo}`}
            onClick={() => setOptions("lost")}
          >
            Extraviado
          </button>
          <button
            className={`${styles.buttonStatus} ${styles.buttonsPrestamo}`}
            onClick={() => setOptions("stolen")}
          >
            Robado
          </button>
        </>
      )}

      {assetSelectStatus.status === "DAÑADO" && (
        <>
          <button
            className={`${styles.buttonStatus} ${styles.buttonsPrestamo}`}
            onClick={() => setOptions("repair")}
          >
            REPARACIÓN
          </button>
        </>
      )}

      {assetSelectStatus.status === "REPARACIÓN" && (
        <>
          <button
            className={`${styles.buttonStatus} ${styles.buttonsPrestamo}`}
            onClick={() => backStatus()}
          >
            ASIGNAR
          </button>

          <button
            className={`${styles.buttonStatus} ${styles.buttonsPrestamo}`}
            onClick={() => backStock()}
          >
            STOCK
          </button>
        </>
      )}
      {(assetSelectStatus.status === "ROBADO" || assetSelectStatus.status === "EXTRAVIADO") && (
        <>
          <button
            className={`${styles.buttonStatus} ${styles.buttonsPrestamo}`}
            onClick={() => setOptions("remove")}
          >
            BAJA
          </button>
        </>
      )}
    </>
  );
};

const OpenAssignation = ({
  inputTag,
  cerrarModal,
  actualizarEquipos,
}) => {

  const { assetSelectStatus } = useSelector(state => state.modalSelectStatus);

  const initialValues = {
    employeeNumber: "",
    nombre: "",
    apellidos: "",
    area: "",
    immBoss: "",
    dateAssignation: "",
  };

  const updateAttachments = (e) => {
    const formData = new FormData();
    formData.append("idAsset", assetSelectStatus._id);
    formData.append("tag", inputTag.current.value);
    formData.append("employeeNumber", e.employeeNumber);
    formData.append("name", e.nombre);
    formData.append("lastname", e.apellidos);
    formData.append("area", e.area);
    formData.append("immBoss", e.immBoss);
    formData.append("dateAssignation", e.dateAssignation);

    //si no existe e.file signifca que no hay pdf, por lo cual no lo mando
    !!e.file &&
      formData.append("file", e.file, inputTag.current.value + ".pdf");

    axiosJWT
      .post("/status_assignation/asignar", formData)
      .then((response) => {
        response.data.ok ? updateStatus(assetSelectStatus._id, e.location) : null;
        cerrarModal();
      })
      .catch((error) => console.log(error));
  };

  const updateStatus = (id, location) => {
    axiosJWT
      .put(`/equipos/cambioState_equipo/${id}`, {
        status: "ASIGNADO",
        location: location,
      })
      .then((response) => {
        actualizarEquipos(response.data); //Hice otra funcion para actualizar los datos.
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h2>Asignado</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={updateAttachments}
        enableReinitialize
      >
        {(formik) => (
          <Form id="formStatus" className={styles.formStatus}>
            <label className={styles.isRequerided}># Empleado</label>
            <div>
              <Field
                name="employeeNumber"
                type="text"
                required={true}
              />
              <span onClick={() => {}}>
                <img src={icono_lupa} alt="lupa" />
              </span>
            </div>
            <label className={styles.isRequerided}>Nombre</label>
            <Field type="text" name="nombre" required={true} />
            <label className={styles.isRequerided}>Apellidos</label>
            <Field type="text" name="apellidos" required={true} />
            <label className={styles.isRequerided}>Area</label>
            <Field type="text" name="area" required={true} />
            <label>JEFE INMEDIATO</label>
            <Field type="text" name="immBoss" />
            <Select_location
              classNameLabel={styles.isRequerided}
              type={"CEDIS"}
              required={true}
              
            />
            <label className={styles.isRequerided}>FECHA ASIGNACIÓN</label>
            <Field type="date" name="dateAssignation" required={true} />
            <label>Resguardo</label>
            <input
              type="file"
              name="file"
              accept=".pdf"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
                <Field type="date" name="dateAssignation" />;
              }}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

const OpenRepair = ({
  inputTag,
  cerrarModal,
  actualizarEquipos,
}) => {

  const { assetSelectStatus } = useSelector(state => state.modalSelectStatus);
  const dispatch = useDispatch();
  const initialValues = {
    supplier: "",
    dateRepair: "",
  };
  const [suppliers, setSuppliers] = useState([]);
  const [isRequeridedInvoice, setIsRequeridedInvoice] = useState(true);

  useEffect(() => {
    axiosJWT
      .get("/proveedores/ver_proveedores")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateAttachments = (e) => {
    const formData = new FormData();
    formData.append("idAsset", assetSelectStatus._id);
    formData.append("tag", inputTag.current.value);
    formData.append("supplier", e.supplier);
    formData.append("dateRepair", e.dateRepair);
    formData.append("ultimateStat", assetSelectStatus.status);

    if(isRequeridedInvoice){
      !!e.file &&
      formData.append("invoice", e.file, inputTag.current.value + ".pdf"); //no ingreso input archivo is no es requerido
    }

    axiosJWT
      .post("/status_repair/reparar", formData)
      .then((response) => {
        response.data.ok ? updateStatus(assetSelectStatus._id) : null;
      })
      .catch((error) => console.log(error));
  };

  const updateStatus = (id) => {
    axiosJWT
      .put(`/equipos/cambioState_equipo/${id}`, {
        status: "REPARACIÓN",
      })
      .then((data) => {
        actualizarEquipos(data.data); //Hice otra funcion para actualizar los datos.
        dispatch(closeModalStatusDetails());
        cerrarModal();
      })
      .catch((error) => console.log(error));
  };

  const FuncRequeridedInvoice = (supplier) => {
    if (supplier.target[supplier.target.selectedIndex].text === "T.I.") {
      setIsRequeridedInvoice(false);
    } else {
      setIsRequeridedInvoice(true);
    }
  };

  return (
    <>
      <h2>Reparación</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={updateAttachments}
        enableReinitialize
      >
        {(formik) => (
          <Form id="formStatus" className={styles.formStatus}>
            <label className={styles.isRequerided}>Proveedor</label>
            <Field
              name="supplier"
              className={styles.input_datos}
              as="select"
              onChange={(event) => {
                FuncRequeridedInvoice(event);
                formik.setFieldValue("supplier", event.target.value);
              }}
              required={true}
            >
              <option value="" disabled>
                SELECCIONE PROVEEDOR
              </option>

              {suppliers.map((supplier) => {
                return (
                  <option key={supplier._id} value={supplier._id}>
                    {supplier.name}
                  </option>
                );
              })}
            </Field>
            <label className={styles.isRequerided}>Fecha Reparación</label>
            <Field type="date" name="dateRepair" required={true} />

            <label>Factura</label>
            <input
              type="file"
              name="invoice"
              accept=".pdf"
              disabled={!isRequeridedInvoice}
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

const OpenLend = ({
  inputTag,
  cerrarModal,
  actualizarEquipos,
}) => {
  const { assetSelectStatus } = useSelector(state => state.modalSelectStatus);

  const initialValues = {
    employeeNumber: "",
    nombre: "",
    apellidos: "",
    area: "",
    immBoss: "",
    dateLendInit: "",
    dateLendFinish: "",
  };

  const updateAttachments = (e) => {
    //modifico el nombre pdf
    const formData = new FormData();
    formData.append("idAsset", assetSelectStatus._id);
    formData.append("tag", inputTag.current.value);
    formData.append("employeeNumber", e.employeeNumber);
    formData.append("name", e.nombre);
    formData.append("lastname", e.apellidos);
    formData.append("area", e.area);
    formData.append("immBoss", e.immBoss);
    formData.append("dateLendInit", e.dateLendInit);
    formData.append("dateLendFinish", e.dateLendFinish);

    //si no existe e.file signifca que no hay pdf, por lo cual no lo mando
    !!e.file &&
      formData.append("file", e.file, inputTag.current.value + ".pdf");

    axiosJWT
      .post("/status_lend/prestar", formData)
      .then((response) => {
        response.data.ok ? updateStatus(assetSelectStatus._id, e.location) : null;
        cerrarModal();
      })
      .catch((err) => console.log(err));
  };

  const updateStatus = (id, location) => {
    axiosJWT
      .put(`/equipos/cambioState_equipo/${id}`, {
        status: "PRESTAMO",
        location: location,
      })
      .then((data) => {
        actualizarEquipos(data.data); //Hice otra funcion para actualizar los datos.
      });
  };

  return (
    <>
      <h2>Prestamo</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={updateAttachments}
        enableReinitialize
      >
        {(formik) => (
          <Form id="formStatus" className={styles.formStatus}>
            <label className={styles.isRequerided}># Empleado</label>
            <div>
              <Field
                name="employeeNumber"
                type="text"
                required={true}
              />
              <span onClick={() => {}}>
                <img src={icono_lupa} alt="lupa" />
              </span>
            </div>
            <label className={styles.isRequerided}>Nombre</label>
            <Field type="text" name="nombre" required={true} />
            <label className={styles.isRequerided}>Apellidos</label>
            <Field type="text" name="apellidos" required={true} />
            <label className={styles.isRequerided}>Area</label>
            <Field type="text" name="area" required={true} />
            <label>JEFE INMEDIATO</label>
            <Field type="text" name="immBoss" />
            <Select_location type={"CEDIS"} required={true} classNameLabel={styles.isRequerided} />
            <label className={styles.isRequerided}>Fecha de Inicio</label>
            <Field type="date" name="dateLendInit" required={true} />
            <label className={styles.isRequerided}>Fecha de devolución</label>
            <Field type="date" name="dateLendFinish" required={true} />
            <label>Resguardo</label>
            <input
              type="file"
              name="file"
              accept=".pdf"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

const OpenDamaged = ({
  inputTag,
  cerrarModal,
  actualizarEquipos,
}) => {

  const { assetSelectStatus, employee } = useSelector(state => state.modalSelectStatus);
  const dispatch = useDispatch();

  const initialValues = {
    dateDamaged: "",
  };

  const updateAttachments = (e) => {
    const formData = new FormData();
    formData.append("idAsset", assetSelectStatus._id);
    formData.append("tag", inputTag.current.value);
    formData.append("dateDamaged", e.dateDamaged);
    formData.append("employeeNumber", employee.employeeNumber);
    formData.append("fullNameEmployee", employee.fullNameEmployee);
    formData.append("ultimateStat", assetSelectStatus.status);
    
    !!e.investReport &&
    formData.append(
      "investReport",
      e.investReport,
      inputTag.current.value + ".pdf"
    );

    !!e.receiPayment &&
    formData.append(
      "receiPayment",
      e.receiPayment,
      inputTag.current.value + ".pdf"
    );

    axiosJWT
      .post("/status_damaged/danado", formData)
      .then((response) => {
        response.data.ok ? updateStatus(assetSelectStatus._id) : null;
      })
      .catch((error) => console.log(error));
  };

  const updateStatus = (id) => {
    axiosJWT
      .put(`/equipos/cambioState_equipo/${id}`, {
        status: "DAÑADO",
      })
      .then((response) => {
        actualizarEquipos(response.data); //Hice otra funcion para actualizar los datos.
        dispatch(closeModalStatusDetails());
        cerrarModal();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h2>Dañado</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={updateAttachments}
        enableReinitialize
      >
        {(formik) => (
          <Form id="formStatus" className={styles.formStatus}>
            <label className={styles.isRequerided}>Fecha daño</label>
            <Field type="date" name="dateDamaged" required={true} />

            <label>Acta Investigación</label>
            <input
              type="file"
              name="investReport"
              accept=".pdf"
              onChange={(event) => {
                formik.setFieldValue(
                  "investReport",
                  event.currentTarget.files[0]
                );
              }}
            />

            <label>Recibo de cobro</label>
            <input
              type="file"
              name="file2"
              accept=".pdf"
              onChange={(event) => {
                formik.setFieldValue(
                  "receiPayment",
                  event.currentTarget.files[0]
                );
              }}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

const OpenLost = ({
  inputTag,
  cerrarModal,
  actualizarEquipos
}) => {

  const { assetSelectStatus, employee } = useSelector(state => state.modalSelectStatus);
  const dispatch = useDispatch();
  const initialValues = {
    dateLost: "",
  };

  const updateAttachments = (e) => {
    const formData = new FormData();
    formData.append("idAsset", assetSelectStatus._id);
    formData.append("tag", inputTag.current.value);
    formData.append("dateLost", e.dateLost);
    formData.append("employeeNumber", employee.employeeNumber);
    formData.append("fullNameEmployee", employee.fullNameEmployee);
    
    !!e.investReport &&
    formData.append(
      "investReport",
      e.investReport,
      inputTag.current.value + ".pdf"
    );

    !!e.receiPayment &&
    formData.append(
      "receiPayment",
      e.receiPayment,
      inputTag.current.value + ".pdf"
    );

    axiosJWT
      .post("/status_lost/extraviado", formData)
      .then((response) => {
        response.data.ok ? updateStatus(assetSelectStatus._id) : null;
      })
      .catch((error) => console.log(error));
  };

  const updateStatus = (id) => {
    axiosJWT
      .put(`/equipos/cambioState_equipo/${id}`, {
        status: "EXTRAVIADO",
      })
      .then((response) => {
        const history = {
          idAsset: assetSelectStatus._id,
          EmployeeNumber: employee.employeeNumber,
          fullNameEmployee: employee.fullNameEmployee,
        };
        axiosJWT
          .post("/historial/agregar_historial", history)
          .then((response) => {
            actualizarEquipos(response.data); //Hice otra funcion para actualizar los datos.
            dispatch(closeModalStatusDetails());
            cerrarModal();
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h2>Extraviado</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={updateAttachments}
        enableReinitialize
      >
        {(formik) => (
          <Form id="formStatus" className={styles.formStatus}>
            <label className={styles.isRequerided}>Fecha de Extraviado</label>
            <Field type="date" name="dateLost" required={true} />
            <label>Acta Investigación</label>
            <input
              type="file"
              name="investReport"
              accept=".pdf"
              onChange={(event) => {
                formik.setFieldValue(
                  "investReport",
                  event.currentTarget.files[0]
                );
              }}
            />

            <label>Recibo de cobro</label>
            <input
              type="file"
              name="file2"
              accept=".pdf"
              onChange={(event) => {
                formik.setFieldValue(
                  "receiPayment",
                  event.currentTarget.files[0]
                );
              }}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

const OpenStolen = ({
  inputTag,
  cerrarModal,
  actualizarEquipos,
}) => {

  const { assetSelectStatus, employee } = useSelector(state => state.modalSelectStatus);
  const dispatch = useDispatch();
  const initialValues = {
    dateStolen: "",
  };

  const updateAttachments = (e) => {
    const formData = new FormData();
    formData.append("idAsset", assetSelectStatus._id);
    formData.append("tag", inputTag.current.value);
    formData.append("dateStolen", e.dateStolen);
    formData.append("employeeNumber", employee.employeeNumber);
    formData.append("fullNameEmployee", employee.fullNameEmployee);

    !!e.investReport &&
    formData.append(
      "investReport",
      e.investReport,
      inputTag.current.value + ".pdf"
    );

    !!e.actPublMinistry &&
    formData.append(
      "actPublMinistry",
      e.actPublMinistry,
      inputTag.current.value + ".pdf"
    );

    axiosJWT
      .post("/status_stolen/robado", formData)
      .then((response) => {
        response.data.ok ? updateStatus(assetSelectStatus._id) : null;
      })
      .catch((error) => console.log(error));
  };

  const updateStatus = (id) => {
    axiosJWT
      .put(`/equipos/cambioState_equipo/${id}`, {
        status: "ROBADO",
      })
      .then((response) => {
        const history = {
          idAsset: assetSelectStatus._id,
          EmployeeNumber: employee.employeeNumber,
          fullNameEmployee: employee.fullNameEmployee,
        };
        axiosJWT
          .post("/historial/agregar_historial", history)
          .then((response) => {
            actualizarEquipos(response.data); //Hice otra funcion para actualizar los datos.
            dispatch(closeModalStatusDetails());
            cerrarModal();
          });
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <h2>Robado</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={updateAttachments}
        enableReinitialize
      >
        {(formik) => (
          <Form id="formStatus" className={styles.formStatus}>
            <label className={styles.isRequerided}>Fecha Robo</label>
            <Field type="date" name="dateStolen" required={true} />

            <label>Acta ministerio publico</label>
            <input
              type="file"
              name="actPublMinistry"
              accept=".pdf"
              onChange={(event) => {
                formik.setFieldValue(
                  "actPublMinistry",
                  event.currentTarget.files[0]
                );
              }}
            />

            <label>Acta Investigación</label>
            <input
              type="file"
              name="investReport"
              accept=".pdf"
              onChange={(event) => {
                formik.setFieldValue(
                  "investReport",
                  event.currentTarget.files[0]
                );
              }}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export {
  OpenOptions,
  OpenAssignation,
  OpenRepair,
  OpenLend,
  OpenDamaged,
  OpenLost,
  OpenStolen,
};
