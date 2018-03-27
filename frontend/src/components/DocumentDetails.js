import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Button, withStyles} from 'material-ui';
import FileDownload from 'material-ui-icons/FileDownload';
import classNames from 'classnames';

import moment from 'moment';
import 'moment/locale/fr';

import { getDocument } from '../api';
import PdfPreview from './PdfPreview';
import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';

const styles = theme => ({
  floatRight: {
    float: 'right'
  },
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
  headline: {
    marginBottom: theme.spacing.unit * 2
  },
  stepper: {
    padding: 0,
    paddingBottom: theme.spacing.unit
  }
});

export class DocumentDetails extends Component {
  state = {
    document: null
  };

  imageTypes = ['jpg', 'jpeg', 'png', 'svg', 'bmp'];
  videoTypes = ['avi', 'mp4', 'wmv'];
  pdfTypes = ['pdf'];

  componentDidMount() {
    getDocument(this.props.match.params.id)
      .then(document => this.setState({ document }));
  }

  renderPreview() {
    const { document } = this.state;
    const ext = document.fileName.split('.').pop().toLowerCase();

    if (this.imageTypes.includes(ext))
      return <ImagePreview document={document} />;
    
    else if (this.pdfTypes.includes(ext))
      return <PdfPreview document={document} />
    
    else if (this.videoTypes.includes(ext))
      return <VideoPreview document={document} />
    
    else return null;
  }

  render() {
    const { classes } = this.props;
    const { document } = this.state;

    return this.state.document && (
      <div>
        <Button size="small" href={document.uri} target="_blank" variant="raised" color="secondary" className={classNames(classes.button, classes.floatRight)}>
          <FileDownload /> Télécharger le document
        </Button>
        <Typography variant="headline">
          { document.title }
        </Typography>
        <Typography variant="caption" className={classes.headline}>
            par { document.author.name } - { moment(document.creationTime).format('DD/MM/YYYY HH:mm') }
        </Typography>
        { this.renderPreview() }
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(DocumentDetails));
