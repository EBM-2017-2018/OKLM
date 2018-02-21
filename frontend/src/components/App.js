import React, {Component} from 'react';
import {Button, MuiThemeProvider, Reboot} from 'material-ui';

import './App.css';
import theme from '../theme';
import GlobalAppBar from './GlobalAppBar';
import AppBar from './AppBar';

class App extends Component {
    render() {
        return (
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    <Reboot/>
                    <GlobalAppBar/>
                    <AppBar/>
                    <header className="App-header">
                        <h1 className="App-title">Welcome to React</h1>
                        <Button variant="raised" color="secondary">
                            Click me!
                        </Button>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
