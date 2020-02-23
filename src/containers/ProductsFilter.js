import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Slider} from 'antd';
import {MAXPRICE, MINPRICE} from "../constants/filterOptions";
import {getCheckboxOptions} from "../helpers";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {resetOrigins, setOrigins, setPage, setPrices} from "../store/filters/action";
import {selectOrigins, selectPrices} from "../store/filters/selectors";
import {selectProductOrigins} from "../store/products/selectors";

function ProductsFilter({ setOrigins,
                          resetOrigins,
                          origins,
                          setPrices,
                          prices,
                          setPage,
                          productOrigins
}) {

  const handleOriginsChange = (checkedValues) => {
    setOrigins({checkedValues});
  };

  const handlePriceChange = (value) => {
    setPrices({value});
  };

  return (
    <Fragment>
      <div style={{padding: 25}}>
        <h3>Filter By Origin</h3>
        <Checkbox.Group
          className="checkbox-group"
          onChange={handleOriginsChange}
          value={origins}
          options={getCheckboxOptions(productOrigins)}>
        </Checkbox.Group>
        <Button onClick={resetOrigins}>All origins</Button>
      </div>
      <div style={{padding: 25}}>
        <h3>Filter By Price</h3>
        <Slider
          marks={{0: `${MINPRICE} UAH`, 1000: `${MAXPRICE} UAH`}}
          range
          min={MINPRICE}
          max={MAXPRICE}
          step={10}
          defaultValue={[Number(prices[0]), Number(prices[1])]}
          value={[Number(prices[0]), Number(prices[1])]}
          onChange={handlePriceChange}
        />
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  origins: selectOrigins(state),
  prices: selectPrices(state),
  productOrigins: selectProductOrigins(state)
});

const actions = {
  setOrigins,
  resetOrigins,
  setPrices,
  setPage
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = connect(mapStateToProps, mapDispatchToProps);

ProductsFilter.propTypes = {
  setOrigins: PropTypes.func,
  resetOrigins: PropTypes.func,
  origins: PropTypes.array,
  setPrices: PropTypes.func,
  prices: PropTypes.array,
  setPage: PropTypes.func,
  productOrigins: PropTypes.array
};

export default enhance(ProductsFilter);