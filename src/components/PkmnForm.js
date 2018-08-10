import React, { Component } from "react";
import PkmnTable from "./PkmnTable";

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
      pokemon: {
        name: '',
        nickname: '',
        type: '',
        location: '',
        photo:'',
        weight:'',
        age:'',
        description:'',
        captured: false,
      },
      pokemons: [],
    };
  }

  resetPokemon() {
    return {
      pokemon: {
        name: '',
        nickname: '',
        type: '',
        location: '',
        photo:'',
        weight:'',
        age:'',
        description:'',
        captured: false,
      }
    };
  }

  handleSubmit = (event) => {
    const pokemon = this.state.pokemon;

    this.setState({
      pokemons: this.state.pokemons.concat(pokemon)
    });

    this.setState(this.resetPokemon());
    event.preventDefault();
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let pokemon = {};
    pokemon[name] = value;

    this.setState(prevState => ({
      pokemon: {
        ...prevState.pokemon,
        [name]: value
      }
    }));
  }

  editPokemon = (pokemon) => {
    let index = this.state.pokemons.findIndex(p => p.name === pokemon.name);
    let pokemons = this.state.pokemons
    let newList = pokemons.slice(0, index).concat(pokemons.slice(index+1));
    
    this.setState({
      pokemon,
      pokemons: newList,
    });
  }

  render() {
    const {pokemon} = this.state;
    return (
        <div>
          <div>
            <h1>Register a Pokémon</h1>
            <form onSubmit={this.handleSubmit}> 
              <div>
                <input 
                  required
                  placeholder="Name"
                  name="name"
                  onChange={this.handleChange}
                  value={pokemon.name} 
                />
              </div>
              <div>
                <select 
                  name="type"
                  required
                  onChange={this.handleChange}
                  value={pokemon.type}
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
              </div>
              <div>
                <input 
                  required
                  placeholder="Nickname"
                  name="nickname"
                  onChange={this.handleChange}
                  value={pokemon.nickname} 
                />
              </div>
              <div>
                <input 
                  required
                  placeholder="Location"
                  name="location"
                  onChange={this.handleChange}
                  value={pokemon.location} 
                />
              </div>
              <div>
                <input 
                  required
                  placeholder="Photo"
                  name="photo"
                  onChange={this.handleChange}
                  value={pokemon.photo} 
                />
              </div>
              <div>
                <input 
                  type="number"
                  required
                  placeholder="Weight"
                  name="weight"
                  onChange={this.handleChange}
                  value={pokemon.weight} 
                />
              </div>
              <div>
                <input 
                  type="number"
                  required
                  placeholder="Age"
                  name="age"
                  onChange={this.handleChange}
                  value={pokemon.age} 
                />
              </div>
              <div>
                <label>
                  captured
                  <input
                    name="captured"
                    type="checkbox"
                    checked={pokemon.captured}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <div>
                <button type="submit">Add Pokemon</button> 
              </div>
            </form>
          </div>
          
          <div>
            <PkmnTable
              pokemons={this.state.pokemons}
              edit={this.editPokemon}
            />
          </div>
        </div>
    );
  }
}

export default PkmnForm;