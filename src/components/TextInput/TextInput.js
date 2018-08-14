import React from 'react';
import Props from './props';

function TextInput(props) {
  const {
    divClassName,
    className,
    name,
    type,
    value,
    min,
    required,
    onChange,
  } = props;

  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <div className={divClassName}>
      <input
        className={className}
        placeholder={name}
        name={name}
        type={type}
        onChange={event => handleChange(event)}
        value={value}
        min={min}
        required={required}
      />
    </div>
  );
}

TextInput.propTypes = Props.propTypes;

export default TextInput;
