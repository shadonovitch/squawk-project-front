import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';


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
  }

  render() {
    const { token, handle, email } = this.state;
    if (!token) {
      return (<Redirect to="/auth" />);
    }
    return (
      <div>
        <Typography variant="h2">
          {' '}
Infos:
          {token}
          {handle}
          {email}
        </Typography>
      </div>
    );
  }
}

Home.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Home);
