import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import store from '../redux/store';
import { fetchSources } from '../redux/actions';

const styles = {
  WoofForm: {
    backgroundColor: '#5b85cc',
    margin: 'auto',
    width: '50%',
  },
};

class SourcesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      link: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeLink(event) {
    this.setState({ link: event.target.value });
  }

  handleSubmit(event) {
    const { name, link } = this.state;
    const { token } = this.props;
    event.preventDefault();
    fetch('https://squawkapi.chaz.pro/source', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, link,
      }),
    }).then(() => {
      store.dispatch(fetchSources(token));
    });
  }

  render() {
    const { name, link } = this.state;
    return (
      <div style={styles.WoofForm}>
        <p> Squawk Source Form : </p>
        <form onSubmit={this.handleSubmit}>
          <TextField label="Name" type="text" value={name} onChange={this.handleChangeName} />
          <br />
          <TextField label="Link" type="text" value={link} onChange={this.handleChangeLink} />
          <br />
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

SourcesForm.propTypes = {
  token: PropTypes.string.isRequired,
};

export default SourcesForm;
