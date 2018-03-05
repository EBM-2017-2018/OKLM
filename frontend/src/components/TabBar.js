import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Tabs, Tab, withStyles} from 'material-ui';

const styles = {};

class TabBar extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    selectedTab: 0
  };

  handleChange = (event, value) => {
    this.setState({selectedTab: value});
  };

  render() {
    return (
      <AppBar position="static">
        <Tabs
          value={this.state.selectedTab}
          onChange={this.handleChange}
          fullWidth>
          <Tab label="Onglet 1"/>
          <Tab label="Onglet 2"/>
          <Tab label="Onglet 3"/>
        </Tabs>
      </AppBar>
    );
  }
}

export default withStyles(styles)(TabBar);
