import React from 'react';
import Props from './props';

function Button(props) {
  const {
    btnClass,
    action,
  } = props;

  return (
    <button
      type="submit"
      className={btnClass}
    >
      {action === 'add' ? 'Add Pokémon' : 'Update'}
    </button>
  );
}

Button.propTypes = Props.propTypes;

export default Button;
