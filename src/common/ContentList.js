import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import uniqueid from 'uniqid';

import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import ContentItem from './ContentItem';

const styles = {
  ContentList: {
    backgroundColor: '#5ac9dd',
    margin: 'auto',
    width: '50%',
  },
};

class ContentList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { content } = this.props;
    if (content === undefined) {
      return <div />;
    }
    return (
      <div style={styles.ContentList}>
        <List>
          {content.map(item => (
            <div>
              <ListItem key={uniqueid()}>
                <ContentItem
                  key={uniqueid()}
                  title={item.title}
                  link={item.link}
                  description={item.description}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    );
  }
}

ContentList.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

export default ContentList;
