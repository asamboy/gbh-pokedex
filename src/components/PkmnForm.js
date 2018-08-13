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
      buttonAction: "add",
      selectedPokemon: {},
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
    const action = this.state.buttonAction;
    
    if (action === "add") {
      this.addPokemon();
    } else if (action === "update") {
      this.updatePokemon();
    }
    event.preventDefault();
  }

  addPokemon = () => { 
    const pokemon = this.state.pokemon; 
    const emptyPokemon = this.resetPokemon();
    const pokemons = this.state.pokemons;
    let index = pokemons.findIndex(p => p.name === pokemon.name);

    if (index === -1) { 
      this.setState({
        pokemons: pokemons.concat(pokemon),
        pokemon: emptyPokemon,
      });
    } else {
      alert(pokemon.name + " is already registered");
    }
  }

  updatePokemon = () => {
    const pokemon = this.state.pokemon; 
    let pokemons = this.state.pokemons.slice(0);
    const selected = this.state.selectedPokemon;
    const emptyPokemon = this.resetPokemon();
    let index = pokemons.findIndex(p => p.name === selected.name);
    pokemons[index] = pokemon;

    this.setState({
      pokemons,
      pokemon: emptyPokemon,
      selectedPokemon: emptyPokemon,
      buttonAction: "add",
    });
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
    this.setState({
      selectedPokemon: pokemon
    });
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
    this.setState({
      pokemon,
      buttonAction: "update",
    });
  }

  delete = (pokemon) => {
    let newList = this.getNewList(pokemon);
    
    this.setState({
      pokemons: newList,
    });
  }

  getNewList = (pokemon) => {
    let pokemons = this.state.pokemons
    let index = pokemons.findIndex(p => p.name === pokemon.name);
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
                <button type="submit" className="btn btn-primary">{this.state.buttonAction === 'add' ? "Add Pokémon" : "Update"}</button> 
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