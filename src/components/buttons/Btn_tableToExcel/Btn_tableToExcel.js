import styles from '../buttons.module.css';
import React from 'react';
import icono_download from '../../../iconos/icono_download.png';

function Btn_tableToExcel({title, onClick}){
    return (
        <button
            type="button"
            className={styles.button_tableToExcel}
            onClick={onClick}
        ><img src={icono_download} />{title}</button>    
    );
}

export { Btn_tableToExcel }