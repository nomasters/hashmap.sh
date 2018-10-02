import * as React from 'react';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as hashmap from 'hashmap-client';
import Slider from '@material-ui/lab/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

  // ttlSeconds correlates to the SliderValue for index
const ttlSeconds = [
    15, 
    30, 
    60, 
    900, 
    1800, 
    3600,
    7200,
  ]
  // ttlReadable correlates to the SliderValue for index
const ttlReadable = [
    '15 seconds',
    '30 seconds',
    '1 minutes',
    '15 minutes',
    '30 minutes',
    '1 hour',
    '2 hours',
  ]

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
    ttl: ttlSeconds[3],
    ttlSliderValue: 3,
    ttlDisplayValue: ttlReadable[3],
    message: '',
    open: false,
    notificationMessage: '',
  };

  handleChange = (name: any) => (event: any) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleKeyGen = () => {
    let key = hashmap.genNaClSignPrivKey()
    this.setState({
      privateKey: key,
    }) ;
  };

  handleTTLChange = (event: any, ttlSliderValue: any) => {
    this.setState({ 
      ttlSliderValue: ttlSliderValue,
      ttl: ttlSeconds[ttlSliderValue],
      ttlDisplayValue: ttlReadable[ttlSliderValue],
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
    const { loading, success } = this.state;
    const { classes } = this.props;
    const { ttlSliderValue } = this.state;
    const { ttlDisplayValue } = this.state;

    return (
      <div className={classes.root}>
            <Typography gutterBottom variant="subheading" component="p">
              Post
            </Typography>
            <Paper className={classes.paper}>
              <div className={classes.paperHeader}>
                <Typography gutterBottom variant="headline" component="h2">
                  Configure a Private Key
                </Typography>                  
                <Typography gutterBottom variant="subheading" component="h3" color='textSecondary'>
                  To post to hashmap server, generate or paste a base64 encoded ed25519 private key. This private key is used to sign the submitted data. The public key derived from this private key is also submitted in the paylod.
                </Typography>
              </div>
              <form className={classes.container} noValidate autoComplete="off">
                <Button 
                  variant="outlined" 
                  color="primary" 
                  className={classes.button}
                  onClick={this.handleKeyGen}
                >Generate Private Key</Button>
                <TextField
                  id="outlined-private-key"
                  label="Private Key"
                  className={classes.textField}
                  value={this.state.privateKey}
                  fullWidth={true}
                  onChange={this.handleChange('privateKey')}
                  margin="normal"
                  variant="outlined"
                />
              </ form>
            </Paper>
            <Paper className={classes.paper}>
              <div className={classes.paperHeader}>
                <Typography gutterBottom variant="headline" component="h2">
                  Set a TTL
                </Typography>                  
                <Typography gutterBottom variant="subheading" component="h3" color='textSecondary'>
                  Key-value pairs on hashmap server are ephemeral. A submitted payload allows a TTL expressed in seconds with a value between 0 and 604800 (one week). This playground allows values between 15 seconds and two hours. 
                </Typography>
              </div>
              <div className={classes.slider}>
                <Typography gutterBottom variant="subheading" component="p">
                  ttl: {ttlDisplayValue}
                </Typography>
                <Slider value={ttlSliderValue} min={0} max={6} step={1} onChange={this.handleTTLChange}/>
              </div>
            </Paper>
            <Paper className={classes.paper}>
              <div className={classes.paperHeader}>
                <Typography gutterBottom variant="headline" component="h2">
                  Write a Message
                </Typography>                  
                <Typography gutterBottom variant="subheading" component="h3" color='textSecondary'>
                  Your message is submitted as part of the signed data in a submission payload. Hashmap server restricts the submitted message to be no larger than 512 bytes.
                </Typography> 
              </div>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Message"
                  multiline
                  rowsMax="6"
                  value={this.state.message}
                  className={classes.message}
                  onChange={this.handleChange('message')}
                  margin="normal"
                  fullWidth={true}
                  helperText="If message is larger than 512 bytes, it will be rejected"
                  variant="outlined"
                />
              </ form>
            </Paper>
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