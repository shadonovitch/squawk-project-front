import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Cookies, withCookies } from 'react-cookie';
import { fetchSources } from '../redux/actions';
import store from '../redux/store';

class SourcesCard extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    let token = '';
    if (cookies.get('token') !== null) {
      token = cookies.get('token');
    }
    this.state = {
      token,
    };
  }

  componentDidMount() {
  }

  render() {
    const {
      name, link, history, sourceID,
    } = this.props;
    const {
      token,
    } = this.state;
    return (
      <div>
        <div
          style={{ float: 'left', paddingLeft: '20px', margin: 'auto' }}
          aria-hidden
          onClick={() => history.push(`/${sourceID}`)}
        >
          <Typography>
            {name}
          </Typography>
          <Typography>
            {link}
          </Typography>
        </div>
        <div style={{ float: 'right', margin: 'auto', width: 'auto' }}>
          <IconButton
            aria-label="Delete"
            onClick={() => {
              fetch(`https://squawkapi.chaz.pro/source/${sourceID}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }).then(() => store.dispatch(fetchSources(token)));
            }
                  }
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

SourcesCard.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  sourceID: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withRouter(withCookies(SourcesCard));
