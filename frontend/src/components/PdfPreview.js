import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.noworker';
import { Paper, CircularProgress, Button, MobileStepper, withStyles } from 'material-ui';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const styles = theme => ({
  preview: {
    marginTop: theme.spacing.unit * 2
  },
  progress: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center'
  },
  page: {
    display: 'flex',
    justifyContent: 'center'
  },
  stepper: {
    padding: 0,
    paddingBottom: theme.spacing.unit
  }
});

export class PdfPreview extends Component {
  state = {
    total: 0,
    current: 1
  };

  move = dir => () => this.setState(({ current }) => ({ current: current + dir }));
  canGoForward = () => this.state.current < this.state.total;
  canGoBackward = () => this.state.current > 1;

  onDocumentLoad = ({ numPages: total }) => {
    this.setState({ total });
  }

  render() {
    const { total, current } = this.state;
    const { classes, document } = this.props;

    return <Document
      file={document.uri}
      loading={<Paper className={classes.progress}><CircularProgress /></Paper>}
      onLoadSuccess={this.onDocumentLoad}
      className={classes.preview}
    >
      <MobileStepper
        variant="dots"
        steps={total}
        position="static"
        activeStep={current - 1}
        className={classes.stepper}
        backButton={
          <Button size="small" onClick={this.move(-1)} disabled={!this.canGoBackward()}>
            <KeyboardArrowLeft />
            Page précédente
              </Button>
        }
        nextButton={
          <Button size="small" onClick={this.move(1)} disabled={!this.canGoForward()}>
            Page suivante
            <KeyboardArrowRight />
          </Button>
        }
      />
      <Paper>
        <Page pageNumber={current} className={classes.page} />
      </Paper>
    </Document>;
  }
}

export default withStyles(styles)(PdfPreview)
