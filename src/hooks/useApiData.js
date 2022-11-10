import axiosJWT from "../intercept/WithAxios";

export const postData = (CreateUri, dataForm, actualizar) => {
  axiosJWT
    .post(CreateUri, dataForm)
    .then((data) => {
      form.reset();
      actualizar(data.data); //Hice otra funcion para actualizar los datos.
    })
    .catch((error) => messageError(error.response.data));
};

export const putData = (UpdateUri, dataForm, actualizar, closeModal) => {
  axiosJWT
    .put(`${UpdateUri}/${dataForm._id}`, dataForm)
    .then((data) => {
      closeModal(); //cierro la ventana modal
      actualizar(data.data); //Hice otra funcion para actualizar los datos.
    })
    .catch((error) => console.log(error));
};
