function template() {
  const template = {
    title: "Proveedores",
    fields: [
      {
        title: "Nombre",
        type: "text",
        name: "name",
        required: true
      },
      {
        title: "Dirección",
        type: "text",
        name: "address",
        required: false
      },
      {
        title: "Teléfono",
        type: "number",
        name: "phone_number",
        required: true
      },
      {
        title: "Correo",
        type: "text",
        name: "email",
        required: false
      },
      {
        title: "Tipo",
        type: "text",
        name: "type",
        required: false
      },
      {
        title: "Comentario",
        type: "text",
        name: "comment",
      },
    ],
    initialValues: {
      _id: "",
      name: "",
      address: "",
      phone_number: "",
      email: "",
      type: "",
      comment: "",
    },
  };

  return template;
}

export { template };
