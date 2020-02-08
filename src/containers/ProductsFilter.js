import React, {Fragment} from 'react';
import {Button, Checkbox, Slider} from 'antd';
import {MAXPRICE, MINPRICE, ORIGINS} from "../constants/filterOptions";
import {getCheckboxOptions} from "../helpers";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {resetOrigins, setOrigins, setPage, setPrices} from "../store/filters/action";
import {selectOrigins, selectPrices} from "../store/selectors";

function ProductsFilter({
                          setOrigins,
                          resetOrigins,
                          origins,
                          setPrices,
                          prices,
                          setPage
}) {
  /**
   * handle changes of origins filter
   * @param checkedValues
   */
  const handleOriginsChange = (checkedValues) => {
    setOrigins({checkedValues});
    setPage({page: 1});
  };
  /**
   * handle change of prices range
   * @param value
   */
  const handlePriceChange = (value) => {
    setPrices({value});
    setPage({page: 1});
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
  setPage
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(ProductsFilter);