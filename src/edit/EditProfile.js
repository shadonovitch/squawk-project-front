import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { Redirect } from 'react-router';
import HeaderAppBar from '../common/HeaderAppBar';
import { fetchProfile, fetchProfilePicture } from '../redux/actions';
import store from '../redux/store';
import DefaultPicture from '../DefaultUser.png';

const styles = {
  container: {
    margin: 'auto',
  },
  button: {
  },
};
class EditProfile extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token') || null,
      newEmail: '',
      newHandle: '',
      redirect: false,
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeHandle = this.handleChangeHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { token } = this.state;
    store.dispatch(fetchProfile(token));
    store.dispatch(fetchProfilePicture(token));
  }

  handleChangeEmail(event) {
    this.setState({ newEmail: event.target.value });
  }

  handleChangeHandle(event) {
    this.setState({ newHandle: event.target.value });
  }

  handleSubmit(event) {
    const { newEmail, newHandle, token } = this.state;

    event.preventDefault();
    if (newEmail === '' || newHandle === '') {
      this.setState({ errorMessage: 'Email and handle must be provided.' });
      return;
    }
    fetch('https://dirdapi.chaz.pro/profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: newEmail,
        handle: newHandle,
      }),
    }).then(response => response.json())
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  userImage() {
    const { pictureB64 } = this.props;
    if (pictureB64) {
      return (
        <img
          src={`data:image/jpeg;base64,${pictureB64}`}
          alt="ProfilePicture"
          style={{ width: '200px', height: '200px' }}
        />
      );
    }
    return (
      <img
        src={DefaultPicture}
        style={{ width: '200px', height: '200px' }}
        alt="UserPicture"
      />
    );
  }

  render() {
    const {
      handle, email,
    } = this.props;
    const {
      newEmail, newHandle, redirect, errorMessage,
    } = this.state;
    if (redirect === true) {
      return (<Redirect to="/" />);
    }
    return (
      <div>
        <HeaderAppBar />
        <div style={styles.container}>
          {errorMessage && <p style={{ color: 'darkred' }}>{errorMessage}</p>}
          {this.userImage()}
          <br />
          <input
            accept="image/jpeg"
            type="file"
          />
          <br />
          <Button variant="contained" component="span" className={styles.button}>
            Edit Picture
          </Button>
          <br />
          <form onSubmit={this.handleSubmit}>
            <TextField label="Handle" type="text" placeholder={handle} value={newHandle} onChange={this.handleChangeHandle} />
            <br />
            <TextField label="Email" type="text" placeholder={email} value={newEmail} onChange={this.handleChangeEmail} />
            <br />
            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
          </form>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    handle: state.profile.handle,
    email: state.profile.email,
    pictureB64: state.pictureB64,
    loading: state.loading,
    error: state.error,
  };
}

EditProfile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  handle: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  pictureB64: PropTypes.string.isRequired,
};

export default withCookies(connect(mapStateToProps)(EditProfile));
