import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import DirdLogo from '../DirdLogo.png';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar() {
  return (
    <div style={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" href="/">Home </Button>
          <Button color="inherit" href="/messenger"> Messages </Button>
          <img
            src={DirdLogo}
            alt="DirdLogo"
            style={{ maxWidth: '3%', height: 'auto', margin: 'auto' }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;
