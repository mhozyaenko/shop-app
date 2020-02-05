import React, {Fragment} from 'react';
import {Button, Checkbox, Slider} from 'antd';
import {MAXPRICE, MINPRICE, ORIGINS} from "../constants/filterOptions";
import {getCheckboxOptions} from "../helpers";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {resetOrigins, resetPrices, setOrigins, setPrices} from "../store/filters/action";
import {selectOrigins, selectPrices} from "../store/selectors";

function ProductsFilter({
                          setOrigins,
                          resetOrigins,
                          origins,
                          setPrices,
                          resetPrices,
                          prices
}) {
  /**
   * handle changes of origins filter
   * @param checkedValues
   */
  const handleOriginsChange = (checkedValues) => {
    setOrigins({checkedValues});
  };
  /**
   * handle change of prices range
   * @param value
   */
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
          options={getCheckboxOptions(ORIGINS)}>
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
          defaultValue={prices}
          onAfterChange={handlePriceChange}
        />
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  origins: selectOrigins(state),
  prices: selectPrices(state)
});

const actions = {
  setOrigins,
  resetOrigins,
  setPrices,
  resetPrices
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(ProductsFilter);