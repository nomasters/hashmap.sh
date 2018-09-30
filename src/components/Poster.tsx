import * as React from 'react';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as hashmap from 'hashmap-client';
import Slider from '@material-ui/lab/Slider';

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

interface Props extends WithStyles<typeof styles> {}

class Poster extends React.Component<Props> {
  
  state = {
    privateKey: '',
    ttl: ttlSeconds[3],
    ttlSliderValue: 3,
    ttlDisplayValue: ttlReadable[3],
    message: '',
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
    let opts = {
      ttl: this.state.ttl
    }
    let message = this.state.message
    let key = this.state.privateKey
    let payload:any = new hashmap.Payload()
    payload.generate(key, message, opts)
    payload.post()
    .then(resp => {
      console.log(resp)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const { classes } = this.props;
    const { ttlSliderValue } = this.state;
    const { ttlDisplayValue } = this.state;
    return (
      <div className={classes.root}>
            <Typography gutterBottom variant="subheading" component="p">
              Post
            </Typography>
            <Paper className={classes.paper}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleKeyGen}
                  >
                    Generate Private Key
                  </Button>
                  <form className={classes.container} noValidate autoComplete="off">
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
                  <div className={classes.slider}>
                    <Typography gutterBottom variant="headline" component="p">
                      TTL
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                      {ttlDisplayValue}
                    </Typography>
                    <Slider value={ttlSliderValue} min={0} max={6} step={1} onChange={this.handleTTLChange}/>
                  </div>
            </Paper>
            <Paper className={classes.paper}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Message"
                  multiline
                  rowsMax="6"
                  value={this.state.message}
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
              onClick={this.handlePostSubmit}
            >
              Sign and Submit
            </Button>  
      </div>
    );
  }
}

export default withStyles(styles)(Poster);