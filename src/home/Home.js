import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';


class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { cookies } = this.props;
    this.setState({
      token: cookies.get('token') || null,
    });
  }

  render() {
    const { token } = this.state;
    if (!token) {
      return (<Redirect to="/auth" />);
    }
    return (
      <div>
        <Typography variant="h2">
          {' '}
Token:
          {token}
        </Typography>
      </div>
    );
  }
}

Home.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Home);
