import React, {PureComponent} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppBar, IconButton, Toolbar, Tooltip, Typography, withStyles} from 'material-ui';
import {Apps as AppsIcon} from 'material-ui-icons';

import AppsMenu from './AppsMenu';

const styles = {
  appBarWithTabBar: {
    boxShadow: 'unset'
  },
  flex: {
    flex: 1,
  }
};

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

  render() {
    const {classes, hasTabBarBelow} = this.props;

    const appBarClasses = classNames({[classes.appBarWithTabBar]: hasTabBarBelow});

    return (
      <AppBar position="absolute" className={appBarClasses}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {this.props.appTitle}
          </Typography>
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
        </Toolbar>
      </AppBar>
    );
  };
}

export default withStyles(styles)(GlobalAppBar);
