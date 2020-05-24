import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Login from './Login';

export default class Weather extends React.Component {

  constructor() {
    super();
    this.state = {
      authToken: "",
    };

    this.onLoginComplete = this.onLoginComplete.bind(this);
    this.maybeRenderLoginPage = this.maybeRenderLoginPage.bind(this);
  }

  onLoginComplete(result) {

  }

  maybeRenderLoginPage() {
    if (this.state.authToken === "") {
      return (
        <Row>
          <Col lg={4} className="left">

            <Login onLoginComplete = {this.onLoginComplete} />

          </Col>

          <Col lg={8} className="right">
            <h3>Welcome to the Weather App!.</h3>
            <p>
              Please login/register to continue.
            </p>
          </Col>

        </Row>
      );
    }

    return null;
  }

  maybeRenderWeatherPage() {
    if (this.state.authToken !== "") {
      return (
        <div>
        </div>
      )
    }

    return null;
  }


  render() {
    return (
      <div className="Weather">
        {this.maybeRenderLoginPage()}
        {this.maybeRenderWeatherPage()}
      </div>
    );
  }
}
