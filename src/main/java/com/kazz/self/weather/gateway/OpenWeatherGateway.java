package com.kazz.self.weather.gateway;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.kazz.self.weather.gateway.model.ForecastResponse;
import com.kazz.self.weather.gateway.model.WeatherResponse;

@Component
public class OpenWeatherGateway {
    
    private String API_KEY = "680b618bb665de1ba0771c7fe75402c0";
    
    private String FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&appid={api_key}&cnt=7&q=";

    private String CURRENT_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?appid={api_key}&q=";
    
    
    public WeatherResponse getWeather(String city) {
        
        String currentWeatherUrl = CURRENT_WEATHER_URL.replace("{api_key}", API_KEY) + city;
        
        RestTemplate restTemplate = new RestTemplate();
        WeatherResponse result = restTemplate.getForObject(currentWeatherUrl, WeatherResponse.class);
        
        return result;
    }
    
    public ForecastResponse getForecast(String city) {
        String forecastUrl = FORECAST_URL.replace("{api_key}", API_KEY) + city;
        
        RestTemplate restTemplate = new RestTemplate();
        ForecastResponse result = restTemplate.getForObject(forecastUrl, ForecastResponse.class);
        
        return result;

    }
    
    

}
