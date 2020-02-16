import React from 'react';
import {Field, reduxForm, Form} from "redux-form";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import {NameValidator, PriceValidator, ProductFormValidator} from "./validators";
import {compose} from "redux";
import {connect} from "react-redux";

/**
 * Product form - create, update product
 * @param origins
 * @param disabled
 * @returns {*}
 * @constructor
 */
function ProductForm({origins, disabled, name, handleSubmit}) {
  return(
    <Form onSubmit={handleSubmit}>
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
          options = {origins}>
        </Field>
    </Form>
  )
}

const mapStateToProps = (state, props) => ({
  form: props.name,
});

export default compose(
  connect(mapStateToProps),
  reduxForm({
  validate: ProductFormValidator,
}))(ProductForm);