import React, {Component} from 'react';
import {Button, MuiThemeProvider, Reboot, withStyles} from 'material-ui';
import PropTypes from 'prop-types';

import './App.css';
import theme from '../theme';
import GlobalAppBar from './GlobalAppBar';

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 5,
    }
});

class App extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Reboot/>
                    <GlobalAppBar appTitle="EBM Boilerplate"/>
                    <div className={classes.root}>
                        <Button variant="raised" color="secondary">
                            Click me!
                        </Button>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withStyles(styles)(App);
