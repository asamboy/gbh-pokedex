import React, { PureComponent } from "react";
import PkmnTable from "./PkmnTable";
import TextInput from "./TextInput";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Dropdown from "./Dropdown";

class PkmnForm extends PureComponent {

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
        type: '',
        nickname: '',
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
      name: '',
      type: '',
      nickname: '',
      location: '',
      photo:'',
      weight:'',
      age:'',
      description:'',
      captured: false,
    };
  }

  handleSubmit = (event) => {
    const pokemon = Object.assign({},this.state.pokemon);
    const emptyPokemon = this.resetPokemon();

    this.setState({
      pokemon: emptyPokemon,
      pokemons: this.state.pokemons.concat(pokemon)
    });
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

  selectPokemon = (pokemon) => {
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

  // TODO don't remove from table/array while editing
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

  getTextInput = (key) => {
    const numeric = ['weight','age'];
    let type = "text";
    let required = true;
    let min;

    if (numeric.indexOf(({key}.key)) !== -1) {
      type = "number";
      min = "0";
    }
    
    return <TextInput 
            divClass="form-group"
            inputClass="form-control" 
            placeHolder={key}
            inputName={key}
            inputType={type}
            handlechange={this.handleChange}
            value={this.state.pokemon[key]}
            min={min}
            required={required}
            key={key}
          />
  }

  getTypeDropdown = (key) => {
    let required = true;
    return <Dropdown 
    
              divClass="form-group"
              inputClass="form-control"
              inputName={key}
              handlechange={this.handleChange}
              value={this.state.pokemon[key]}
              types={PkmnForm.types}
              required={required}
              key={key}
            />;
  }

  getInputFields = (key) => {
    const notText = ['type','description','captured'];
    const keyName = {key}.key;

    if (notText.indexOf(keyName) === -1) {
      return this.getTextInput(key);
    } else if (keyName === "type") {
      return this.getTypeDropdown(key);
    }
  }

  render() {
    const {pokemon} = this.state;
    let inputFields = Object.keys(pokemon).map((key) => this.getInputFields(key));

    return (
      <div className="container">
        <div className="row form-wrapper">
          <div className="col-lg-4">
            <h1 className="text-center">Register a Pokémon</h1>
            <hr />
            <form onSubmit={this.handleSubmit}> 
              {inputFields}
              <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-primary">{this.state.buttonAction}</button> 
              </div>
            </form>
            <hr className="d-lg-none" />
          </div>
          <div className="col-lg-8">
            <PkmnTable
              pokemons={this.state.pokemons}
              select={this.selectPokemon}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PkmnForm;