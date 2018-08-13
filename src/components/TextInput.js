import React, { PureComponent } from 'react';

class TextInput extends PureComponent {

  handleChange = (event) => {
    this.props.handlechange(event);
  }

  render() {
    return ( 
      <div className={this.props.divClassName}>
        <input
          className={this.props.inputClassName} 
          // required
          placeholder={this.props.placeHolder}
          name={this.props.inputName}
          type={this.props.inputType}
          onChange={(event) => this.handleChange(event)}
          value={this.props.value} 
        />
      </div>
    );
  }
}

export default TextInput;