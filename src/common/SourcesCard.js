import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

class SourcesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const { name, link } = this.props;
    return (
      <div>
        <div style={{ float: 'right', paddingLeft: '20px' }}>
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
};

export default SourcesCard;
