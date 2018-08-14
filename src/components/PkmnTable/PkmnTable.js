import React, { PureComponent } from 'react';
import Props from './props';

class PkmnTable extends PureComponent {
  static headers = [
    'Name',
    'Type',
    'Nickname',
    'Location',
    'Photo',
    'Weight',
    'Age',
    'Captured',
  ]

  getHeaders = (header) => {
    const element = (
      <th key={header}>
        {header}
      </th>
    );
    return element;
  }

  getCells = (value) => {
    if (typeof value === 'boolean') {
      return (
        <td key={value} className="text-center">
          {value ? '✓' : ''}
        </td>
      );
    }

    return (
      <td key={value}>
        {value}
      </td>
    );
  }

  select = (pokemon) => {
    const { select } = this.props;
    select(pokemon);
  }

  addPokemon(pokemon) {
    const cells = Object.values(pokemon).map(v => this.getCells(v));

    return (
      <tr
        onClick={() => this.select(pokemon)}
        key={pokemon.name}
      >
        { cells }
      </tr>
    );
  }

  render() {
    const { pokemons } = this.props;
    const tableItems = pokemons.map(p => this.addPokemon(p));
    const headerItems = PkmnTable.headers.map(h => this.getHeaders(h));

    return (
      <table className="table table-striped table-responsive table-hover">
        <thead>
          <tr>
            {headerItems}
          </tr>
        </thead>
        <tbody>
          {tableItems}
        </tbody>
      </table>
    );
  }
}

PkmnTable.propTypes = Props.propTypes;

export default PkmnTable;
