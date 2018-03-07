import React, { PureComponent } from 'react';
import { Button, TextField, Typography, withStyles } from 'material-ui';

const style = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'stretch'
  },
  title: {
    marginBottom: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit * 3,
    alignSelf: 'center'
  },
  textField: {
    margin: theme.spacing.unit,
    flexGrow: 1,
  },
  flexLine: {
    display: 'flex',
    flexDirection: 'row'
  }
});

class UploadForm extends PureComponent {
  state = {};

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container}>
        <Typography variant="headline" className={classes.title}>Envoyer un document</Typography>
        <div className={classes.flexLine}>
          <TextField
            name="documentName"
            label="Nom du document"
            required
            className={classes.textField}
            onChange={this.handleChange}/>
          <TextField
            name="documentCategory"
            label="Catégorie du document"
            required
            className={classes.textField}
            onChange={this.handleChange}/>
        </div>
        <TextField
          name="documentPath"
          label="URL du document"
          required
          className={classes.textField}
          onChange={this.handleChange}/>
        <Button variant="raised" color="danger" className={classes.button}>
          Envoyer
        </Button>
      </form>
    )
  }
}

export default withStyles(style)(UploadForm)
