import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import HeaderAppBar from './HeaderAppBar';
import ContentList from './ContentList';

class SourceView extends Component {
  constructor(props) {
    super(props);
    const { sourceid } = props.match.params;
    const { cookies } = props;
    this.state = {
      sourceid,
      token: cookies.get('token') || undefined,
      contentArray: [],
    };
  }

  componentDidMount() {
    const { sourceid, token } = this.state;
    const { history } = this.props;

    fetch(`https://squawkapi.chaz.pro/source/${sourceid}/content`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status === 404) history.push('/404');
      if (response.status === 422) throw new Error('Malformed content found at source target.');
      return response.json();
    })
      .then((responseJson) => {
        this.setState({ contentArray: responseJson.content });
      }).catch(error => this.setState({ errorMessage: error.toString() }));
  }

  render() {
    const { errorMessage, contentArray } = this.state;
    return (
      <div>
        <HeaderAppBar />
        {errorMessage && <p style={{ color: 'darkred' }}>{errorMessage}</p>}
        { contentArray.length > 0 && <ContentList content={contentArray} /> }
      </div>
    );
  }
}

SourceView.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      sourceid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withCookies(withRouter(SourceView));
