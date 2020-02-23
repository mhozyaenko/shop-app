import React from 'react';
import {Field, reduxForm, Form} from "redux-form";
import PropTypes from 'prop-types';
import {compose} from "redux";
import {connect} from "react-redux";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import {NameValidator, PriceValidator, ProductFormValidator} from "./validators";
import {useRunSaga} from "../../containers/AppWrapper";
import submitFormSaga from "../../store/sagas/submitFormSaga";

function ProductForm({origins, disabled, name}) {
  const handleSubmit = useRunSaga(submitFormSaga);

  return(
    <Form onSubmit={() => handleSubmit(name)}>
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

ProductForm.propTypes = {
  origins: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired
};

export default compose(
  connect(mapStateToProps),
  reduxForm({
  validate: ProductFormValidator,
}))(ProductForm);