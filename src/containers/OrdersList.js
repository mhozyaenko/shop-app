import React from 'react';
import PropTypes from 'prop-types';
import {Card, Spin} from "antd";
import moment from "moment";
import {Link} from "react-router-dom";
import {useInjectSaga} from "./AppWrapper";
import fetchOrdersListSaga from "../store/sagas/fetchOrdersListSaga";
import {selectOrdersIds, selectOrdersItems} from "../store/orders/selectors";
import connect from "react-redux/es/connect/connect";
import {selectAppLoading} from "../store/app/selectors";

const {Meta} = Card;

function OrdersList({ordersItems, orderIds, isLoading}) {
  useInjectSaga('fetchOrdersList', fetchOrdersListSaga);

  return (
    <Spin spinning={isLoading} size="large">
      <div>
        {orderIds.map(item => (
          <Card
            key={ordersItems[item].id}
            style={{marginBottom: 25}}
            bordered
            extra={<Link to={`/orders/${ordersItems[item].id}`}>See details</Link>}
            title={moment(ordersItems[item].createdAt).format('DD.MM.YYYY, HH:MM')}>
            {ordersItems[item].pieces.map((item) => (
              <Meta key={item.product.id}
                    title={`${item.product.name} - ${item.count}`}
                    style={{marginBottom: 20}}
                    description={`${item.product.price}UAH, origin: ${item.product.origin}`}/>
            ))}
          </Card>))}
      </div>
    </Spin>
  )
}

const mapStateToProps = state => ({
  ordersItems: selectOrdersItems(state),
  orderIds: selectOrdersIds(state),
  isLoading: selectAppLoading(state)
});

const enhance = connect(mapStateToProps);

OrdersList.propTypes = {
  ordersItems: PropTypes.object,
  orderIds: PropTypes.array,
  isLoading: PropTypes.bool
};

export default enhance(OrdersList);