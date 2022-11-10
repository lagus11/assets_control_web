import styles from '../buttons.module.css';
import React from 'react';

function Btn_back({title, onClick}){
    return (
        <button
            type="button"
            className={styles.button_back}
            onClick={onClick}
        >{title}</button>    
    );
}

export { Btn_back }