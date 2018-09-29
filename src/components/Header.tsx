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
  primary: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: 0,
    fontSize: 24,
    maxWidth: 700,
    lineHeight: 1.5,
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
        <p className={classes.primary}>
          <a href='/server'>hashmap server</a> is a light-weight cryptographically signed public key value store inspired by <a href='/server'>JWT</a> and <a href='#'>IPNS</a>.
        </p>
        <p className={classes.primary}>
          This is a playground for interacting with a prototype of <a href='/server'>hashmap server</a> using the <a href='/server'>hashmap javascript client</a>.
        </p>
      </div>
    );
  }
}

export default withStyles(styles)(Header);