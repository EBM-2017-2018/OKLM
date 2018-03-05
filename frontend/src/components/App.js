import React, {Component} from 'react';
import {MuiThemeProvider, Reboot, withStyles} from 'material-ui';
import PropTypes from 'prop-types';

import './App.css';
import theme from '../theme';
import GlobalAppBar from './GlobalAppBar';
import TabBar from './TabBar'
import Content from './Content';

const styles = theme => ({
  root: {
    marginTop: 56,
    '@media (min-width:0px) and (orientation: landscape)': {
      marginTop: 48
    },
    '@media (min-width:600px)': {
      marginTop: 64
    }
  },
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
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Reboot/>
          <GlobalAppBar appTitle="EBM Boilerplate" hasTabBarBelow/>
          <TabBar/>
          {/* You should work mainly in the Content component */}
          <Content className={classes.content}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
