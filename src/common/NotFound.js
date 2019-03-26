import React from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

function NotFound() {
    return (
      <div>
        <Typography variant="h4">
          This is a 404 !
        </Typography>
      </div>
    );
}

export default withRouter(NotFound);
