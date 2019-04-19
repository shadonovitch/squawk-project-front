import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';

const styles = {
  ContentItem: {
    padding: '20px',
  },
  title: {
    paddingBottom: '3%',
  },
};

const ContentItem = (props) => {
  const {
    title, link, description,
  } = props;
  return (
    <div style={styles.ContentItem}>
      <a href={link} style={{ textDecoration: 'none' }}>
        <Typography variant="h5" style={styles.title}>{title}</Typography>
        <Typography variant="body1">{description}</Typography>
      </a>
    </div>
  );
};

ContentItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default withRouter(ContentItem);
