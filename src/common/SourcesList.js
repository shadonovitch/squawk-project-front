import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SourcesCard from './SourcesCard';

const styles = {
  SourcesList: {
    backgroundColor: '#5ac9dd',
    margin: 'auto',
    width: '50%',
  },
};

class SourcesList extends Component {
  componentDidMount() {
  }

  render() {
    const { sourcesArray } = this.props;
    if (sourcesArray === undefined) {
      return <div />;
    }
    return (
      <div style={styles.SourcesList}>
        <List>
          {sourcesArray.map(item => (
            <ListItem key={item.id}>
              <SourcesCard
                key={item.id}
                name={item.host}
                link={item.link}
                sourceID={item.source_id}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

SourcesList.propTypes = {
  sourcesArray: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    source_id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default SourcesList;
