import React, { PureComponent, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, CircularProgress, MenuItem, TextField, Typography, withStyles, Paper } from 'material-ui';
import { FileUpload as UploadIcon, AttachFile as AttachmentIcon } from 'material-ui-icons';
import queryString from 'query-string';
import Downshift from 'downshift';

import { createDoc, search, getCategory } from '../api'
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
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  uploadProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
  },
  fileInput: {
    display: 'none',
  },
  fileName: {
    marginLeft: theme.spacing.unit,
    display: 'unset',
  },
  textField: {
    margin: theme.spacing.unit,
    flexGrow: 1,
    position: 'relative'
  },
  flexLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  popover: {
    width: '100%',
    position: 'absolute',
    zIndex: 10
  }
});


class CategoryList extends Component {
  state = {
    loading: false,
    categories: []
  };

  componentWillReceiveProps({ inputValue }) {
    if (inputValue === this.props.inputValue) return;
    if (this.timeout) clearTimeout(this.timeout);
    if (inputValue.length === 0) return;

    this.setState({ loading: true });
    this.timeout = setTimeout(
      () =>
        search(inputValue).then(data =>
          this.setState({ categories: data.categories || [], loading: false })
        ),
      200
    );
  }
  
  render() {
    const { getItemProps } = this.props;
    return <Paper className={this.props.classes.popover} square>
      {this.state.categories.map((category, index) =>
        <MenuItem
          {...getItemProps({
            key: category._id,
            item: category,
            index
          })}
          component="div"
          style={{
            fontWeight: false ? 500 : 400,
          }}
        >
          {category.name}
        </MenuItem>
      )}
    </Paper>
  }
}

class UploadForm extends PureComponent {
  state = {
    loading: false,
    error: false,
    categories: [],
    documentName: '',
    documentCategory: '',
    documentFile: {}
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleFileInputChange = event => {
    const file = event.target.files[0];
    this.setState({ documentFile: file });
  };

  componentDidMount() {
    const queryParams = queryString.parse(this.props.history.location.search);
    if (queryParams.categoryId) {
      this.setState({ documentCategory: queryParams.categoryId });
      getCategory(queryParams.categoryId).then(category => 
        this.downshift.setState({ inputValue: category.name })
      );
    }
  };

  handleFileInputClick = (event) => {
    event.preventDefault();
    this.fileInput.click();
  };

  handleClick = () => {
    this.setState({ loading: true, error: false });

    createDoc({
      title: this.state.documentName,
      file: this.state.documentFile,
      motherCategory: this.state.documentCategory
    }).then(() => {
      const queryParams = queryString.parse(this.props.history.location.search);
      if (queryParams.after) this.props.history.replace(queryParams.after);
      else this.props.history.replace('/mydocs')
    }).catch(e => this.setState({ error: true, loading: false }));
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
          <Downshift
            ref={c => this.downshift = c}
            itemToString={category => category && category.name}
            onChange={category => this.setState({ documentCategory: category._id })}
          >
            {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => {
              const { value, ...inputProps } = getInputProps();
              return (
                <div className={classes.textField}>
                  <TextField
                    label="Catégorie du document"
                    value={value || ''}
                    InputProps={{
                      classes: {
                        root: classes.inputRoot,
                      },
                      ...inputProps
                    }}
                    fullWidth={true}
                  />
                  {isOpen ? (
                    <CategoryList inputValue={inputValue} getItemProps={getItemProps} classes={classes}/>
                  ) : null}
                </div>
              )}
            }
          </Downshift>
        </div>
        <input
          className={classes.fileInput}
          id="documentFile"
          type="file"
          ref={(input) => this.fileInput = input}
          onChange={this.handleFileInputChange}/>
        <label htmlFor="documentFile">
          <Button variant="raised" component="span" onClick={this.handleFileInputClick}>
            <AttachmentIcon className={classes.leftIcon}/>
            Choisir un fichier
          </Button>
          {this.state.documentFile && <Typography variant="body1" component="span"
                      className={classes.fileName}>{this.state.documentFile.name}</Typography>}
        </label>
        <div className={classes.button}>
          <Button variant="raised" disabled={this.state.loading} onClick={this.handleClick}>
            Envoyer
            <UploadIcon className={classes.rightIcon}/>
          </Button>
          {this.state.loading && <CircularProgress size={32} className={classes.uploadProgress} thickness={5}/>}
        </div>
        {this.state.error &&
        <Typography variant="body1" align="center" color="error">Une erreur est survenue</Typography>}
      </form>
    )
  }
}

export default withRouter(withStyles(style)(UploadForm));
