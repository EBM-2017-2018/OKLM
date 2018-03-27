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
import { PropTypes } from 'prop-types';
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  InsertDriveFile as FileIcon
} from 'material-ui-icons';
import { Link } from 'react-router-dom';

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
            <PersonIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={this.state.menuRef}
          open={Boolean(this.state.menuRef)}
          onClose={this.closeMenu}
        >
          <MenuItem component={Link} to="/mydocs" onClick={this.closeMenu}>
            <ListItemIcon>
              <FileIcon className={classes.menuIcon} />
            </ListItemIcon>
            <ListItemText inset primary="Mes documents" />
          </MenuItem>
          <MenuItem component={Link} to="/profile" onClick={this.closeMenu}>
            <ListItemIcon>
              <PersonIcon className={classes.menuIcon} />
            </ListItemIcon>
            <ListItemText inset primary="Mon profil" />
          </MenuItem>
          <MenuItem component={Link} to="/settings" onClick={this.closeMenu}>
            <ListItemIcon>
              <SettingsIcon className={classes.menuIcon} />
            </ListItemIcon>
            <ListItemText inset primary="Paramètres" />
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

export default withStyles(styles)(UserMenu);
