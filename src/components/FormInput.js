import React from 'react';
import PropTypes from 'prop-types';
import {WithInputRender} from "../hocs/WithInputRender";
import {Input, Form} from "antd";

function FormInput(props) {
  const {label, placeholder, onFocus, onBlur, onChange, type, meta, disabled} = props;

  const getValidateStatus = () => {
    if (meta.visited && meta.invalid) return "error";
    if (meta.visited && meta.valid) return "success";
    return ""
  };

  return(<Form.Item
    label={label}
    help={meta.error}
    validateStatus={getValidateStatus()}
  >
    <Input onBlur={onBlur}
           disabled={disabled}
           value={props.value}
           onChange={onChange}
           placeholders={placeholder}
           type={type}
           onFocus={onFocus} />
  </Form.Item>
  )
}

FormInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string,
  meta: PropTypes.object,
  disabled: PropTypes.bool
};

export default WithInputRender(FormInput)