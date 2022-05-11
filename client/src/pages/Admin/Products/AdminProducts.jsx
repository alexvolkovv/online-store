import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import DataInfo from "../DataInfo/DataInfo";
import ProductsStore from "../../../store/ProductsStore";
import universalSort from "../../../utils/universalSort";
import ChangeProduct from "../../../Modals/ChangeProduct/ChangeProduct";
import ProductsAPI from "../../../API/ProductsAPI";
import BrandsStore from "../../../store/BrandsStore";
import CategoriesStore from "../../../store/CategoriesStore";
import {Button} from "react-bootstrap";

const AdminProducts = observer(() => {
  const [modalVisible, setModalVisible] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  useEffect(() => {
    ProductsStore.fetchProducts()
  }, [])

  function rowClick(product) {
    ProductsAPI.getOne(product.id)
      .then(data => {
        ProductsStore.setChangingProduct(data.product)
        ProductsStore.setChangingProductInfo(data.productInfo?.map(info => ({...info, fakeId: Date.now() + Math.random()})))
        ProductsStore.setChangingProductLists({
          brand: BrandsStore.brands.find(brand => +brand.id === +product.brand_id),
          category: CategoriesStore.categories.find(category => +category.id === +product.category_id),
        })
        ProductsStore.setChangingFile(null)
        setIsAdd(false)
        setModalVisible(true)
      })
  }

  function addClick() {
    setModalVisible(true)
    setIsAdd(true)
  }

  function closeModal() {
    setModalVisible(false)

    setTimeout(() => {
      ProductsStore.setChangingProduct({})
      ProductsStore.setChangingProductInfo([])
      ProductsStore.setChangingProductLists({
        brand: '',
        category: '',
      })
      ProductsStore.setChangingFile(null)
    }, 200)
  }

  function sortProducts(param, asc) {
    universalSort(param, ProductsStore.products, ProductsStore.setProducts.bind(ProductsStore), asc)
  }
  return (
    <div style={{width: '100%'}}>
      <Button onClick={addClick}>Добавить новый товар</Button>
      <DataInfo
        data={ProductsStore.products}
        rowClick={rowClick}
        sort={sortProducts}
        deletingColumns={[
          'description',
          'image',
          'brand_id',
          'category_id'
        ]}
      />
      <ChangeProduct
        show={modalVisible}
        onHide={closeModal}
        isAdd={isAdd}
      />
    </div>
  );
});

export default AdminProducts;