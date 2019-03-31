import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router';
import DirdLogo from '../DirdLogo.png';

const styles = ({
  auth: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '500px',
    height: '300px',
    backgroundColor: '#ccc',
    borderRadius: '3px',
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', password: '', handle: '', redirect: false,
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeHandle = this.handleChangeHandle.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeHandle(event) {
    this.setState({ handle: event.target.value });
  }

  handleSubmit(event) {
    const { email, password, handle } = this.state;
    const { cookies } = this.props;

    event.preventDefault();
    fetch('https://dirdapi.chaz.pro/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password, handle,
      }),
    }).then(response => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'failed') this.setState({ errorMessage: responseJson.message });
        else {
          cookies.set('token', responseJson.token);
          this.setState({ redirect: true });
        }
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  render() {
    const {
      email, password, handle, errorMessage, redirect,
    } = this.state;
    if (redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <img
          src={DirdLogo}
          alt="DirdLogo"
          style={{ maxWidth: '250px', height: '250px', margin: 'auto' }}
        />
        <div className="Auth" style={styles.auth}>
          <Typography variant="h4" gutterBottom>
          Dird Project
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
          Register
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField label="Handle" type="text" value={handle} onChange={this.handleChangeHandle} />
            <br />
            <TextField label="E-mail" type="text" value={email} onChange={this.handleChangeEmail} />
            <br />
            <TextField label="Password" type="password" value={password} onChange={this.handleChangePassword} />
            <br />
            <br />
            <Button variant="contained" color="secondary" type="submit">
            Submit
            </Button>
            <Button variant="contained" color="secondary" href="/auth">Login</Button>
          </form>
          { errorMessage && <Typography variant="h5">{errorMessage}</Typography>}
        </div>
      </div>
    );
  }
}

export default withCookies(Register);

Register.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};
