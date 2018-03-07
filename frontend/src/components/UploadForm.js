import React, { PureComponent } from 'react';
import { Button, TextField, Typography, withStyles } from 'material-ui';
import { FileUpload as UploadIcon } from 'material-ui-icons';

import { createDoc, getTopLevelCategories, getUsers } from '../api'

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
  rightIcon: {
    marginLeft: theme.spacing.unit,
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
  state = {
    categories: [],
    documentName: '',
    documentCategory: '',
    documentPath: ''
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  componentDidMount() {
    getTopLevelCategories().then(categories => {
      this.setState({ categories })
    })
  };

  handleClick = async () => {
    // TODO Get authorID from current user
    const authorId = await getUsers().then(users => users[0])
    createDoc({
      title: this.state.documentName,
      uri: this.state.documentPath,
      motherCategory: this.state.documentCategory,
      author: authorId._id});
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container}>
        <Typography variant="headline" className={classes.title}>Envoyer un document</Typography>
        <Typography variant="subheading" gutterBottom>Catégories :</Typography>
        <ul>
          {this.state.categories.map(category => (
            <li key={category._id}>{category.name} : {category._id}</li>
          ))}
        </ul>
        <div className={classes.flexLine}>
          <TextField
            name="documentName"
            label="Nom du document"
            required
            className={classes.textField}
            value={this.state.documentName}
            onChange={this.handleChange}/>
          <TextField
            name="documentCategory"
            label="Catégorie du document"
            required
            className={classes.textField}
            value={this.state.documentCategory}
            onChange={this.handleChange}/>
        </div>
        <TextField
          name="documentPath"
          label="URL du document"
          required
          className={classes.textField}
          value={this.state.documentPath}
          onChange={this.handleChange}/>
        <Button variant="raised" className={classes.button} onClick={this.handleClick}>
          Envoyer
          <UploadIcon className={classes.rightIcon}/>
        </Button>
      </form>
    )
  }
}

export default withStyles(style)(UploadForm)
