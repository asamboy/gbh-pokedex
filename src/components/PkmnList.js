import React, { Component } from 'react';

class PkmnList extends Component {

  addPokemon(pokemon) {
    return <li 
              key={pokemon.name}
            >
              {pokemon.name} – {pokemon.type} {pokemon.caught ? '(caught)' :''}
            </li>
  }

  render() {
    var pokemons = this.props.pokemons;
    var listItems = pokemons.map(this.addPokemon)
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
}

export default PkmnList;