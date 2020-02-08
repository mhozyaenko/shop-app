import {
  RESET_ORIGINS,
  RESET_PRICES,
  SET_ORIGINS,
  SET_PAGE,
  SET_PAGE_ITEMS,
  SET_PAGINATION,
  SET_PRICES
} from "./actionTypes";

/**
 * set chosen origins
 * @param data
 * @returns {{type: string}}
 */
export const setOrigins = data => ({
  type: SET_ORIGINS,
  ...data
});

/**
 * reset origins filter
 * @returns {{type: string}}
 */
export const resetOrigins = () => ({
  type: RESET_ORIGINS,
});

/**
 * set prices filter
 * @param data
 * @returns {{type: string}}
 */
export const setPrices = data => ({
  type: SET_PRICES,
  ...data
});

/**
 * reset prices filter
 * @returns {{type: string}}
 */
export const resetPrices = () => ({
  type: RESET_PRICES,
});

/**
 * set pagination settings
 * @param data
 * @returns {{type: string}}
 */
export const setPagination = data => ({
  type: SET_PAGINATION,
  ...data
});

/**
 * set current page
 * @param data
 * @returns {{type: string}}
 */
export const setPage = data => ({
  type: SET_PAGE,
  ...data
});

/**
 * set items per page
 * @param data
 * @returns {{type: string}}
 */
export const setPageItems = data => ({
  type: SET_PAGE_ITEMS,
  ...data
});