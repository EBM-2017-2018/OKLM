import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {GridList, Popover, withStyles} from 'material-ui';

import AppIcon from './AppIcon';
import logo from '../logo.svg'

const styles = theme => ({
  root: {
    overflow: 'hidden',
    width: 300,
    padding: '20px 15px',
    backgroundColor: theme.palette.background.paper,
  }
});

class AppsMenu extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
    closeCallback: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {classes} = this.props;

    return (
      <Popover
        open={this.props.open}
        onClose={this.props.closeCallback}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <div className={classes.root}>
          <GridList cellHeight={100} cols={3}>
            <AppIcon logo={logo} appName="OKLM" href="//oklm.ebm.nymous.io"/>
            <AppIcon logo={logo} appName="Redline" href="//redline.ebm.nymous.io"/>
            <AppIcon logo={logo} appName="Linkapp" href="//linkapp.ebm.nymous.io"/>
            <AppIcon logo={logo} appName="Markus" href="//markus.ebm.nymous.io"/>
            <AppIcon logo={logo} appName="SAGG" href="//sagg.ebm.nymous.io"/>
            <AppIcon logo={logo} appName="Livecoding" href="//livecoding.ebm.nymous.io"/>
          </GridList>
        </div>
      </Popover>
    )
  }
}

export default withStyles(styles)(AppsMenu);
