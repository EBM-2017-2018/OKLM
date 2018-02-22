import React, {PureComponent} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import {AppBar, IconButton, Toolbar, Tooltip, Typography, withStyles} from 'material-ui';
import {Apps as AppsIcon} from 'material-ui-icons';

import AppsMenu from './AppsMenu';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    }
};

class GlobalAppBar extends PureComponent {
    static propTypes = {
        appTitle: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired
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
        })
    };

    handleAppsMenuClose = () => {
      this.setState({
        appsMenuOpen: false,
      })
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
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
            </div>
        )
    };
}

export default withStyles(styles)(GlobalAppBar);
