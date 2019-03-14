import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', password: '', handle: '', token: '',
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeHandle = this.handleChangeHandle.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeHandle(event) {
    this.setState({ handle: event.target.value });
  }

  handleSubmit(event) {
    const { email, password, handle } = this.state;
    event.preventDefault();
    fetch('https://dirdapi.chaz.pro/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password, handle,
      }),
    }).then(response => response.json())
      .then((responseJson) => {
        this.setState({ token: responseJson.token });
      })
      .catch(error => this.setState({ token: error.message }));
  }

  render() {
    const {
      email, password, handle, token,
    } = this.state;

    return (
      <div className="Auth">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="filterAll">
            Handle:
            <input type="text" value={handle} onChange={this.handleChangeHandle} />
          </label>
          <label htmlFor="filterAll">
            Email:
            <input type="text" value={email} onChange={this.handleChangeEmail} />
          </label>
          <label htmlFor="filterAll">
            Password:
            <input type="text" value={password} onChange={this.handleChangePassword} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>
          Token:
          { token }
        </p>
      </div>
    );
  }
}
