import React from 'react';
import {PageHeader, Button, Icon, Badge, Tooltip} from 'antd';
import {Link} from "react-router-dom";
import {selectCartItemsCount} from "../store/selectors";
import {connect} from "react-redux";
import useCartTotal from "../hooks/useCartTotal";

/**
 * header component
 * @param title - header title string
 * @param homePage - true: home page title
 * @returns {*}
 * @constructor
 */
function AppHeader({title, homePage, selectCartItemsCount}) {
  const cartTotalSum = useCartTotal();

  return (
   <PageHeader
     onBack={!homePage ? () => window.history.back() : null}
     style = {{boxShadow: '0 2px 7px #444', zIndex: 100}}
     title={title}
     extra={
       <Link to="/cart">
         <Tooltip placement="left"
                  title={`Total Sum: ${cartTotalSum} UAH`}>
           <Button type="primary"
                   style={{padding: '13px 20px 13px 15px', height: 45}}>
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
     }
   />
 )
}

const mapStateToProps = state => ({
  selectCartItemsCount: selectCartItemsCount(state),
});

const enhance = connect(mapStateToProps);

export default enhance(AppHeader);