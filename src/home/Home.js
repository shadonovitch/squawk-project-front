import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import WoofForm from '../common/WoofForm';

const styles = {
  UserCard: {
    float: 'left',
  },
  Content: {
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token') || null,
      handle: '',
      email: '',
    };
  }

  componentDidMount() {
    const { token } = this.state;
    fetch('https://dirdapi.chaz.pro/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        const { handle, email } = responseJson;
        this.setState({
          handle, email,
        });
      });
    /* Fix backend image -- base64 ? */
    /* fetch('https://dirdapi.chaz.pro/profile/picture', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(((response) => {
      this.setState({ picture: response.picture });
    })); */
  }

  render() {
    const {
      token, handle, email,
    } = this.state;
    if (!token) {
      return (<Redirect to="/auth" />);
    }
    return (
      <div>
        <div style={styles.UserCard}>
          <Typography variant="h5">
            {' '}
            {'@'}
            {' '}
            {handle}
            <br />
            {email}
          </Typography>

        </div>
        <div style={styles.Content}>
          <WoofForm token={token} />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Home);
