import React from "react";
import { Header } from '../Header/Header';
import styles from './Container.module.css'

function Container({children}) {
  return (
    <div className={styles.mainContainer}>
      <Header />
        <div className={styles.container}>
            {children}
        </div>
    </div>
  );
}

export { Container };