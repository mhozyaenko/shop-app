import React, {Fragment} from 'react';
import ProductItem from "../components/ProductItem";
import {selectPaginationData, selectProductsIds, selectProductsObj} from "../store/selectors";
import {connect} from "react-redux";
import {addItemsToCart, incrementItemsCount} from "../store/cart/actions";
import {bindActionCreators} from "redux";
import {Pagination} from "antd";
import {PER_PAGE_OPTIONS} from "../constants/filterOptions";
import {setPage, setPageItems} from "../store/filters/action";

/**
 * list of products
 * @returns {*}
 * @constructor
 */
function ProductList({
                       productIds,
                       products,
                       addItemsToCart,
                       incrementItemsCount,
                       pagination,
                       setPage,
                       setPageItems
}) {

  /**
   * handle add to cart click
   * @param id
   * @param isInCart
   */
  const handleClick = (id, isInCart) => {
    isInCart ? incrementItemsCount(id) : addItemsToCart(id);
  };

  /**
   * handle page change
   * @param page
   */
  const handlePageChange = (page) => {
    console.log(page);
    setPage({page})
  };

  /**
   * handle items per page option change
   * @param current
   * @param size
   */
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
          <ProductItem key={id} product={products[id]} click={handleClick} />
        ))}
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  productIds: selectProductsIds(state),
  products: selectProductsObj(state),
  pagination: selectPaginationData(state)

});

const actions = {
  addItemsToCart,
  incrementItemsCount,
  setPage,
  setPageItems
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(ProductList);