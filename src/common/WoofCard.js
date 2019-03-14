import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const WoofCard = (props) => {
  const { handle, txt } = props;
  return (
    <div>
      <Typography variant="h3">
        {handle}
      </Typography>
      <Typography variant="p">
        {txt}
      </Typography>
    </div>
  );
};

WoofCard.propTypes = {
  handle: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
};

export default WoofCard;
