import React from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import dirdNotFoundImage from '../assets/dirdnotfound.jpg';

function NotFound() {
    return (
      <div>
        <Typography variant="h4">
          This is a 404!
        </Typography>
          <img src={dirdNotFoundImage} alt="404 image" style={{width: "70vw"}} />
      </div>
    );
}

export default withRouter(NotFound);
