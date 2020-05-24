import React from 'react';
import { Button, ToggleButton, ToggleButtonGroup, Row, Col, Form } from 'react-bootstrap';

export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      loginMode: "Login",
      email: "",
      password: "",
    };

    this.toggleChange = this.toggleChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  toggleChange(val) {
    this.setState({loginMode: val});
  }

  emailChange(e) {
    this.setState({email: e.target.value})
  }

  passwordChange(e) {
    this.setState({password: e.target.value});
  }

  submitForm(e) {
    console.log("submitting form", this.state);

    var url = "/api/user/login";
    const { loginMode, email, password } = this.state;

    if (loginMode !== 'login') {
      url = "/api/user/create";
    }

    console.log(JSON.stringify({ email, password }));

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    .then(res => res.json())
    .then((result) => {
      if (result.error) {

      } else {
        // continue to app

        if (this.props.onLoginComplete && typeof this.props.onLoginComplete === "function") {
          this.props.onLoginComplete(result);
        }
      }
    });
  }


  render() {
    return (
      <Row className="login">
        <Col>
          <Row>
            <Col>
              <ToggleButtonGroup onChange={this.toggleChange} name="login-mode" type="radio" defaultValue={"Login"}>
                <ToggleButton value="Login">
                  Login
                </ToggleButton>

                <ToggleButton value="Register">
                  Register
                </ToggleButton>

              </ToggleButtonGroup>
            </Col>
          </Row>
          <br /><br />
          <Row>
            <Col>
              <Form onSubmit={this.submitForm} ref={this.props.loginForm}>
                <Form.Group controlId="login">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control value={this.state.email} onChange={this.emailChange} type="email" placeholder="Email Address" required/>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="password" required>
                  <Form.Label>Password</Form.Label>
                  <Form.Control value={this.state.password} onChange={this.passwordChange} type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  <span>{this.state.loginMode}</span>
                </Button>
              </Form>

            </Col>
          </Row>
          <br /><br />
          <Row>
            <Col>

            </Col>
          </Row>

        </Col>
      </Row>
    );
  }



}
