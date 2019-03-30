import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import DefaultPicture from '../DefaultUser.png';

class WoofCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
    };
  }

  componentDidMount() {
    const { handle } = this.props;
    fetch(`https://dirdapi.chaz.pro/${handle}/picture`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        const { pictureB64 } = responseJson;
        this.setState({ picture: pictureB64 });
      });
  }

  userImage() {
    const { picture } = this.state;
    if (picture) {
      return (
        <img
          src={`data:image/jpeg;base64,${picture}`}
          alt="ProfilePicture"
          style={{ width: '50px', height: '50px' }}
        />
      );
    }
    return (
      <img
        src={DefaultPicture}
        style={{ width: '50px', height: '50px' }}
        alt="UserPicture"
      />
    );
  }


  render() {
    const { handle, txt } = this.props;
    return (
      <div>
        <div style={{ float: 'left' }}>
          {this.userImage()}
        </div>
        <div style={{ float: 'right', paddingLeft: '20px' }}>
          <Typography>
            @
            {handle}
          </Typography>
          <Typography>
            {txt}
          </Typography>
        </div>
      </div>
    );
  }
}

WoofCard.propTypes = {
  handle: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
};

export default WoofCard;
