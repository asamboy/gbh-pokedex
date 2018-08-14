import React from 'react';
import Props from './props';

function Checkbox(props) {
  const handleChange = (event) => {
    props.onChange(event);
  };

  const {
    divClassName,
    className,
    name,
    value,
  } = props;

  return (
    <div className={divClassName}>
      <input
        id={name}
        className={className}
        name={name}
        type="checkbox"
        checked={value}
        onChange={event => handleChange(event)}
      />

      <label  id={name} htmlFor={name}>
        {name}
      </label>
    </div>
  );
}

Checkbox.propTypes = Props.propTypes;

export default Checkbox;
