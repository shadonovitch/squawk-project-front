import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { DirdProvider } from '../common/DirdContext';
import store from '../redux/store';
import { fetchProfile } from '../redux/actions';


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


class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', password: '', redirect: false,
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    const { cookies } = this.props;
    event.preventDefault();
    fetch('https://dirdapi.chaz.pro/auth/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password,
      }),
    }).then(response => response.json())
      .then((responseJson) => {
        cookies.set('token', responseJson.token);
        store.dispatch(fetchProfile(responseJson.token));
        this.setState({ redirect: true });
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  render() {
    const {
      email, password, errorMessage, redirect,
    } = this.state;
    if (redirect === true) {
      return (<Redirect to="/" />);
    }
    return (
      <div className="Auth" style={styles.auth}>
        <Typography variant="h4" gutterBottom>
          Dird Project
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Auth
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField label="E-mail" type="text" value={email} onChange={this.handleChangeEmail} />
          <br />
          <TextField label="Password" type="password" value={password} onChange={this.handleChangePassword} />
          <br />
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </form>
        { errorMessage && <Typography variant="h5">{errorMessage}</Typography>}
      </div>
    );
  }
}

export default withCookies(Authentication);

Authentication.contextType = DirdProvider;

Authentication.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};
