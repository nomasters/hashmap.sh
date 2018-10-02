import * as React from 'react';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
          <a href='https://github.com/nomasters/hashmap'>hashmap server</a> is a light-weight cryptographically signed public key value store inspired by <a href='https://jwt.io/'>JWT</a> and <a href='https://docs.ipfs.io/guides/concepts/ipns/'>IPNS</a>.
        </p>
        <p className={classes.primary}>
          This is a playground for interacting with a prototype of hashmap server that lives at <a href='https://prototype.hashmap.sh/health'>prototype.hashmap.sh</a>. This site uses the <a href='https://www.npmjs.com/package/hashmap-client'>hashmap javascript client</a>.
        </p>
        <Typography gutterBottom variant="subheading" component="p" className={classes.title}>
          NOTE: This project is in early alpha. This code has not been audited or peer-reviewed and should be considered an experiment.
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Header);