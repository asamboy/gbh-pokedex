import React, { PureComponent } from 'react';

class Checkbox extends PureComponent {
  handleChange = (event) => {
    this.props.handlechange(event);
  }

  render() {
    return (
      <div className={this.props.divClass}>	
        <input
          id={this.props.inputName}
          className={this.props.inputClass}	
          name={this.props.inputName}	
          type="checkbox"
          checked={this.props.value}	
          onChange={event => this.handleChange(event)}
        />
        <label htmlFor={this.props.inputName}>
          {this.props.inputName}
        </label>
      </div>
    );
  }
}

export default Checkbox;
