import React from 'react';
import styles from './ProductCard.module.css'
import {PATH_HOST} from "../../../../utils/Paths";
import {observer} from "mobx-react-lite";

const ProductCard = observer((props) => {
  const {product, onClick} = props
  return (
    <div className={styles.productCard} onClick={onClick}>
      <img width={200} height={150} src={PATH_HOST + '/' + product.image} alt="Product img"/>
      <div >
        <div className={styles.name}>{product.product_name}</div>
        <div className={styles.price}>{product.price} ₽</div>
      </div>
    </div>
  );
});

export default ProductCard;