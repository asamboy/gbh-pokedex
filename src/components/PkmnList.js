import React, { Component } from 'react';

class PkmnList extends Component {

  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
  }

  edit(pokemon) {
    this.props.edit(pokemon);
  }

  addPokemon(pokemon) {
    return <li 
              onClick={() => this.edit(pokemon)}
              key={pokemon.name}
            >
              {pokemon.name} – {pokemon.type} {pokemon.caught ? '(caught)' : ''}
            </li>
  }

  render() {
    var pokemons = this.props.pokemons;
    var listItems = pokemons.map(p => this.addPokemon(p));
    // var listItems = pokemons.map(p => <ListItem key={p.name} pokemon={p} />);
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
}

export default PkmnList;