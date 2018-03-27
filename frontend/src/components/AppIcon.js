import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Card, CardMedia, GridListTile, Typography, withStyles} from 'material-ui';

const styles = theme => ({
  card: {
    height: '100%',
    padding: theme.spacing.unit / 2,
    boxShadow: 'unset',
    '&:hover': {
      border: '1px solid #e5e5e5',
      borderRadius: 2,
      padding: `calc(${theme.spacing.unit / 2}px - 1px)`,
      cursor: 'pointer'
    }
  },
  media: {
    height: `calc(100% - ${theme.typography.subheading.fontSize}*2)`,
    backgroundSize: 'contain'
  },
  appName: {
    textAlign: 'center',
    userSelect: 'none'
  },
  link: {
    textDecoration: 'none'
  }
});

class AppIcon extends PureComponent {
  static muiName = 'GridListTile';

  static propTypes = {
    ...GridListTile.propTypes,
    classes: PropTypes.object.isRequired,
    logo: PropTypes.string.isRequired,
    appName: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  };

  render() {
    const {classes, logo, appName, ...baseProps} = this.props;

    return (
      <GridListTile {...baseProps}>
        <a href={this.props.href} className={classes.link}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={logo}
              title={appName}/>
            <Typography variant="subheading" className={classes.appName}>
              {this.props.appName}
            </Typography>
          </Card>
        </a>
      </GridListTile>
    );
  }
}

export default withStyles(styles)(AppIcon);
