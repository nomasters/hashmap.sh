import * as React from 'react';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

interface Props extends WithStyles<typeof styles> {}

class Getter extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
            get
            <Paper className={classes.paper}>stuff goes here</Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Getter);