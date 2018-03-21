import React from 'react';
import { withStyles, Button } from 'material-ui';
import { Link } from 'react-router-dom';

export default withStyles(theme => ({
  button: {
    margin: [[0, theme.spacing.unit]],
    padding: theme.spacing.unit,
    minWidth: 0
  }
}))(({ title, classes, ...props }) => <Button component={Link} className={classes.button} {...props}>{title}</Button>);
