import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ProductItem from "../components/ProductItem";
import {connect, useSelector} from "react-redux";
import {Button, Modal, Pagination, Spin} from "antd";
import {PER_PAGE_OPTIONS} from "../constants/filterOptions";
import {setPage, setPageItems} from "../store/filters/action";
import ProductForm from "../components/ProductForm";
import {getFormInitialValues, initialize, isSubmitting, reset, submit} from 'redux-form';
import productsListSaga from "../store/sagas/productsListSaga";
import {useInjectSaga} from "./AppWrapper";
import {toggleModal} from "../store/app/actions";
import {selectProductOrigins, selectProductsIds, selectProductsObj} from "../store/products/selectors";
import {selectPaginationData} from "../store/filters/selectors";
import {selectAppLoading, selectModalStatus} from "../store/app/selectors";
import {productShape} from "../shapes/productShape";

const FORM_NAME = 'updateProduct';

function ProductList({
                       productIds,
                       products,
                       pagination,
                       setPage,
                       setPageItems,
                       ownProducts,
                       origins,
                       initialize,
                       initialValues,
                       reset,
                       isSubmitting,
                       submit,
                       isLoading,
                       toggleModal
}) {
  useInjectSaga('productsList', productsListSaga);

  const modalOpened = useSelector(selectModalStatus(FORM_NAME));

  const handleEditClick = id => {
    toggleModal({name: FORM_NAME, status: true});
    initialize(FORM_NAME, products[id])
  };

  const onModalCancel = () => {
    toggleModal({name: FORM_NAME, status: false})
  };

  const handlePageChange = (page) => {
    setPage({page})
  };

  const handleItemsChange = (current, size) => {
    setPageItems({current, size})
  };

  return (
    <Spin spinning={isLoading} size="large">
      <Fragment>
        {pagination.totalItems && <Pagination
          style={{marginTop: 25, marginLeft: 50}}
          total={pagination.totalItems}
          defaultPageSize={pagination.perPage}
          showSizeChanger
          current={pagination.page}
          defaultCurrent={pagination.page}
          pageSizeOptions={PER_PAGE_OPTIONS}
          onChange={handlePageChange}
          onShowSizeChange={handleItemsChange}
        />}
        <div className="products-list">
          {productIds.map( id => (
            <ProductItem key={id}
                         product={products[id]}
                         editProductClick={handleEditClick}/>
          ))}
        </div>
        {ownProducts && <Modal visible={modalOpened}
                               onCancel={onModalCancel}
                               title="Edit product"
                               footer={[
                                 <Button key="ok" type="primary" onClick={() => submit(FORM_NAME)}>
                                   Submit
                                 </Button>,
                                 <Button key="cancel" onClick={onModalCancel} type="danger">
                                   Cancel
                                 </Button>,
                                 <Button key ="reset" onClick={() => initialize(FORM_NAME, initialValues)}>
                                   Reset
                                 </Button>]}>
          <ProductForm
            origins={origins}
            disabled={isSubmitting}
            name={FORM_NAME} />
        </Modal>}
      </Fragment>
    </Spin>
  )
}

const mapStateToProps = state => ({
  productIds: selectProductsIds(state),
  products: selectProductsObj(state),
  pagination: selectPaginationData(state),
  origins: selectProductOrigins(state),
  initialValues: getFormInitialValues(FORM_NAME)(state),
  isSubmitting: isSubmitting(FORM_NAME)(state),
  isLoading: selectAppLoading(state)
});

const actions = {
  setPage,
  setPageItems,
  initialize,
  reset,
  submit,
  toggleModal
};

const enhance = connect(mapStateToProps, actions);

ProductList.propTypes = {
  productIds: PropTypes.array,
  products: PropTypes.object,
  pagination: PropTypes.shape({
    page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    perPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalItems: PropTypes.number
  }),
  setPage: PropTypes.func,
  setPageItems: PropTypes.func,
  ownProducts: PropTypes.bool,
  origins: PropTypes.array,
  initialize: PropTypes.func,
  initialValues: productShape,
  reset: PropTypes.func,
  isSubmitting: PropTypes.bool,
  submit: PropTypes.func,
  isLoading: PropTypes.bool,
  toggleModal: PropTypes.func
};

export default enhance(ProductList);