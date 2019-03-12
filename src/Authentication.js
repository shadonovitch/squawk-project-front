import React, { Component } from 'react';

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    console.log(event, email, password);
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="Auth">
        <form onSubmit={this.handleSubmit}>
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
      </div>
    );
  }
}
