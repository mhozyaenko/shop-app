import React from 'react';
import PropTypes from 'prop-types';
import {WithInputRender} from "../hocs/WithInputRender";
import {Select, Form} from "antd";

const {Option} = Select;

function FormSelect(props) {
  const {
    label,
    options,
    placeholder,
    onChange,
    meta,
    disabled,
    value} = props;

  return (
    <Form.Item
      label={label}
      help={meta.error}>
      <Select
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}>
        {options.map( (item, index) => (
            <Option
              key={index}
              value={item.value}>
              {item.displayName}
            </Option>
          ))}
      </Select>
    </Form.Item>
  )
}

FormSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  value: PropTypes.string
};

export default WithInputRender(FormSelect)