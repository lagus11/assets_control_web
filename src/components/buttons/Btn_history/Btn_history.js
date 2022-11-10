import styles from '../buttons.module.css';
import React from 'react';
import icono_history from '../../../iconos/icono_history.png';

function Btn_history({title, onClick}){
    return (
        <button
            type="button"
            className={styles.button_history}
            onClick={onClick}
            title="Ver historial del equipo"
        ><img src={icono_history} />{title}</button>    
    );
}

export { Btn_history }