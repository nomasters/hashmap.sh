import * as React from 'react';
import * as hashmap from 'hashmap-client';

// styles import from material ui
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// component imports
import ConfigureKeyForm from './post/configureKeyForm';
import SetTTLForm from './post/setTtlForm';
import WriteMessageForm from './post/writeMessageForm';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  slider: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    textAlign: 'left',
    paddingLeft: 9,
    paddingRight: 20,
  },
  paperHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    textAlign: 'left',
    paddingLeft: 9,
    marginBottom: 24,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginBottom: 24,
    paddingBottom: 24, 
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
  message: {
    paddingRight: 36,
    marginLeft: 6,
  },
});

interface Props extends WithStyles<typeof styles> {
  callbackFromParent: any
}

class Poster extends React.Component<Props> {
  timer = null;
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  state = {
    loading: false,
    success: false,
    privateKey: '',
    ttl: null,
    message: '',
    open: false,
    notificationMessage: '',
  };

  handleChange = (name: string) => (event: any) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleKeyGen = ():void => {
    let key = hashmap.genNaClSignPrivKey()
    this.setState({
      privateKey: key,
    }) ;
  };

  handleTTLChange = (event: React.ChangeEvent, ttlValue: number) => {
    this.setState({ 
      ttl: ttlValue,
    });
  };

  handlePostSubmit = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          let opts = {
            ttl: this.state.ttl
          }
          let message = this.state.message
          let key = this.state.privateKey
          let payload:any = new hashmap.Payload()
          try {
            payload.generate(key, message, opts)
          }
          catch(err) {
            this.setState({
              loading: false,
              success: false,
              notificationMessage: err.message,
              open: true,
            });
            return       
          }
          payload.post()
          .then(resp => {
            this.props.callbackFromParent('');
            this.setState({
              loading: false,
              success: true,
              notificationMessage: 'successfully posted to: ' + resp.endpoint,
              open: true,
            });
            if (resp.endpoint) {
              this.props.callbackFromParent(resp.endpoint);
            }
          })
          .catch(err => {
            this.setState({
              loading: false,
              success: false,
              notificationMessage: err.message,
              open: true,
            });
          })
          this.timer = setTimeout(() => {
            if (this.state.loading) {
              this.setState({
                loading: false,
                success: false,
                open: true,
                notificationMessage: 'timeout reached, please try again.',
              });
            }
          }, 4000);
        },
      );
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { loading, success, message } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ConfigureKeyForm 
          classes={classes}
          handleKeyGen={this.handleKeyGen}
          handleChange={this.handleChange}
          privateKey={this.state.privateKey}
        />
        <SetTTLForm 
          classes={classes}
          handleTTLChange={this.handleTTLChange}
        />
        <WriteMessageForm 
          classes={classes}
          message={message}
          handleChange={this.handleChange}
        />         
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          disabled={loading}
          onClick={this.handlePostSubmit}
        >
          Sign and Submit
        </Button>

        {loading && <CircularProgress size={24} />}

        {/* 
         **  Notification Message
        */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'post-message-id',
          }}
          message={<span id="post-message-id">{this.state.notificationMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Poster);