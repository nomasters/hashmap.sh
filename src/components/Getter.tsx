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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/styles/hljs';

const styles = (theme: Theme) => createStyles({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }, 
  root: {
  },
  tabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  codeDiv: {
    minHeight: 100,
    fontSize: 'large',
    marginTop: 0,
    padding: 24,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  paperHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    textAlign: 'left',
    paddingLeft: 9,
    marginBottom: 24,
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
});

interface Props extends WithStyles<typeof styles> {
    endpoint: string;
}

class Getter extends React.Component<Props> {
    timer = null;

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    state = {
        payloadEndpoint: this.props.endpoint,
        success: false,
        loading: false,
        endpointResponse: {},
        open: false,
        notificationMessage: '',
        value: 0,
        payloadMessage: '',
        payloadData: {},
    }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.endpoint !== prevProps.endpoint) {
        this.setState({
          payloadEndpoint: this.props.endpoint,
          success: false,
        })
      }
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (name: any) => (event: any) => {
    this.setState({
      [name]: event.target.value,
    });
    };

    handleValueChange = (event: any, value: any) => {
        this.setState({ value });
    };

    urlWithEndpoint = () => {
      return 'https://prototype.hashmap.sh/' + this.state.payloadEndpoint
    }

    handleGetPayload = () => {
        if (!this.state.loading) {
          this.setState(
            {
              success: false,
              loading: true,
            },
            () => {
              let payload:any = new hashmap.Payload()
              payload.get(this.state.payloadEndpoint)
              .then(resp => {
                this.setState({
                  loading: false,
                  success: true,
                  notificationMessage: 'success',
                  open: true,
                  endpointResponse: resp,
                  payloadMessage: payload.getMessage(),
                  payloadData: payload.getData(),
                });
              })
              .catch(err => {
                this.setState({
                  loading: false,
                  success: false,
                  notificationMessage: 'not found',
                  open: true,
                  endpointResponse: {},
                  payloadMessage: '',
                  payloadData: {},
                });
              })
              this.timer = setTimeout(() => {
                if (this.state.loading) {
                  this.setState({
                    loading: false,
                    success: false,
                    open: true,
                    notificationMessage: 'timeout reached, please try again.',
                    endpointResponse: {},
                    payloadMessage: '',
                    payloadData: {},
                  });
                }
              }, 4000);
            },
          );
        }
    }

  render() {
    const { classes } = this.props;
    const { loading, success, value } = this.state;

    return (
      <div className={classes.root}>
            <Typography gutterBottom variant="subheading" component="p">
              Get
            </Typography>
            <Paper className={classes.paper}>
                <div className={classes.paperHeader}>
                    <Typography gutterBottom variant="headline" component="h2">
                      Request a Payload by Multihash
                    </Typography>                  
                    <Typography gutterBottom variant="subheading" component="h3" color='textSecondary'>
                      Valid payload values are stored in hashmap in the same form they are submitted. This allows both the client and the server to analyze the payload for integrity. The key for a payload is the blake2b-256 multihash of its ed25519 public key.
                    </Typography>
                </div>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                      id="outlined-get-payload"
                      label="Payload Endpoint Multihash"
                      className={classes.textField}
                      value={this.state.payloadEndpoint}
                      fullWidth={true}
                      onChange={this.handleChange('payloadEndpoint')}
                      margin="normal"
                      variant="outlined"
                    />
                </ form>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleGetPayload}
                    disabled={loading}
                >
                Get Payload
                </Button>
                {loading && <CircularProgress size={24} />}
            </Paper>
            <Paper className={classes.paper}>
                <div className={classes.paperHeader}>
                    <Typography gutterBottom variant="headline" component="h2">
                      Inspect the Payload
                    </Typography>                  
                    <Typography gutterBottom variant="subheading" component="h3" color='textSecondary'>
                      A valid payload contains a json object with keys for data, signatue, and pubkey with each of their values base64 encoded. 
                      Once decoded, data is itself a json object that contains a base64 encoded message as well as the metadata such as timestamp, sigMethod, version, and ttl.
                      Message can be any valid base64 encoded bytes, this isn't restricted to only string output, though string output is assumed for this playground demonstration.
                    </Typography>
                </div>
              <div className={classes.tabs}>
                <AppBar position="static" color="default">
                  <Tabs value={value} onChange={this.handleValueChange}>
                    <Tab label="Message" />
                    <Tab label="Data" />
                    <Tab label="Payload" />
                  </Tabs>
                </AppBar>
                {value === 0 && <SyntaxHighlighter className={classes.codeDiv} language='json' style={tomorrowNightEighties} customStyle={{ padding: 24 }}>{this.state.payloadMessage}</SyntaxHighlighter>}
                {value === 1 && <SyntaxHighlighter className={classes.codeDiv} language='json' style={tomorrowNightEighties} customStyle={{ padding: 24 }}>{JSON.stringify(this.state.payloadData, null, 2)}</SyntaxHighlighter>}
                {value === 2 && <SyntaxHighlighter className={classes.codeDiv} language='json' style={tomorrowNightEighties} customStyle={{ padding: 24 }}>{JSON.stringify(this.state.endpointResponse, null, 2)}</SyntaxHighlighter>}
              </div>
              <Typography gutterBottom variant="subheading" component="h3" color='textSecondary' style={{ visibility: this.state.success ? 'visible' : 'hidden' }} >
                View the raw json payload at: <a href={this.urlWithEndpoint()}>{this.urlWithEndpoint()}</a>
              </Typography>
            </Paper>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'get-message-id',
              }}
              message={<span id="get-message-id">{this.state.notificationMessage}</span>}
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

export default withStyles(styles)(Getter);