import React, { Component, Fragment } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField, withStyles } from 'material-ui';
import { Link } from 'react-router-dom';

import { addCategory, whoami } from '../api';

const styles = theme => ({
  addButton: {
    margin: [[0, theme.spacing.unit, theme.spacing.unit]]
  }
});

const UnstyledAddDocumentButton = ({ parentId, classes, goBackTo }) => (
  <Button
    component={Link}
    className={classes.addButton}
    variant="raised"
    to={parentId ? `/upload?categoryId=${parentId}&after=${encodeURIComponent(goBackTo)}` : '/upload'}
    color="primary"
  >
    Téléverser un document
  </Button>
);

class UnstyledAddCategoryButton extends Component {
  state = {
    open: false,
    name: ''
  };

  close = () => this.setState({ open: false, name: '' });
  open = async () => {
    await whoami();
    this.setState({ open: true });
  };
  save = () => addCategory(this.state.name, this.props.parentId).then(data => {
    this.setState({ open: false, name: '' });
    this.props.onSave && this.props.onSave(data);
  });

  updateName = e => this.setState({ name: e.target.value });

  render() {
    return <Fragment>
      <Dialog
        open={this.state.open}
        onClose={this.close}
        aria-labelledby="add-category-title"
      >
        <DialogTitle id="add-category-title">Ajouter une catégorie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Titre de la catégorie"
            value={this.state.name}
            onChange={this.updateName}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close} color="primary">Annuler</Button>
          <Button onClick={this.save} color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={this.open} className={this.props.classes.addButton} variant="raised" color="primary">Ajouter une catégorie</Button>
    </Fragment>
  }
}

export const AddCategoryButton = withStyles(styles)(UnstyledAddCategoryButton);
export const AddDocumentButton = withStyles(styles)(UnstyledAddDocumentButton);
