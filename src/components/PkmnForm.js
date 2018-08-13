import React, { PureComponent } from 'react';
import PkmnTable from './PkmnTable';
import TextInput from './TextInput';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';
import Button from './Button';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
    'Water',
  ]

  constructor(props) {
    super(props);
    this.state = {
      pokemon: {
        name: '',
        type: '',
        nickname: '',
        location: '',
        photo: '',
        weight: '',
        age: '',
        captured: false,
      },
      pokemons: [],
      buttonAction: 'add',
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
      captured: false,
    };
  }

  getInputFields = (key) => {
    const keyName = { key }.key;

    switch (keyName) {
      case ('type'):
        return this.getTypeDropdown(key);
      case ('captured'):
        return this.getCapturedCheckbox(key);
      default:
        return this.getTextInput(key);
    }
  }

  getTextInput = (key) => {
    const numeric = ['weight', 'age'];
    let type = 'text';
    const required = true;
    let min;

    if (numeric.indexOf({ key }.key) !== -1) {
      type = 'number';
      min = '0';
    }
    return (
      <TextInput
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
    );
  }

  getTypeDropdown = (key) => {
    const required = true;
    return (
      <Dropdown
        divClass="form-group"
        inputClass="form-control"
        inputName={key}
        handlechange={this.handleChange}
        value={this.state.pokemon[key]}
        types={PkmnForm.types}
        required={required}
        key={key}
      />
    );
  }

  getCapturedCheckbox = (key) => {
    return (
      <Checkbox
        divClass="form-group text-center"
        inputClass="form-check-label"
        inputName={key}
        handlechange={this.handleChange}
        value={this.state.pokemon[key]}
        key={key}
      />
    );
  }

  delete = (pokemon) => {
    const newList = this.getNewList(pokemon);
    this.setState({
      pokemons: newList,
    });
  }

  getNewList = (pokemon) => {
    const pokemons = this.state.pokemons;
    const index = pokemons.findIndex(p => p.name === pokemon.name);
    const newList = pokemons.slice(0, index).concat(pokemons.slice(index+1));
    return newList;
  }

  edit = (pokemon) => {
    this.setState({
      pokemon,
      buttonAction: 'update',
    });
  }

  selectPokemon = (pokemon) => {
    this.setState({
      selectedPokemon: pokemon,
    });
    confirmAlert({
      title: `Edit or remove ${pokemon.name} ?`,
      buttons: [
        {
          label: 'Edit',
          onClick: () => this.edit(pokemon),
        },
        {
          label: 'Delete',
          onClick: () => this.delete(pokemon),
        },
      ],
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const pokemon = {};
    pokemon[name] = value;

    this.setState(prevState => ({
      pokemon: {
        ...prevState.pokemon,
        [name]: value,
      },
    }));
  }

  handleSubmit = (event) => {
    const action = this.state.buttonAction; 
    if (action === 'add') {
      this.addPokemon();
    } else if (action === 'update') {
      this.updatePokemon();
    }
    event.preventDefault();
  }

  // TODO fix the possibility of updating a Pokemon with an existing name
  updatePokemon = () => {
    const pokemon = this.state.pokemon; 
    const pokemons = this.state.pokemons.slice(0);
    const selected = this.state.selectedPokemon;
    const emptyPokemon = this.resetPokemon();
    const index = pokemons.findIndex(p => p.name === selected.name);
    pokemons[index] = pokemon;

    this.setState({
      pokemons,
      pokemon: emptyPokemon,
      selectedPokemon: emptyPokemon,
      buttonAction: 'add',
    });
  }

  addPokemon = () => { 
    const pokemon = this.state.pokemon; 
    const emptyPokemon = this.resetPokemon();
    const pokemons = this.state.pokemons;
    const index = pokemons.findIndex(p => p.name === pokemon.name);

    if (index === -1) { 
      this.setState({
        pokemons: pokemons.concat(pokemon),
        pokemon: emptyPokemon,
      });
    } else {
      alert(`${pokemon.name} is already registered`);
    }
  }

  render() {
    const { pokemon } = this.state;
    const inputFields = Object.keys(pokemon).map(key => this.getInputFields(key));

    return (
      <div className="container">
        <div className="row form-wrapper">
          <div className="col-lg-4">
            <h1 className="text-center">Register a Pokémon</h1>
            <hr />
            <form onSubmit={this.handleSubmit}> 
              {inputFields}
              <div className="col-md-12 text-center">
                <Button 
                  type="submit"
                  btnClass="btn btn-primary"
                  action={this.state.buttonAction}
                />
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