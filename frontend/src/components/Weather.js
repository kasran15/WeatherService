import React from 'react';
import { Row, Col, Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import Login from './Login';

export default class Weather extends React.Component {

  constructor() {
    super();
    this.state = {
      authToken: null,
      cities: [],
      weatherInfo: null,
      currentCity: null,
      selectedCity: null,
      checkboxChecked: false,
    };

    this.newCity = React.createRef();
    this.currentCity = React.createRef();

    this.onLoginComplete = this.onLoginComplete.bind(this);
    this.maybeRenderLoginPage = this.maybeRenderLoginPage.bind(this);
    this.maybeRenderWeatherPage = this.maybeRenderWeatherPage.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.addCity = this.addCity.bind(this);
    this.cityClick = this.cityClick.bind(this);
    this.logout = this.logout.bind(this);
    this.handleCheckboxChecked = this.handleCheckboxChecked.bind(this);
  }

  handleCheckboxChecked(e) {
    this.setState({checkboxChecked: e.target.checked});
  }

  logout() {
    localStorage.removeItem('authToken');
    this.setState({ authToken: null });
  }

  cityClick(e) {
    const city = e.target.innerText;

    this.setState({
      selectedCity: city
    });

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
          this.setState({cities: result.cities, currentCity: result.currentCity});
        }
      })
      .catch((err) => {
        console.error(err);

        this.logout();
      });

    }
  }

  addCity() {
    const city = this.newCity.current.value;

    console.log(this.currentCity);

    fetch("/api/user/addCity", {
      method: "POST",
      headers: {
        "authorization": this.state.authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({city: city, currentCity: this.state.checkboxChecked}),

    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      if (result && result.cities) {
        this.setState({
          cities: result.cities,
          currentCity: result.currentCity,
        });
      }
    })
    .catch((err) => {
      this.logout();
    });;
  }

  removeCity(city) {

    fetch("/api/user/removeCity", {
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
          cities: result.cities,
          currentCity: result.currentCity,
        });
      }
    })
    .catch((err) => {
      this.logout();
    });;
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
    const {weatherInfo} = this.state;
    if (this.state.authToken !== "" && this.state.authToken != null ) {
      return (
        <Row>
          <Col lg={4} className="left">
            {
              this.state.cities.map(c => {
                return (
                  <Row><Col>
                    <Card key={c} bg={c==this.state.selectedCity ? "primary": "secondary"} text="white">
                      <Card.Body >
                      <Row><Col>
                        <Card.Text onClick={this.cityClick} style={{cursor: "pointer"}} >{c}</Card.Text>
                        <span>{this.state.currentCity == c ? "(Current)" : ""}</span>
                      </Col><Col lg="1">
                      <Button variant="danger" onClick={()=>this.removeCity(c)} >-</Button>
                      </Col>
                      </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  </Row>
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
                <InputGroup.Prepend>
                  <InputGroup.Checkbox
                    checked={this.state.checkboxChecked}
                    onChange={this.handleCheckboxChecked}
                    aria-label="Current Location" />
                </InputGroup.Prepend>
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
              <span style={{color: "#eee"}}>Click the checkbox to make this your current city.</span>
            </Col></Row>
            <br /><br />
            <Row><Col>
              <Button variant="danger" onClick={this.logout}>Logout</Button>
            </Col></Row>
          </Col>

          <Col lg={8} className="right">
            {
              !weatherInfo && (
                <h3>Add / Select a city to get started!</h3>
              )
            }

            {
              weatherInfo && (
                <Row className="weather-info"><Col>
                  <Row><Col>
                    <h2>Current Weather:</h2>
                    {this.renderCurrentWeather(this.state.weatherInfo.weather)}
                  </Col></Row>

                  <Row>
                    <Col>
                      <h2>7 Days Forecast:</h2>
                    </Col>
                  </Row>
                  <Row>

                  {
                    weatherInfo && weatherInfo.forecast &&
                    weatherInfo.forecast.list.map((w) => {
                      return (
                        <Col>
                          {this.renderCurrentWeather(w)}
                        </Col>
                      );
                    })
                  }

                  </Row>
                </Col></Row>
              )
            }
          </Col>

        </Row>
      )
    }

    return null;
  }

  renderCurrentWeather(weather) {

    if (!weather) {
      return null;
    }

    const { temp, temp_min, temp_max } = weather.main;
    const { main, description, icon } = weather.weather[0];


    return (
      <div className="weather-card">
        <Row className="logo-container">
          <Col lg="1">
          <img className="logo" src={"http://openweathermap.org/img/wn/" + icon + "@2x.png"} />
          </Col>
          <Col className="main">
            {main}
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="min-temp">Lo: {parseInt(temp_min)}</div>
          </Col>
          <Col>
            <div className="max-temp">Hi: {parseInt(temp_max)}</div>
          </Col>
        </Row>

        <Row><Col>
          <div  className="temp">{parseInt(temp)}&deg;F</div>
        </Col></Row>
      </div>
    )

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
