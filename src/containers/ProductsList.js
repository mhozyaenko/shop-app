import React, {Fragment, useState} from 'react';
import ProductItem from "../components/ProductItem";
import {selectPaginationData, selectProductOrigins, selectProductsIds, selectProductsObj} from "../store/selectors";
import {connect} from "react-redux";
import {addItemsToCart, incrementItemsCount} from "../store/cart/actions";
import {Button, Modal, Pagination} from "antd";
import {PER_PAGE_OPTIONS} from "../constants/filterOptions";
import {setPage, setPageItems} from "../store/filters/action";
import AddProductForm from "../components/ProductForm";
import {getFormInitialValues, getFormValues, initialize, isSubmitting, stopSubmit, startSubmit, reset} from 'redux-form';
import {postUpdateProduct} from "../api/products";
import {setChangedProduct} from "../store/products/actions";
import {openNotificationWithIcon} from "../services/notifications";

function ProductList({
                       productIds,
                       products,
                       addItemsToCart,
                       incrementItemsCount,
                       pagination,
                       setPage,
                       setPageItems,
                       ownProducts,
                       origins,
                       initialize,
                       initialValues,
                       startSubmit,
                       stopSubmit,
                       reset,
                       productData,
                       isSubmitting,
                       setChangedProduct
}) {
  const [modalOpened, setModalOpened] = useState(false);

  const handleAddClick = (id, isInCart) => {
    isInCart ? incrementItemsCount(id) : addItemsToCart(id);
  };

  const handleEditClick = id => {
    setModalOpened(true);
    initialize('product', products[id])
  };

  const onModalCancel = () => {
    setModalOpened(false);
  };

  const onModalSubmit = (data) => {
    startSubmit('product');
    postUpdateProduct(data)
      .then(response => {
        stopSubmit('product');
        if(response) {
          openNotificationWithIcon('success', 'Congrats!', 'Your product is succesfully updated');
          setModalOpened(false);
          reset('product');
          setChangedProduct({data});
        } else {
          openNotificationWithIcon('error', 'OOPS!', 'Something went wrong... Please try again')
        }
      })
  };

  const handlePageChange = (page) => {
    setPage({page})
  };

  const handleItemsChange = (current, size) => {
    setPageItems({current, size})
  };

  return (
    <Fragment>
      {pagination.totalItems && <Pagination
        style={{marginTop: 25, marginLeft: 50}}
        total={pagination.totalItems}
        defaultPageSize={pagination.perPage}
        showSizeChanger
        defaultCurrent={pagination.page}
        pageSizeOptions={PER_PAGE_OPTIONS}
        onChange={handlePageChange}
        onShowSizeChange={handleItemsChange}
      />}
      <div className="products-list">
        {productIds.map( id => (
          <ProductItem key={id}
                       product={products[id]}
                       editProductClick={handleEditClick}
                       addProductClick={handleAddClick} />
        ))}
      </div>
      {ownProducts && <Modal visible={modalOpened}
                             onCancel={onModalCancel}
                             title="Edit product"
                             footer={[
                               <Button type="primary" onClick={() => onModalSubmit(productData)}>
                               Submit
                               </Button>,
                               <Button onClick={onModalCancel} type="danger">
                                 Cancel
                               </Button>,
                               <Button onClick={() => initialize('product', initialValues)}>
                                 Reset
                               </Button>]}>
        <AddProductForm origins={origins} disabled={isSubmitting}/>
      </Modal>}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  productIds: selectProductsIds(state),
  products: selectProductsObj(state),
  pagination: selectPaginationData(state),
  origins: selectProductOrigins(state),
  initialValues: getFormInitialValues('product')(state),
  productData: getFormValues('product')(state),
  isSubmitting: isSubmitting('product')(state)
});

const actions = {
  addItemsToCart,
  incrementItemsCount,
  setPage,
  setPageItems,
  initialize,
  startSubmit,
  stopSubmit,
  reset,
  setChangedProduct
};

const enhance = connect(mapStateToProps, actions);

export default enhance(ProductList);