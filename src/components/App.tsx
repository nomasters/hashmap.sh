import * as React from 'react';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from "./Header";
import Poster from "./Poster";
import Getter from "./Getter";
import * as hashmap from 'hashmap-client';

// monkey patch for hrtime
process.hrtime = require('browser-process-hrtime')

hashmap.setServerURI('https://prototype.hashmap.sh')

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    display: 'flex',
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
        <Grid container className={classes.container} spacing={24}>
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