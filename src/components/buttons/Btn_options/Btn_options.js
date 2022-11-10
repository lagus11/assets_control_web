import styles from '../buttons.module.css';
import React from 'react';
import icono_options from '../../../iconos/icono_options.png';

function Btn_options({title, onClick}){
    return (
        <button
            type="button"
            className={styles.button_options}
            onClick={onClick}
            title="Menu de opciones"
        ><img src={icono_options} />{title}</button>    
    );
}

export { Btn_options }