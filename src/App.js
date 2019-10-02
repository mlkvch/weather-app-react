import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import {Table} from "react-bootstrap";
import LineChart, { parseFlatArray } from 'react-linechart';


class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherDate: null,
      gtmData: null
    };
  }

  componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const URL = "https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1";

    fetch (proxyurl + URL).then(res => res.json()).then(json => {
      this.setState({ weatherDate: json.list});
    });
  }

  render() {
    const weatherDate = this.state.weatherDate;
    if(!weatherDate) return  <div><h1>loading</h1></div>

    const chartWeatherDate = weatherDate.map(key => {
      return key.main;
    });

    const chartWeatherDateFlat = parseFlatArray(chartWeatherDate, "grnd_level", ["humidity", "pressure", "sea_level", "temp", "temp_kf", "temp_max" ,"temp_min"]);

    return (
      <div>
        <h1>Weather LineChart</h1>
        <LineChart
            width={800}
            height={500}
            showLegends
            legendPosition="bottom-right"
            onPointHover={(obj) => `grnd_level: ${obj.x}`}
            data={chartWeatherDateFlat}
        />

        <Table striped bordered hover variant="dark" size="sm">
          <thead>
          <tr>
            <th>Date</th>
            <th>Weather</th>
            <th>Clouds</th>
            <th>Wind Speed</th>
            <th>Snow</th>
          </tr>
          </thead>
          <tbody>
          {
            weatherDate.map((weather, index) => (
                <tr key={index}>
                  <td>
                    { weather['dt_txt'] }
                  </td>
                  <td>
                    { weather['weather'][0].description }
                  </td>
                  <td>
                    { weather['clouds'].all }
                  </td>
                  <td>
                    { weather['wind'].speed }
                  </td>
                  <td>
                    { weather.snow['3h'] }
                  </td>
                </tr>
            ))
          }
          </tbody>
        </Table>
      </div>
    );
  }
  
}



class App extends Component {

  render() {
    return (
      <div className="App">
        <WeatherDisplay/>
      </div>
    );
  }
}
export default App;
