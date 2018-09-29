import * as React from 'react';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as hashmap from 'hashmap-client';

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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,

  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

interface Props extends WithStyles<typeof styles> {}

class Poster extends React.Component<Props> {
  
  state = {
    privateKey: '',
  };

  handleChange = (name: any) => (event: any) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleKeyGen = () => {
    let key = hashmap.genNaClSignPrivKey()
    console.log(key)
    this.setState({
      privateKey: key,
    }) ;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
            post
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
                      id="outlined-name"
                      label="Private Key"
                      className={classes.textField}
                      value={this.state.privateKey}
                      style ={{width: '100%'}}
                      onChange={this.handleChange('privateKey')}
                      margin="normal"
                    />
                  </ form>
            </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Poster);