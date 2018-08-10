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
      nickname: '',
      type: '',
      location: '',
      photo:'',
      weight:'',
      age:'',
      description:'',
      captured: false,
      pokemons: [],
    };
  }

  resetState() {
    return {
      name: '',
      nickname: '',
      type: '',
      location: '',
      photo:'',
      weight:'',
      age:'',
      description:'',
      captured: false,
    };
  }

  handleSubmit = (event) => {
    let pokemon = {};
    let values = Array.from(event.target);

    values.forEach(function(v){
      if (v.name !== '') {
        pokemon[v.name] = v.value;
      }
    });

    this.setState(this.resetState());

    this.setState({
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
      captured: pokemon.captured,
      pokemons: newList,
    });
  }

  render() {
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
                  value={this.state.name} 
                />
              </div>
              <div>
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
              </div>
              <div>
                <input 
                  required
                  placeholder="Nickname"
                  name="nickname"
                  onChange={this.handleChange}
                  value={this.state.nickname} 
                />
              </div>
              <div>
                <input 
                  required
                  placeholder="Location"
                  name="location"
                  onChange={this.handleChange}
                  value={this.state.location} 
                />
              </div>
              <div>
                <input 
                  required
                  placeholder="Photo"
                  name="photo"
                  onChange={this.handleChange}
                  value={this.state.photo} 
                />
              </div>
              <div>
                <input 
                  required
                  placeholder="Weight"
                  name="weight"
                  onChange={this.handleChange}
                  value={this.state.weight} 
                />
              </div>
              <div>
                <input 
                  required
                  placeholder="Age"
                  name="age"
                  onChange={this.handleChange}
                  value={this.state.age} 
                />
              </div>
              <div>
                <label>
                  captured
                  <input
                    name="captured"
                    type="checkbox"
                    checked={this.state.captured}
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