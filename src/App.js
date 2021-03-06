import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';

import { arrayOf, randRange } from './utils';
import * as Dices from './components/Dices/Dices';
import './App.css';

const initialState = {
  size: 0,
  dices: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case 'ROLL':
      const { keys, size } = payload;
      return {
        ...state,
        size,
        dices: arrayOf(size).map(x => keys[randRange(0, keys.length)]),
      }
    default:
      return state;
  }
}

class App extends Component {

  state = {
    ...initialState,
  }

  componentDidMount() {
    this.state = reducer(undefined, {});
  }

  onFormSubmit(event) {
    event.preventDefault();
    const size = this.refs.size.value;

    if(!size) {
      return;
    }

    this.setState(reducer(this.state, {
      type: 'ROLL',
      payload: {
        keys: Object.keys(Dices),
        size,
      },
    }));
  }

  renderDice(size, key) {
    switch(size) {
      case 'One': return <Dices.One key={key} />
      case 'Two': return <Dices.Two key={key} />
      case 'Three': return <Dices.Three key={key} />
      case 'Four': return <Dices.Four key={key} />
      case 'Five': return <Dices.Five key={key} />
      case 'Six': return <Dices.Six key={key} />
    }
  }

  render() {
    const { size, dices } = this.state;
    return (
      <Flex
        className="App"
        column={true}
        justify="space-around"
        >
        <a className="App--repo" href="https://github.com/weslleyaraujo/roll-the-dice">github</a>
        <Box
          className="App--content"
          p={1}>
          <h1>Roll the react dice</h1>
          <form onSubmit={this.onFormSubmit.bind(this)}>
            <select className="App--form-control" ref="size">
              {arrayOf(6).map(x => <option value={x} key={x}>{x} </option>)}
            </select>
            <button style={{ marginLeft: 20, }} type="submit" className="App--form-control">Roll it</button>
          </form>
        </Box>
        <Flex
          p={1}
          justify="space-around"
          >
          {dices.map((x, i) => this.renderDice(x, i))}
        </Flex>
      </Flex>
    );
  }
}

export default App;
