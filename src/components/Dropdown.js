import React, { PureComponent } from 'react';

class Dropdown extends PureComponent {
  handleChange = (event) => {
    this.props.handlechange(event);
  }

  render() {
    let types = this.props.types;
    return (
      <div className={this.props.divClass}>
        <select className={this.props.inputClass}
          name={this.props.inputName}
          onChange={(event) => this.handleChange(event)}
          value={this.props.value}
          required={this.props.required}
        >
          <option value="" disabled>Type</option>
          {types.map(
            optionValue => (
              <option
                key={optionValue}
                value={optionValue}
              >
                {optionValue}
              </option>
            )
          )}
        </select>
      </div>
    );
  }
}

export default Dropdown;
