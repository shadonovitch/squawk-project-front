import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import uniqueid from 'uniqid';
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
            <ListItem key={uniqueid()}>
              <SourcesCard
                key={uniqueid()}
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
  sourcesArray: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SourcesList;
