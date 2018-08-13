import React, { PureComponent } from 'react';

class PkmnTable extends PureComponent {

  select = (pokemon) => {
    this.props.select(pokemon);
  }

  // TODO load fields dinamically
  addPokemon(pokemon) {
    return <tr 
              onClick={() => this.select(pokemon)}
              key={pokemon.name}
            >
              <td>{pokemon.name}</td>
              <td>{pokemon.type}</td>
              <td>{pokemon.nickname}</td>
              <td>{pokemon.location}</td>
              <td>{pokemon.photo}</td>
              <td>{pokemon.weight}</td>
              <td>{pokemon.age}</td>
              <td className="text-center">{pokemon.captured ? '✓' : ''}</td>
            </tr>
  }

  render() {
    let pokemons = this.props.pokemons;
    let tableItems = pokemons.map(p => this.addPokemon(p));
    return (
      <table className="table table-striped table-responsive table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Nickname</th>
            <th>Location</th>
            <th>Photo</th>
            <th>Weight</th>
            <th>Age</th>
            <th>Captured</th>
          </tr>
        </thead>
        <tbody>
          {tableItems}
        </tbody>
      </table>
    );
  }
}

export default PkmnTable;