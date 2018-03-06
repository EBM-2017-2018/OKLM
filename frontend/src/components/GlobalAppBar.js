import React, {PureComponent} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppBar, IconButton, Toolbar, Tooltip, Typography, withStyles} from 'material-ui';
import {Apps as AppsIcon} from 'material-ui-icons';

import UserMenu from './UserMenu';
import SearchInput from './SearchInput';
import AppsMenu from './AppsMenu';

const styles = theme => ({
  toolBar: {
    justifyContent: 'space-between'
  },
  appBarWithTabBar: {
    boxShadow: 'unset'
  }
});

class GlobalAppBar extends PureComponent {
  static propTypes = {
    appTitle: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    hasTabBarBelow: PropTypes.bool
  };

  static defaultProps = {
    hasTabBarBelow: false
  };

  state = {
    searchQuery: '',
    appsMenuOpen: false,
    anchorEl: null,
  };

  button = null;

  handleAppsMenuClick = () => {
    this.setState({
      appsMenuOpen: true,
      anchorEl: findDOMNode(this.button)
    });
  };

  handleAppsMenuClose = () => {
    this.setState({
      appsMenuOpen: false,
    });
  };

  updateSearchQuery = event => this.setState({ searchQuery: event.target.value });

  render() {
    const {classes, hasTabBarBelow} = this.props;

    const appBarClasses = classNames({[classes.appBarWithTabBar]: hasTabBarBelow});

    return (
      <AppBar position="absolute" className={appBarClasses}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="title" color="inherit">
            {this.props.appTitle}
          </Typography>
          <SearchInput />
          <div>
            <UserMenu />
            <Tooltip id="apps-icon" title="Applications">
              <IconButton
                color="inherit"
                aria-label="Applications"
                ref={node => this.button = node}
                onClick={this.handleAppsMenuClick}>
                <AppsIcon/>
              </IconButton>
            </Tooltip>
            <AppsMenu
              open={this.state.appsMenuOpen}
              anchorEl={this.state.anchorEl}
              closeCallback={this.handleAppsMenuClose}/>
          </div>
        </Toolbar>
      </AppBar>
    );
  };
}

export default withStyles(styles)(GlobalAppBar);
