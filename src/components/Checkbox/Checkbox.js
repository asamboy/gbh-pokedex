import React from 'react';

function Checkbox(props) {
  const handleChange = (event) => {
    props.handlechange(event);
  };

  return (
    <div className={props.divClass}>	
      <input
        id={props.inputName}
        className={props.inputClass}	
        name={props.inputName}	
        type="checkbox"
        checked={props.value}	
        onChange={event => handleChange(event)}
      />
      <label htmlFor={props.inputName}>
        {props.inputName}
      </label>
    </div>
  );
}

export default Checkbox;
