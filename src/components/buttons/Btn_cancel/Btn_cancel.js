import React from 'react';
import styles from '../buttons.module.css';

function Btn_cancel({title, onPress}) {

    return(
        <button
            type="reset"
            className={styles.button_cancel}
            onClick={onPress}
        >{title}</button>    
    );
}

export { Btn_cancel};