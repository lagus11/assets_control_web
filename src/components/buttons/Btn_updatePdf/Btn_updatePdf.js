import styles from '../buttons.module.css';
import React from 'react';
import icono_pdf from '../../../iconos/icono_pdf.png';

function Btn_updatePdf({title, onClick}){
    return (
        <button
            type="button"
            className={styles.button_updatePdf}
            onClick={onClick}
            title="Actualizar PDF"
        ><img src={icono_pdf} />{title}</button>    
    );
}

export { Btn_updatePdf }