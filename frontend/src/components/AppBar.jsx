import React, {PureComponent} from 'react';
import {AppBar as MaterialAppBar, IconButton, Toolbar, Typography} from 'material-ui';
import {Menu as MenuIcon} from 'material-ui-icons';

class AppBar extends PureComponent {
  render() {
    return (
      <MaterialAppBar position="static" color="secondary">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="title" color="inherit">
            EBM Boilerplate
          </Typography>
        </Toolbar>
      </MaterialAppBar>
    )
  }
}

export default AppBar;
