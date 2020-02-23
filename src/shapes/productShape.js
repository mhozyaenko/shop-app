import PropTypes from 'prop-types';

export const productShape = PropTypes.shape({
  isEditable: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  origin: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
});