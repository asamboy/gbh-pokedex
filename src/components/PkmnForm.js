import React, { Component } from "react";
import PkmnTable from "./PkmnTable";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

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
      buttonAction: 'Add Pokémon',
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
    confirmAlert({
      title: 'Edit or remove  ' + pokemon.name + '?',
      buttons: [
        {
          label: 'Edit',
          onClick: () => this.edit(pokemon)
        },
        {
          label: 'Delete',
          onClick: () => this.delete(pokemon)
        }
      ]
    })
  };

  edit = (pokemon) => {
    let newList = this.getNewList(pokemon);

    this.setState({
      pokemon,
      pokemons: newList,
      buttonAction: 'Save changes',
    });
  }

  delete = (pokemon) => {
    let newList = this.getNewList(pokemon);
    
    this.setState({
      pokemons: newList,
      buttonAction: 'Add Pokémon',
    });
  }

  getNewList = (pokemon) => {
    let index = this.state.pokemons.findIndex(p => p.name === pokemon.name);
    let pokemons = this.state.pokemons
    let newList = pokemons.slice(0, index).concat(pokemons.slice(index+1));
    return newList;
  }

  render() {
    const {pokemon} = this.state;
    return (
      <div className="container">
        <div className="row form-wrapper">
          <div className="col-lg-4">
            <h1 className="text-center">Register a Pokémon</h1>
            <hr />
            <form onSubmit={this.handleSubmit}> 
              <div className="form-group">
                <input
                  className="form-control" 
                  required
                  placeholder="Name"
                  name="name"
                  type="text"
                  onChange={this.handleChange}
                  value={pokemon.name} 
                />
              </div>
              <div className="form-group">
                <select className="form-control"
                  name="type"
                  required
                  type="text"
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
              <div className="form-group">
                <input
                  className="form-control" 
                  required
                  placeholder="Nickname"
                  name="nickname"
                  type="text"
                  onChange={this.handleChange}
                  value={pokemon.nickname} 
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control" 
                  required
                  placeholder="Location"
                  name="location"
                  type="text"
                  onChange={this.handleChange}
                  value={pokemon.location} 
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control" 
                  required
                  placeholder="Photo"
                  name="photo"
                  type="text"
                  onChange={this.handleChange}
                  value={pokemon.photo} 
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control" 
                  type="number"
                  min="0"
                  required
                  placeholder="Weight"
                  name="weight"
                  onChange={this.handleChange}
                  value={pokemon.weight} 
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control" 
                  type="number"
                  min="0"
                  required
                  placeholder="Age"
                  name="age"
                  onChange={this.handleChange}
                  value={pokemon.age} 
                />
              </div>
              <div className="form-group text-center">
                <input
                  id="captured"
                  className="form-check-label"
                  name="captured"
                  type="checkbox"
                  checked={pokemon.captured}
                  onChange={this.handleChange}
                /> 
                <label htmlFor="captured"> Captured
                </label>
              </div>
              <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-primary">{this.state.buttonAction}</button> 
              </div>
            </form>
            <hr className="d-lg-none d-xl-block" />
          </div>
          <div className="col-lg-8">
            <PkmnTable
              pokemons={this.state.pokemons}
              edit={this.editPokemon}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PkmnForm;