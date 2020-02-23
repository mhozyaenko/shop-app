import PropTypes from 'prop-types';
import {productShape} from "./productShape";

export const orderShape = PropTypes.shape({
  id: PropTypes.string,
  createdAt: PropTypes.string,
  pieces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    count: PropTypes.number,
    product: productShape,
  }))
});