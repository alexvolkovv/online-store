import React, {useState} from 'react';
import styles from './Links.module.css'
import {adminLinks, mainAdminLinks} from "../../../utils/AdminLinks";
import MyButton from "../../../UI/MyButton/MyButton";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {PATH_ADMIN} from "../../../utils/Paths";

const Links = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className={styles.links}>
      {adminLinks.map((link) => (
        <div
          key={link.path}
          className={[styles.link, link.path.split('/').reverse()[0] === location.pathname.split('/').reverse()[0] && styles.active].join(' ')}
          onClick={() => {
            navigate(PATH_ADMIN + link.path)
          }}
        >
          {link.name}
        </div>
      ))}

      {mainAdminLinks.map((link) => (
        <div
          key={link.path}
          className={[styles.link, link.path.split('/').reverse()[0] === location.pathname.split('/').reverse()[0] && styles.active].join(' ')}
          onClick={() => {
            navigate(PATH_ADMIN + link.path)
          }}
        >
          {link.name}
        </div>
      ))}
    </div>
  );
};

export default Links;