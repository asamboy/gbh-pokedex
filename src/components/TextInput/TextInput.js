import React, { PureComponent } from 'react';
import Props from './props';

class TextInput extends PureComponent {
  handleChange = (event) => {
    const { onChange } = this.props;
    onChange(event);
  }

  render() {
    const {
      divClassName,
      className,
      name,
      type,
      value,
      min,
      required,
    } = this.props;
    return (
      <div className={divClassName}>
        <input
          className={className}
          placeholder={name}
          name={name}
          type={type}
          onChange={event => this.handleChange(event)}
          value={value}
          min={min}
          required={required}
        />
      </div>
    );
  }
}

TextInput.propTypes = Props.propTypes;

export default TextInput;
