import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Card, CardMedia, GridListTile, Typography, withStyles} from 'material-ui';

const styles = theme => ({
  card: {
    padding: theme.spacing.unit
  },
  media: {
    height: 80
  }
});

class AppIcon extends PureComponent {
  static muiName = 'GridListTile';

  static propTypes = {
    ...GridListTile.propTypes,
    classes: PropTypes.object.isRequired,
    logo: PropTypes.string.isRequired,
    appName: PropTypes.string.isRequired,
  };

  render() {
    const {classes, logo, appName, ...baseProps} = this.props;

    return (
      <GridListTile {...baseProps}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={logo}
            title={appName}/>
          <Typography variant="subheading">
            {this.props.appName}
          </Typography>
        </Card>
      </GridListTile>
    )
  }
}

export default withStyles(styles)(AppIcon);
