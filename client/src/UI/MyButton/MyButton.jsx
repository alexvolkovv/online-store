import React from 'react';
import styles from './MyButton.module.css'

const MyButton = (props) => {
  const {children, ...rest} = props

  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
};

export default MyButton;