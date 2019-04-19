import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';

class SourcesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const {
      name, link, history, sourceID,
    } = this.props;
    return (
      <div>
        <div
          style={{ float: 'right', paddingLeft: '20px' }}
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
      </div>
    );
  }
}

SourcesCard.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  sourceID: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

export default withRouter(SourcesCard);
