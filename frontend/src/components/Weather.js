import React from 'react';
import { Row, Col, Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import Login from './Login';

export default class Weather extends React.Component {

  constructor() {
    super();
    this.state = {
      authToken: "",
      cities: [],
      weatherInfo: null,
      currentCity: null,
      selectedCity: null,
    };

    this.newCity = React.createRef();

    this.onLoginComplete = this.onLoginComplete.bind(this);
    this.maybeRenderLoginPage = this.maybeRenderLoginPage.bind(this);
    this.maybeRenderWeatherPage = this.maybeRenderWeatherPage.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.addCity = this.addCity.bind(this);
    this.cityClick = this.cityClick.bind(this);
  }

  cityClick(e) {
    const city = e.target.innerText;

    this.getWeather(city);
  }

  componentDidMount() {
    console.log("component mount", !this.state.authToken);
    if (!this.state.authToken) {
      let authToken = localStorage.getItem("authToken");

      console.log("Get token from localstorage", authToken);

      if (authToken) {
        this.onLoginComplete(authToken);
      }
    }
  }

  getWeather(city) {
    fetch("/api/weather/" + city, {
      headers: {
        "authorization": this.state.authToken,
      }
    })
    .then(res => res.json())
    .then((result) => {
      if (result) {
        console.log("weather info", result);
        this.setState({ weatherInfo: result });
      }
    })
    .catch((err) => {
      this.setState({
        authToken: "",
      })
    });

  }

  onLoginComplete(auth) {
    if (auth) {
      this.setState({ authToken: auth });
      localStorage.setItem('authToken', auth);


      fetch("/api/user", {
        headers: {
          "authorization": auth,
        }
      })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        if (result && result.cities) {
          this.setState({cities: result.cities});
        }
      });

    }
  }

  addCity() {
    const city = this.newCity.current.value;

    fetch("/api/user/addCity", {
      method: "POST",
      headers: {
        "authorization": this.state.authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({city: city}),

    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      if (result && result.cities) {
        this.setState({
          cities: result.cities
        });
      }
    });
  }

  maybeRenderLoginPage() {
    if (this.state.authToken === "" || this.state.authToken == null) {
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
        <Row>
          <Col lg={4} className="left">
            {
              this.state.cities.map(c => {
                return (
                  <Row><Col>
                    <Card  bg="secondary" text="white">
                      <Card.Body onClick={this.cityClick}>{c}</Card.Body>
                    </Card>
                  </Col></Row>
                );
              })
            }

            {
              (!this.state.cities || this.state.cities.length === 0) && (
                <Row><Col>
                  <Card bg="secondary" text="white">
                    <Card.Body>No cities added.</Card.Body>
                  </Card>
                </Col></Row>
              )
            }
            <br /><br />
            <Row><Col>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Add a city."
                  aria-label="e.g. San Francisco"
                  aria-describedby="basic-addon2"
                  ref={this.newCity}
                />
                <InputGroup.Append>
                  <Button onClick={this.addCity} variant="outline-primary">Add</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col></Row>
          </Col>

          <Col lg={8} className="right">
            <h3>Add / Select a city to get started!</h3>
          </Col>

        </Row>
      )
    }

    return null;
  }

  renderCurrentWeather() {
    const { weather } = this.state.weatherInfo;

    if (!weather) {
      return null;
    }

    
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
