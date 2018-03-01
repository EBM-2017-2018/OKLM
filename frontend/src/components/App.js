import React, {Component} from 'react';
import {Button, MuiThemeProvider, Reboot, withStyles} from 'material-ui';
import PropTypes from 'prop-types';

import './App.css';
import theme from '../theme';
import GlobalAppBar from './GlobalAppBar';
import TabBar from './TabBar'

const styles = theme => ({
  content: {
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
          {/* If you have a TabBar KEEP this double GlobalAppBar with the uglyAppBarHack! */}
          <GlobalAppBar appTitle="EBM Boilerplate" uglyAppBarHack/>
          <GlobalAppBar appTitle="EBM Boilerplate" hasTabBarBelow/>
          <TabBar/>
          <div className={classes.content}>
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
