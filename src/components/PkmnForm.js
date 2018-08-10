import React, { Component } from "react";
import PkmnList from "./PkmnList";

class PkmnForm extends Component {

  static types = [
    'Bug',
    'Dragon',
    'Ice',
    'Fighting',
    'Fire',
    'Flying',
    'Grass',
    'Ghost',
    'Ground',
    'Electric',
    'Normal',
    'Poison',
    'Psychic',
    'Rock',
    'Water'
    ]

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      type: '',
      caught: false,
      pokemons: [],
    };
  }

  handleSubmit = (event) => {
    var pokemon = {
      name: this.state.name,
      type: this.state.type,
      caught: this.state.caught
    };

    this.setState({
      name: '',
      type: '',
      caught: false,
      pokemons: this.state.pokemons.concat(pokemon)
    });
    event.preventDefault()

  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleTypeChange = (event) => {
    this.setState({
      type: event.target.value,
    })
  }

  editPokemon = (pokemon) => {
    let index = this.state.pokemons.findIndex(p => p.name === pokemon.name);
    let pokemons = this.state.pokemons
    let newList = pokemons.slice(0, index).concat(pokemons.slice(index+1));
    this.setState({
      name: pokemon.name,
      type: pokemon.type,
      caught: pokemon.caught,
      pokemons: newList,
    });
  }

  render() {
    return (
        <div>
          <div>
            <h1>Register a Pokémon</h1>
    
            <form onSubmit={this.handleSubmit}>
              
              <input 
                required
                placeholder=" Name"
                name="name"
                onChange={this.handleChange}
                value={this.state.name} 
              />
              <br />
              <select 
                name="type"
                required
                value={this.state.type}
                onChange={this.handleChange}
              >
                <option value='' disabled>Type</option>
                {PkmnForm.types.map(
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
              <br />
              <label>
                Caught
                <input
                  name="caught"
                  type="checkbox"
                  checked={this.state.caught}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <button type="submit">Add Pokemon</button> 
            </form>
          </div>
          
          <div>
            <PkmnList
              pokemons={this.state.pokemons}
              edit={this.editPokemon}
            />
          </div>
        </div>
    );
  }
}

export default PkmnForm;