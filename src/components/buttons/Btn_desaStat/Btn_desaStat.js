import styles from '../buttons.module.css';
import React from 'react';

function Btn_desaStat({title, onClick}){
    return (
        <button
            type="button"
            className={styles.button_desaStat}
            title="Desasignar el equipo"
            onClick={onClick}
        >{title}</button>    
    );
}

export { Btn_desaStat }