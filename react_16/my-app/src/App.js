import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';

import { createPortal } from "react-dom";

const Message = () => "Just thouched it!!";
class Portal extends React.Component {
  render() {
    return createPortal(<Message />, document.getElementById("touchme"));
  }
}

class ReturnTypes extends React.Component {
  render() {
    return (
        <Fragment>
          <header></header>
          <div></div>,
          <div></div>
        </Fragment>

    )
  }
}

class ReturnString extends React.Component {
  render() {
    return "Hi~ Theree"
  }
}


class ErrorMaker extends React.Component {
  state = {
    friends: ["darin", "sarang"]
  }
  componentDidMount = () => {
    setTimeout( () =>
      this.setState({friends: undefined}), 
      2000
    )
  };
  render() {
    const { friends } = this.state;
    return friends.map(friend => ` ${friend}`)
  }
}

const ErrorFallback = () => " Sorry something went wrong";

const BoundaryHOC = ProtectedComponent => 
  class Boundary extends React.Component {
    state = {
      hasError: false
    };
    componentDidCatch = () => {
      this.setState({
        hasError: true
      });
    };
    render() {
      const { hasError } = this.state;
      if (hasError) {
        return <ErrorFallback />;
      } else {
        return <ProtectedComponent />;
      }
    }
  }


const ProtectedErrorMaker = BoundaryHOC(ErrorMaker);

const MAX_PIZZAS = 20;
const eatPizza = (state, props) => {
  const { pizzas } = state;
  if (pizzas < MAX_PIZZAS) {
    return {
      pizzas: pizzas + 1
    }
  } else {
    return null;
  }
}

class Controlled extends React.Component {
  state = {
    pizzas: 0
  };
  render() {
    const { pizzas } = this.state;
    return (
      <button onClick={this._handleClick}> {`I have eaten ${pizzas}`}</button>
    )
  }
  _handleClick = () => {
    this.setState(eatPizza)
  }
}

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Portal />
        <ReturnString />
        <ProtectedErrorMaker />
        <Controlled />
      </Fragment>
  )}
}

export default BoundaryHOC(App);
