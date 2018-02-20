import React, {Component} from 'react';
import {Button, Reboot} from 'material-ui';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Reboot/>
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <Button variant="raised">
            Click me!
          </Button>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
