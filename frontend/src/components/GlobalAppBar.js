import React, {PureComponent} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppBar, IconButton, Toolbar, Tooltip, Typography, withStyles, Input, InputAdornment} from 'material-ui';
import {Apps as AppsIcon, Search as SearchIcon} from 'material-ui-icons';
import UserMenu from './UserMenu';

import AppsMenu from './AppsMenu';

const styles = theme => ({
  toolBar: {
    justifyContent: 'space-between'
  },
  appBarWithTabBar: {
    boxShadow: 'unset'
  },
  searchUnderline: {
    '&::after': {
      background: [theme.palette.primary.contrastText, '!important']
    },
    '&::before': {
      background: [theme.palette.primary.light, '!important']
    }
  },
  searchInput: {
    color: theme.palette.primary.contrastText,
    marginRight: 5 * theme.spacing.unit,
    marginLeft: 5 * theme.spacing.unit,
    maxWidth: '400px',
    flex: 1,
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
          <Input
            id="name"
            color="inherit"
            label="Rechercher"
            className={classes.searchInput}
            classes={{
              underline: classes.searchUnderline
            }}
            value={this.state.searchQuery}
            placeholder="Rechercher un document..."
            onChange={this.updateSearchQuery}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            }
          />
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
