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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginBottom: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

interface Props extends WithStyles<typeof styles> {}

class Getter extends React.Component<Props> {
	timer = null;

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	state = {
		payloadEndpoint: '',
		success: false,
		loading: false,
		endpointResponse: {},
		notificationMessage: '',
		value: 0,
		payloadMessage: '',
		payloadData: {},
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
		          notificationMessage: err,
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

  render() {
    const { classes } = this.props;
    const { loading, success, value } = this.state;
    return (
      <div className={classes.root}>
            <Typography gutterBottom variant="subheading" component="p">
              Get
            </Typography>
            <Paper className={classes.paper}>
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
		      <div className={classes.tabs}>
		        <AppBar position="static">
		          <Tabs value={value} onChange={this.handleValueChange}>
		            <Tab label="Message" />
		            <Tab label="Data" />
		            <Tab label="Payload" />
		          </Tabs>
		        </AppBar>
		        {value === 0 && <Typography component="div" style={{ padding: 8 * 3 }}>{this.state.payloadMessage}</Typography>}
		        {value === 1 && <Typography component="div" style={{ padding: 8 * 3 }}>{JSON.stringify(this.state.payloadData, null, 2)}</Typography>}
		        {value === 2 && <Typography component="div" style={{ padding: 8 * 3 }}>{JSON.stringify(this.state.endpointResponse, null, 2)}</Typography>}
		      </div>
            </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Getter);