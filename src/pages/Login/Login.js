import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import imagen_login from "../../iconos/icono_login.png";
import { Btn_submit } from "../../components/buttons/Btn_submit/Btn_submit";
import imagen_no_ver from "../../iconos/icono_no_ver.png";
import imagen_ver from "../../iconos/icono_ver.png";
import { AuthMicrosoftContext } from "../../authMicrosoft/context/AuthMicrosoftContext";
import { AuthContext } from "../../auth/context/AuthContext";
import { ViewWait } from "../../components/ViewWait/ViewWait";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/user/userSlice";

function Login() {
  const navigate = useNavigate(); //constante navegar entre pantallas

  const { login } = useContext(AuthContext);
  const { loginMicrosoft } = useContext(AuthMicrosoftContext);

  const [errorMessages, setErrorMessages] = useState({}); //hook mensaje error usuario/contrasena
  const [auth, setAuth] = useState({ user: "", password: "" }); //hook mandar input al servidor
  const [isSubmitted, setIsSubmitted] = useState(false); //hook si es false abre login, true pasa dashboard
  const [seePassword, setSeePassword] = useState(false); //hook para ver contrasena input
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();

  // mensaje de error en la sesion
  const errors = {
    password: "Usuario y/o contrasena incorrecta",
  };

  const onLogin = (token) => {
    login(token);
    const { user } = jwt_decode(token); //decodifico el token
    dispatch(setUser(user));
    navigate("/");
  };

  // ver contrasena desde el input
  const togglePasswordVisibility = () => {
    setSeePassword(!seePassword);
  };

  // evento presione acceder
  const handlesubmit = (e) => {
    setWait(true);
    axios.post('/authenticate', auth)
    .then((data) => {
      setWait(false);
      //if resultado json ok es true, encontro usuario y accedio, caso contrario manda mensaje error
        onLogin(data.data.token);
    })
    .catch((error) => {
      setWait(false);
      setErrorMessages({ name: "contrasena", message: errors.password });
    });
    //Aqui mando los datos a la BD
    e.preventDefault();
  };

  // capturo los input en el hook
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  //mando el mensaje de error
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <p className={styles.parrafo_error}>{errorMessages.message}</p>
    );

  //diseño del login
  const LoginForm = (
    <div className={styles.contenedorPrincipal}>
       <ViewWait enable={wait} /> 
      <form className={styles.contenedor} onSubmit={handlesubmit}>
        <div className={styles.contenedor_partSuperior}>
          <img
            className={styles.icono_login}
            src={imagen_login}
            alt="icono login"
          />
          <h1 className={styles.titulo_login}>BIENVENIDO</h1>
        </div>
        <div className={styles.contenedor_partInferior}>
          <div className={styles.input_usuario}>
            <input
              placeholder="USUARIO"
              type="text"
              name="user"
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_contrasena}>
            <input
              placeholder="CONTRASEÑA"
              type={seePassword ? "text" : "password"}
              name="password"
              required
              onChange={handleChange}
            />
            <div className={styles.contenedor_iconos_ojos}>
              {
                // if para cambiar el icono de ver y no ver la contrasena
                seePassword ? (
                  <img
                    onClick={togglePasswordVisibility}
                    src={imagen_ver}
                    className={styles.icono_ver_contrasena}
                  />
                ) : (
                  <img
                    onClick={togglePasswordVisibility}
                    src={imagen_no_ver}
                    className={styles.icono_ver_contrasena}
                  />
                )
              }
            </div>
            <div></div>
          </div>

          {
            renderErrorMessage("contrasena") //aqui muestroe el mensaje de error
          }
          <div className={styles.div_button_acceder}>
            <div className={styles.div_button_authMicrosoft}>
              {loginMicrosoft()}
            </div>
            <Btn_submit title={"ACCEDER"} />
          </div>
        </div>
      </form>
    </div>
  );

  return (
    //pregunto si isSubmitted a sido presionado y encontro un usuario valido
    isSubmitted ? <p></p> : LoginForm
  );
}

export { Login };
