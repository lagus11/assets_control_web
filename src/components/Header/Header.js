import React, { useState } from "react";
import styles from "./Header.module.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthMicrosoftContext } from "../../authMicrosoft/context/AuthMicrosoftContext";
import icono_home from "../../iconos/icono_home.png"
import icono_logout from "../../iconos/icono_logout.png";
import icono_equipment from "../../iconos/icono_equipment.png";
import icono_manage from "../../iconos/icono_manage.png";
import { useSelector } from "react-redux";


function Header() {

    const [btnMenuP, setBtnMenuP] = useState(false); //hook presionado muestra menu principal
    const [MenuP, setMenuP] = useState(styles.menuP_movil_noVer); //hook cambiar visibilidad menu principal movil
    const navigate = useNavigate(); //constante navegar entre pantallas
    const { logoutMicrosoft } = useContext( AuthMicrosoftContext );
    const [burgerMenu, setBurgerMenu] = useState(
        [
            {id:"equipo", state: false, style: styles.noWatchInput}, 
            {id:"administrar", state: false, style: styles.noWatchInput}
        ]);
    const user = useSelector(state => state.userState.user); //obtengo el usuario logeado

    const onLogout = () => {
        logoutMicrosoft();
        navigate('login');
    }
    //funcion cambia visibilidad menu principal
    const getMenuP = () => {
        setBtnMenuP(!btnMenuP); //cambio su estado
        btnMenuP? setMenuP(styles.menuP_movil_noVer) : setMenuP(styles.menuP_movil_Ver); //envio clase css
    }

    /* solucionar el menu hamburguesa */
    const watchInput = (e) => {
        if(btnMenuP){
                setBurgerMenu(burgerMenu.map(x => {
                if(x.id === e.target.id && x.state === false) {
                    return {...x, state: true, style: styles.watchInput}
                }else{
                    if(x.id === e.target.id && x.state === true) {
                        return {...x, state: false, style: styles.noWatchInput}
                    }
                    else {
                        return {...x, state: false, style: styles.noWatchInput}
                    }
                }
            }));
        }
    }

    return(
        <div className={styles.div_header}>
            <header className={styles.header}>
                
                    <h1 className={styles.titulo}>Inventario</h1>
                    <div className={styles.menu_bar}>
                        <a className={styles.bt_menu}><span onClick={getMenuP}>&#9776;</span></a>
                    </div>
                    <nav className={MenuP} onClick={(e) => watchInput(e)}>
                        
                        <ul>
                            <li className={burgerMenu[0].style}>
                                <a onClick={(e) => watchInput(e)} id="equipo">
                                <img src={icono_equipment} alt="icono_equipos"/>&nbsp;Equipos <span>▼</span></a>
                                <ul className={styles.children}>
                                    <li ><Link to="/Equipos">Equipos</Link></li>
                                    <li ><Link to="/Equipos_Baja">Equipos Bajas</Link></li>
                                    <li ><Link to="/Equipos_Prestamo">Equipos Prestamos</Link></li>
                                    <li ><Link to="/Equipos_Especifico">Equipos Específicos</Link></li>
                                    <li ><Link to="/Equipos_General">Equipos Generales</Link></li>
                                </ul>
                            </li>

                            <li className={burgerMenu[1].style}>
                                <a onClick={(e) => watchInput(e)} id="administrar">
                                    <img src={icono_manage} alt="icono_administrar"/>
                                    &nbsp;Administrar <span>▼</span></a>
                                <ul className={styles.children}>
                                    <li><Link to="/Proveedor">Proveedores</Link></li>
                                    <li><Link to="/Tipos_Equipos">Tipos de Equipos</Link></li>
                                    <li><Link to="/empresas_activo">Empresas Activos</Link></li>
                                    {
                                        (user.role.type.name === 'admin' && !!user.role.type.name) &&
                                            <li><Link to="/control_accesso">Control Acceso</Link></li>
                                    }
                                    <li><Link to="/ubicaciones">Ubicaciones</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/"><img src={icono_home} alt="icono_home"/>&nbsp;Inicio</Link>
                            </li>
                            <li>
                                <a onClick={() => onLogout()}> <img src={icono_logout} alt="icono_logout" />&nbsp;Salir</a>
                                {
                                    //<ButtonContent />
                                    //<a onClick={salir}>Salir</a>
                                }
                            </li>
                        </ul>
                    </nav>  
            </header>
        </div>
    );
}

export { Header };