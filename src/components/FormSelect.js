import React from 'react';
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

export default WithInputRender(FormSelect)