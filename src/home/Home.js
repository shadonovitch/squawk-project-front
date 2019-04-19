import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes, { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../redux/store';
import HeaderAppBar from '../common/HeaderAppBar';
import { fetchSources } from '../redux/actions';
import SourcesForm from '../common/SourcesForm';
import SourcesList from '../common/SourcesList';

/* const styles = {
  UserCard: {
    float: 'left',
  },
  Content: {
  },
}; */

class Home extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    let token = '';
    if (cookies.get('token') !== null) {
      token = cookies.get('token');
    }
    this.state = {
      token,
    };
  }

  componentDidMount() {
    const { token } = this.state;
    store.dispatch(fetchSources(token));
  }

  render() {
    const {
      token,
    } = this.state;
    const { sources } = this.props;
    if (token === undefined) {
      return (<Redirect to="/auth" />);
    }
    return (
      <div>
        <HeaderAppBar />
        <SourcesForm token={token} />
        <SourcesList sourcesArray={sources} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.profile.username,
    email: state.profile.email,
    sources: state.sources,
    loading: state.loading,
    error: state.error,
  };
}

Home.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  sources: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withCookies(connect(mapStateToProps)(Home));
