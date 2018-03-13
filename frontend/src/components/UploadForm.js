import React, { PureComponent } from 'react';
import { Button, CircularProgress, MenuItem, TextField, Typography, withStyles } from 'material-ui';
import { FileUpload as UploadIcon } from 'material-ui-icons';

import { createDoc, getTopLevelCategories, getUsers } from '../api'
import green from 'material-ui/colors/green';

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
    position: 'relative',
    alignSelf: 'center'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
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
    loading: false,
    error: false,
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
    this.setState({ loading: true });

    // TODO Get authorID from current user
    const authorId = await getUsers().then(users => users[0]);
    try {
      const document = await createDoc({
        title: this.state.documentName,
        uri: this.state.documentPath,
        motherCategory: this.state.documentCategory,
        author: authorId._id
      });
    } catch (err) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
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
            value={this.state.documentName}
            onChange={this.handleChange}/>
          <TextField
            name="documentCategory"
            select
            required
            label="Catégorie du document"
            className={classes.textField}
            value={this.state.documentCategory}
            onChange={this.handleChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
            {this.state.categories.map(category => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          name="documentPath"
          label="URL du document"
          required
          className={classes.textField}
          value={this.state.documentPath}
          onChange={this.handleChange}/>
        <div className={classes.button}>
          <Button variant="raised" disabled={this.state.loading} onClick={this.handleClick}>
            Envoyer
            <UploadIcon className={classes.rightIcon}/>
          </Button>
          {this.state.loading && <CircularProgress size={32} className={classes.buttonProgress} thickness={5}/>}
        </div>
      </form>
    )
  }
}

export default withStyles(style)(UploadForm)
