import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {AppBar, IconButton, Toolbar, Tooltip, Typography, withStyles} from 'material-ui';
import {Apps as AppsIcon} from 'material-ui-icons';

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
                            <IconButton color="inherit" aria-label="Applications">
                                <AppsIcon/>
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </div>
        )
    };
}

export default withStyles(styles)(GlobalAppBar);
