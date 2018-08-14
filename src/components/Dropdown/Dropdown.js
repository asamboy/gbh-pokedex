import React from 'react';
import Props from './props';

function Dropdown(props) {
  const {
    divClassName,
    className,
    name,
    value,
    required,
    types,
    onChange,
    placeholder,
  } = props;

  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <div className={divClassName}>
      <select
        className={className}
        name={name}
        onChange={event => handleChange(event)}
        value={value}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {types.map(
          optionValue => (
            <option
              key={optionValue}
              value={optionValue}
            >
              {optionValue}
            </option>
          ),
        )}
      </select>
    </div>
  );
}

Dropdown.propTypes = Props.propTypes;
Dropdown.defaultProps = Props.defaultProps;

export default Dropdown;
