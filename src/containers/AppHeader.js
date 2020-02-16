import React, {Fragment, useState} from 'react';
import {PageHeader, Button, Icon, Badge, Tooltip, Modal, Menu} from 'antd';
import {Link} from "react-router-dom";
import {
  selectCartItemsCount,
  selectCartTotalSum,
  selectProductOrigins
} from "../store/selectors";
import {connect} from "react-redux";
import AddProductForm from "../components/ProductForm";
import {postNewProduct} from "../api/products";
import {getFormValues, isSubmitting, isValid, reset, submit} from "redux-form";
import {openNotificationWithIcon} from "../services/notifications";

function AppHeader({
                     title,
                     homePage,
                     selectCartItemsCount,
                     cartTotalSum,
                     origins,
                     productFormData,
                     reset,
                     startSubmit,
                     isSubmitting,
                     isValid,
                     submit,

}) {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const onModalCancel = () => {
    setModalOpened(false);
    reset('addProduct');
  };

  const onFormSubmit = (data) => {
    postNewProduct(data)
      .then(response => {
        if(response) {
          openNotificationWithIcon('success', 'Congrats!', 'Your product is succesfully added to our store');
          setModalOpened(false);
        } else {
          openNotificationWithIcon('error', 'OOPS!', 'Something went wrong... Please try again')
        }
      })
  };

  return (
    <Fragment>
      <PageHeader
        onBack={!homePage ? () => window.history.back() : null}
        style = {{boxShadow: '0 2px 7px #444', zIndex: 100}}
        title={title}
        extra={
          <Fragment>
            <Menu mode="horizontal">
              <Menu.Item>
                <Link to="/">All Products</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/my-products">My products</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/orders">My Orders</Link>
              </Menu.Item>
            </Menu>
            <Button type="primary"
                    onClick={openModal}
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
             onOk={() => submit('addProduct')}
             okButtonProps={{disabled: !isValid}}
             confirmLoading={isSubmitting}
             cancelButtonProps={{disabled: isSubmitting}}
             onCancel={onModalCancel}>
        <AddProductForm origins={origins}
                        disabled={isSubmitting}
                        name='addProduct'
                        onSubmit={productFormData => onFormSubmit(productFormData)}/>
      </Modal>
    </Fragment>
 )
}

const mapStateToProps = state => ({
  selectCartItemsCount: selectCartItemsCount(state),
  cartTotalSum: selectCartTotalSum(state),
  origins: selectProductOrigins(state),
  productFormData: getFormValues('addProduct')(state),
  isSubmitting: isSubmitting('addProduct')(state),
  isValid: isValid('addProduct')(state)

});

const actions = {
  reset,
  submit,
};

const enhance = connect(mapStateToProps, actions);

export default enhance(AppHeader);