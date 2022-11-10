import styles from '../buttons.module.css';
import React from 'react';

function Btn_submit({title, form}){
    return (
        <button
            type="submit"
            className={styles.button_submit}
            form={form}
        >{title}</button>    
    );
}

export { Btn_submit }