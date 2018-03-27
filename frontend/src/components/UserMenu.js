import React, { PureComponent, Fragment } from 'react';
import {
  IconButton,
  Tooltip,
  withStyles,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from 'material-ui';
import PropTypes from 'prop-types';
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  InsertDriveFile as FileIcon,
  Lock as LockIcon,
  PowerSettingsNew as DisconnectIcon,
} from 'material-ui-icons';
import { Link, withRouter } from 'react-router-dom';
import { getToken } from 'ebm-auth/dist/browser';
import { whoami } from '../api';

const styles = theme => ({
  menuIcon: {
    margin: 0
  }
});

class UserMenu extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    menuRef: null
  };

  openMenu = event => this.setState({ menuRef: event.target });
  closeMenu = () => this.setState({ menuRef: null });

  handleConnectClick = () => whoami();

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Tooltip id="apps-icon" title="Utilisateur">
          <IconButton
            onClick={this.openMenu}
            color="inherit"
            aria-label="Utilisateur"
          >
            <PersonIcon/>
          </IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={this.state.menuRef}
          open={Boolean(this.state.menuRef)}
          onClose={this.closeMenu}
        >
          {getToken() ? (
            <Fragment>
              <MenuItem component={Link} to="/mydocs" onClick={this.closeMenu}>
                <ListItemIcon>
                  <FileIcon className={classes.menuIcon}/>
                </ListItemIcon>
                <ListItemText inset primary="Mes documents"/>
              </MenuItem>
              < MenuItem component={Link} to="/profile" onClick={this.closeMenu}>
                <ListItemIcon>
                  <PersonIcon className={classes.menuIcon}/>
                </ListItemIcon>
                <ListItemText inset primary="Mon profil"/>
              </MenuItem>
              <MenuItem component={Link} to="/settings" onClick={this.closeMenu}>
                <ListItemIcon>
                  <SettingsIcon className={classes.menuIcon}/>
                </ListItemIcon>
                <ListItemText inset primary="Paramètres"/>
              </MenuItem>
              <MenuItem component={Link} to="/logout" onClick={this.closeMenu}>
                <ListItemIcon>
                  <DisconnectIcon className={classes.menuIcon}/>
                </ListItemIcon>
                <ListItemText inset primary="Se déconnecter"/>
              </MenuItem>
            </Fragment>
          ) : (
            <MenuItem onClick={this.handleConnectClick}>
              <ListItemIcon>
                <LockIcon className={classes.menuIcon}/>
              </ListItemIcon>
              <ListItemText inset primary="Se connecter"/>
            </MenuItem>
          )}
        </Menu>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(UserMenu));
