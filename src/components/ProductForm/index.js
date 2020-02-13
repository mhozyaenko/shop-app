import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Form} from "antd";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import {NameValidator, PriceValidator, ProductFormValidator} from "./validators";
import {isRequired} from "revalidate";

/**
 * Product form - create, update product
 * @param origins
 * @param disabled
 * @returns {*}
 * @constructor
 */
function ProductForm({origins, disabled}) {
  return(
    <Form>
      <Field
        name="name"
        disabled={disabled}
        component={FormInput}
        validate={NameValidator}
        type="text"
        placeholder="Name of Product"
        label="Name">
      </Field>
      <Field
        name="price"
        disabled={disabled}
        component={FormInput}
        normalize={value => Number(value)}
        validate={PriceValidator}
        type="number"
        placeholder="0"
        label="Price">
      </Field>
      <Field
        name="origin"
        disabled={disabled}
        component={FormSelect}
        label="Origin"
        placeholder="Select origin"
        validate={isRequired('Origin')}
        options = {origins}>
      </Field>
    </Form>
  )
}

export default reduxForm({
  form: 'product',
  validate: ProductFormValidator,
  asyncValidating: true
})(ProductForm);