import React from 'react';
import { Alert, Button, ToggleButton, ToggleButtonGroup, Row, Col, Form } from 'react-bootstrap';

export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      loginMode: "Login",
      email: "",
      password: "",
      error: null,
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
    e.preventDefault();

    this.setState({ error: null });

    var url = "/login";
    const { loginMode, email, password } = this.state;

    if (loginMode !== 'Login') {
      url = "/api/user/create";
    }


    if (loginMode === "Login") {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
          "authorization": "",
        },
      })
      .then((result) => {
        const auth = result.headers.get("authorization");
        if (result.status === 403) {
          this.setState({error: {
           variant: "warning",
           text: "Invalid login/password. Please try again.",
          }});
        } else if (auth) {
          // continue to app
          if (this.props.onLoginComplete && typeof this.props.onLoginComplete === "function") {
            this.props.onLoginComplete(auth);
          }
        } else {
          // Should never come here. But just in case.
          this.setState({error: {
           variant: "warning",
           text: "Something went wrong. Please try again later.",
          }});
        }
      });

    } else {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => res.json())
      .then((result) => {
        console.log(result);

        if (result.error.length === 0) {
          this.setState({error: {
           variant: "info",
           text: "Account created successfully",
          }});
        } else {
          this.setState({
            error: {
              variant: "warning",
              text: result.error.join(", "),
            }
          });
        }
      });

    }
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
              {
                this.state.error &&
                <Alert variant={this.state.error.variant} show={this.state.error != null}>
                  {this.state.error.text}
                </Alert>
              }
            </Col>
          </Row>

        </Col>
      </Row>
    );
  }



}
