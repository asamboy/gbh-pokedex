import React, { Component } from 'react';

class PkmnTable extends Component {

  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
  }

  edit(pokemon) {
    this.props.edit(pokemon);
  }

  addPokemon(pokemon) {
    return <tr 
              onClick={() => this.edit(pokemon)}
              key={pokemon.name}
            >
              <td>{pokemon.name}</td>
              <td>{pokemon.type}</td>
              <td>{pokemon.nickname}</td>
              <td>{pokemon.location}</td>
              <td>{pokemon.photo}</td>
              <td>{pokemon.weight}</td>
              <td>{pokemon.age}</td>
              <td>{pokemon.captured ? '✓' : ''}</td>
            </tr>
  }

  render() {
    var pokemons = this.props.pokemons;
    var tableItems = pokemons.map(p => this.addPokemon(p));
    return (
      <div>
        <table>
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
      </div>
    );
  }
}

export default PkmnTable;