package com.kazz.self.weather.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kazz.self.weather.controller.response.AggregatedWeatherResponse;
import com.kazz.self.weather.gateway.OpenWeatherGateway;
import com.kazz.self.weather.gateway.model.ForecastResponse;
import com.kazz.self.weather.gateway.model.WeatherResponse;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {
    
    @Autowired private OpenWeatherGateway gateway;


    @RequestMapping("/{city}")
    public AggregatedWeatherResponse get(@PathVariable("city") String city) {
        WeatherResponse weather = gateway.getWeather(city);
        ForecastResponse forecast = gateway.getForecast(city);
        
        return AggregatedWeatherResponse.builder().weather(weather).forecast(forecast).build();
    }

}
