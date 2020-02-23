import React from 'react';
import {Typography} from "antd";
import {Link} from "react-router-dom";

const {Title, Text} = Typography;

/**
 * Page not found page
 * @returns {*}
 * @constructor
 */
export default function Page404() {
  return (
    <Typography style={{padding: 20}}>
      <Title>OOPS... This page does not exist</Title>
      <Text>
        <Link to="/products">
          Go to HomePage
        </Link>
      </Text>
    </Typography>
  )
}