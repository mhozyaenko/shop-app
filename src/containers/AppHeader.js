import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {PageHeader, Button, Icon, Badge, Tooltip, Modal, Menu} from 'antd';
import {Link} from "react-router-dom";
import {
  selectCartItemsCount,
  selectCartTotalSum
} from "../store/cart/selectors";
import {connect, useSelector} from "react-redux";
import ProductForm from "../components/ProductForm";
import {getFormValues, isSubmitting, isValid, reset, submit} from "redux-form";
import {toggleModal} from "../store/app/actions";
import {selectModalStatus} from "../store/app/selectors";
import {selectProductOrigins} from "../store/products/selectors";

const FORM_NAME = 'addProduct';

function AppHeader({ title,
                     selectCartItemsCount,
                     cartTotalSum,
                     origins,
                     productFormData,
                     reset,
                     isSubmitting,
                     isValid,
                     submit,
                     toggleModal
}) {
  const modalOpened = useSelector(selectModalStatus(FORM_NAME));

  const onModalCancel = () => {
    toggleModal({name: FORM_NAME, status: false});
    reset(FORM_NAME);
  };

  return (
    <Fragment>
      <PageHeader
        style = {{boxShadow: '0 2px 7px #444', zIndex: 100}}
        title={title}
        extra={
          <Fragment>
            <Menu mode="horizontal">
              <Menu.Item>
                <Link to="/products">All Products</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/my-products">My products</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/orders">My Orders</Link>
              </Menu.Item>
            </Menu>
            <Button type="primary"
                    onClick={() => toggleModal({name: FORM_NAME, status: true})}
                    className="header-button">Add My Product</Button>
            <Link to="/cart">
              <Tooltip placement="left"
                       title={`Total Sum: ${cartTotalSum} UAH`}>
                <Button type="primary"
                        className="header-button">
                  <Badge count={selectCartItemsCount}
                         showZero
                         overflowCount={10}
                         style={{background: '#f5222d', color: 'fff'}} >
                    <Icon style={{fontSize: '24px'}}
                          type="shopping-cart" />
                  </Badge>
                </Button>
              </Tooltip>
            </Link>
          </Fragment>
        }
      />
      <Modal visible={modalOpened}
             title="Add new product"
             onOk={() => submit(FORM_NAME)}
             okButtonProps={{disabled: !isValid}}
             confirmLoading={isSubmitting}
             cancelButtonProps={{disabled: isSubmitting}}
             onCancel={onModalCancel}>
        <ProductForm origins={origins}
                        disabled={isSubmitting}
                        name={FORM_NAME}/>
      </Modal>
    </Fragment>
 )
}

const mapStateToProps = state => ({
  selectCartItemsCount: selectCartItemsCount(state),
  cartTotalSum: selectCartTotalSum(state),
  origins: selectProductOrigins(state),
  productFormData: getFormValues(FORM_NAME)(state),
  isSubmitting: isSubmitting(FORM_NAME)(state),
  isValid: isValid(FORM_NAME)(state)

});

const actions = {
  reset,
  submit,
  toggleModal
};

const enhance = connect(mapStateToProps, actions);

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  selectCartItemsCount: PropTypes.number,
  cartTotalSum: PropTypes.number,
  origins: PropTypes.array,
  reset: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  submit: PropTypes.func,
  toggleModal: PropTypes.func
};

export default enhance(AppHeader);