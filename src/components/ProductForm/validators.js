import {
  composeValidators,
  hasLengthGreaterThan,
  hasLengthLessThan,
  isRequired,
  combineValidators,
  createValidator
} from "revalidate";

const isPositive = createValidator(
  message => value => {
    if (Number(value) <= 0) {
      return message;
    }
  },
  field => `${field} must be positive number`
);

export const NameValidator = composeValidators(
  isRequired('Name'),
  hasLengthGreaterThan(3)({
    message: 'Must be 3 characters or more'
  }),
  hasLengthLessThan(20)({
    message: 'Must be 20 characters or less'
  })
)();

export const PriceValidator = composeValidators(
  isRequired('Price'),
  isPositive('Price')
)();

export const ProductFormValidator = combineValidators({
  name: NameValidator,
  price: PriceValidator,
  origin: isRequired('Origin'),
});

