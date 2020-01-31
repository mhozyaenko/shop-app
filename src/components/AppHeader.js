import React, {useContext} from 'react';
import {PageHeader, Button, Icon, Badge, Tooltip} from 'antd';
import {Link} from "react-router-dom";
import {CartContext} from "../providers/CartProvider";

/**
 * header component
 * @param title - header title string
 * @param homePage - true: home page title
 * @returns {*}
 * @constructor
 */
export default function AppHeader({title, homePage}) {
  const {memoTotalItems, memoTotalSum} = useContext(CartContext);

  return (
   <PageHeader
     onBack={!homePage ? () => window.history.back() : null}
     style = {{boxShadow: '0 2px 7px #444'}}
     title={title}
     extra={
       <Link to="/cart">
         <Tooltip placement="left"
                  title={`Total Sum: ${memoTotalSum} UAH`}>
           <Button type="primary"
                   style={{padding: '13px 20px 13px 15px', height: 45}}>
             <Badge count={memoTotalItems}
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