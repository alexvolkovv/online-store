import React from 'react';
import styles from './Loader.module.css'

const Loader = ({...props}) => {
  return (
    <div {...props} className={styles.wrap}>
      <div  className={styles.loader}></div>
    </div>
  );
};

export default Loader;