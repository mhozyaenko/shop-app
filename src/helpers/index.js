import {DEFAULT_PAGE, DEFAULT_PERPAGE, MAXPRICE, MINPRICE} from "../constants/filterOptions";
import {parse} from "qs";

/**
 * normalize data from api
 * @param array
 * @returns {{dataObject, keys: string[]}}
 */
export const normalize = (array) => {
  const result = {};

  array.map(item => {
    return result[item.id] = item;
  });

  return {
    dataObject: result,
    keys: Object.keys(result)
  };
};

/**
 * create options array for checkbox group
 * @param options
 * @returns {Array}
 */
export const getCheckboxOptions = (options) => {
  const result = [];

  options.map(item => result.push({label: item.displayName, value: item.value}));

  return result;
};

/**
 * transform filter and pagination settings to query string
 * @param filters
 * @returns {string}
 */
export const filtersToString = (filters) => {
  const array = [
    filters.origin.length > 0 ? `origins=${filters.origin.join(',')}` : '',
    filters.minPrice === MINPRICE ? '' : `minPrice=${filters.minPrice}`,
    filters.maxPrice === MAXPRICE ? '' : `maxPrice=${filters.maxPrice}`,
    filters.page && filters.page !== DEFAULT_PAGE ? `page=${filters.page}` : '',
    filters.perPage && filters.perPage !== DEFAULT_PERPAGE ? `perPage=${filters.perPage}` : '',
    filters.editable ? 'editable=true' : ''
  ];

  return array.filter(Boolean).length === 0 ?
    '' :
    `${array.filter(Boolean).join('&')}`
};

/**
 * from query string to filters object
 * @param string
 * @returns {*}
 */
export const parseQueryString = string => {
  const parsedObj = parse(string.substr(1));

  if (parsedObj.origins) {
    parsedObj.origin = parsedObj.origins.split(',')
    delete parsedObj.origins;
  }

  return parsedObj
};

