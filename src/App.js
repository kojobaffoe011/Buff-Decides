import React from "react";
import Flex from "./layout /Flex";

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};

const Action = (props) => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.handlePick}>
        What Should I do
      </button>
    </div>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.map((option) => (
        <Option 
        key={option} 
        optionText={option} 
        handleIndividualDelete={props.handleIndividualDelete}
        />
      ))}
      <Option />
    </div>
  );
};

const Option = (props) => {
  return (
    <div>
      <p>{props.optionText}</p>
      <button 
          onClick={(e)=>{
            props.handleIndividualDelete(props.optionText)
 
          }} >
          remove
        </button>
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined,
    };
  }
  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => {
      return {
        error,
      };
    });
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

class IndecisionApp extends React.Component {
  s;
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleIndividualDelete = this.handleIndividualDelete.bind(this);
    this.state = {
      options: [],
    };
  }

  //handleDeleteOptions
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: [],
      };
    });
  }

  handleIndividualDelete(optionToRemove){
    this.setState((prevState)=>{
      return{
        options: prevState.options.filter((option)=>{
          return optionToRemove !== option;

        })
      }
    })
  }

  //handlePick
  handlePick() {
    const optionIndex = Math.floor(Math.random() * this.state.options.length);
    const optionPicked = this.state.options[optionIndex];
    alert(`Do: ${optionPicked}`);
    // console.log(optionNumber);
  }

  //handleAddOption

  handleAddOption(option) {
    // console.log(option);
    if (!option) {
      return "Enter valid value to add";
    } else if (this.state.options.indexOf(option) > -1) {
      return "this item already exists";
    }

    this.setState((prevState) => {
      return {
        options: prevState.options.concat([option]),
      };
    });
  }
  render() {
    return (
      <div>
        <Header
          title={"Indecision App"}
          subtitle={"I can tell you what to do if you allow me :) "}
        />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleIndividualDelete ={this.handleIndividualDelete}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

export default IndecisionApp;
