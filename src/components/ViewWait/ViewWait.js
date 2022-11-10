import React from 'react';
import styles2 from './ViewWait.module.css';
import spinLoading from '../../iconos/spin_loading.png';

function ViewWait({enable}) {
    return(
        <div className={enable ? styles2.View: styles2.noView }>
            <i><img src={spinLoading} alt="loading"/></i>
        </div>
    );
}

export { ViewWait };