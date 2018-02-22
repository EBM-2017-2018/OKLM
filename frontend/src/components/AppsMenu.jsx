import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Grid, Popover} from 'material-ui';

class AppsMenu extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
    closeCallback: PropTypes.func.isRequired,
  };

  render() {
    console.log(this.props.anchorEl);
    return (
      <Popover
        open={this.props.open}
        onClose={this.props.closeCallback}
        anchorEl={this.props.anchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <Grid container>
          <Grid item xs={4}>
            Coucou
          </Grid>
          <Grid item xs={4}>
            Coucou
          </Grid>
          <Grid item xs={4}>
            Coucou
          </Grid>
          <Grid item xs={4}>
            Coucou
          </Grid>
          <Grid item xs={4}>
            Coucou
          </Grid>
          <Grid item xs={4}>
            Coucou
          </Grid>
          <Grid item xs={4}>
            Coucou
          </Grid>
          <Grid item xs={4}>
            Coucou
          </Grid>

        </Grid>
      </Popover>
    )
  }
}

export default AppsMenu;
