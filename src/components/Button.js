import React, { PureComponent } from 'react';

class Button extends PureComponent {
  render() {
    return (
      <button
        type={this.props.type}
        className={this.props.btnClass}>
          {this.props.action === 'add' ? "Add Pokémon" : "Update"}
      </button>
    );
  }
}

export default Button;