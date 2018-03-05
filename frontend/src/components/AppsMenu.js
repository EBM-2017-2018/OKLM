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

  apps = [
    {
      name: 'OKLM',
      url: '//oklm.ebm.nymous.io',
      logo: logo
    },
    {
      name: 'Redline',
      url: '//redline.ebm.nymous.io',
      logo: logo
    },
    {
      name: 'Linkapp',
      url: '//linkapp.ebm.nymous.io',
      logo: logo
    },
    {
      name: 'Markus',
      url: '//markus.ebm.nymous.io',
      logo: logo
    },
    {
      name: 'SAGG',
      url: '//sagg.ebm.nymous.io',
      logo: logo
    },
    {
      name: 'Livecoding',
      url: '//livecoding.ebm.nymous.io',
      logo: logo
    }
  ];

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
            {this.apps.map(app => (
              <AppIcon key={app.url} logo={app.logo} appName={app.name} href={app.url}/>
            ))}
          </GridList>
        </div>
      </Popover>
    )
  }
}

export default withStyles(styles)(AppsMenu);
