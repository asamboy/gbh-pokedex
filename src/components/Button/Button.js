import React from 'react';

function Button(props) {
  return (
    <button
      type={props.type}
      className={props.btnClass}>
        {props.action === 'add' ? "Add Pokémon" : "Update"}
    </button>
  );
}

export default Button;
