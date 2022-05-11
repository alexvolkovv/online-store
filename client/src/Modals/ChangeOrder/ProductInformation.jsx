import React from 'react';
import {PATH_HOST} from "../../utils/Paths";

const ProductInformation = ({product}) => {
  return (
    <div style={{display:'flex', marginTop: '15px'}} >
      <img width={100} height={100} style={{objectFit: 'contain', marginRight: '15px'}} src={PATH_HOST + '/' + product.image} alt="dsad"/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <span>{product.product_name}</span>
        <span>Количество: {product.product_count}</span>
        <span>Цена: {product.price} Р</span>
        <span>Артикул: {product.article}</span>
      </div>
    </div>
  );
};

export default ProductInformation;