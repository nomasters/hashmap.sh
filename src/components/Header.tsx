import * as React from 'react';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    alignSelf: 'center',
    maxWidth: 155,
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'normal',
    marginTop: 0,
  },
});

interface Props extends WithStyles<typeof styles> {}

class Header extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <img src="../hashmap-logo.svg" alt="hashmap-logo" className={classes.logo} />
        <h1 className={classes.title} >hashmap</h1>
      </div>
    );
  }
}

export default withStyles(styles)(Header);