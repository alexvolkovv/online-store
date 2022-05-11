import React from 'react';
import styles from './MyInput.module.css'
import {FormControl} from "react-bootstrap";

const MyInput = ({...props}) => {
  return (
    <FormControl className={styles.input} {...props} />
  );
};

export default MyInput;