import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

interface Props {
  classes: {
    paper: string,
    paperHeader: string,
    message: string,
    container: string
  },
  message: string,
  handleChange: (name: string) => (event: any) => void,
}
class WriteMessageForm extends React.Component<Props> {
  render() {
    const { classes, handleChange, message } = this.props;
    return (
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
            value={message}
            className={classes.message}
            onChange={handleChange('message')}
            margin="normal"
            fullWidth={true}
            helperText="If message is larger than 512 bytes, it will be rejected"
            variant="outlined"
          />
        </ form>
      </Paper>
    );
  }
}

export default WriteMessageForm;