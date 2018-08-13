import React, { PureComponent } from 'react';

class TextInput extends PureComponent {

  handleChange = (event) => {
    this.props.handlechange(event);
  }

  render() {
    return ( 
      <div className={this.props.divClass}>
        <input
          className={this.props.inputClass} 
          placeholder={this.props.placeHolder}
          name={this.props.inputName}
          type={this.props.inputType}
          onChange={(event) => this.handleChange(event)}
          value={this.props.value}
          min={this.props.min}
          required={this.props.required} 
        />
      </div>
    );
  }
}

export default TextInput;
