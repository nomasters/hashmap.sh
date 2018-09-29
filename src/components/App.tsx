import * as React from 'react';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from "./Header";
import Poster from "./Poster";
import Getter from "./Getter";

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    display: 'flex',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    maxWidth: 1200,
  }
});

interface Props extends WithStyles<typeof styles> {}

class App extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.container} spacing={16}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Poster />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Getter />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);