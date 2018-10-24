import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

interface Props {
  classes: {
    paper: string,
    paperHeader: string,
    container: string,
    button: string,
    textField: string
  },
  handleKeyGen: ()=>void,
  privateKey: string,
  handleChange: (name: string) => (event: any) => void
}
class ConfigureKeyForm extends React.Component<Props> {

  render() {
    const { classes, handleKeyGen, privateKey, handleChange } = this.props;
    return (
      <>
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
              onClick={() => handleKeyGen()}
            >
              Generate Private Key
            </Button>
            <TextField
              id="outlined-private-key"
              label="Private Key"
              className={classes.textField}
              value={privateKey}
              fullWidth={true}
              onChange={handleChange('privateKey')}
              margin="normal"
              variant="outlined"
            />
          </ form>
        </Paper>
      </>
    );
  }
}

export default ConfigureKeyForm;