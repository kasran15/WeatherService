package com.kazz.self.weather.controller.response;

import com.kazz.self.weather.gateway.model.ForecastResponse;
import com.kazz.self.weather.gateway.model.WeatherResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AggregatedWeatherResponse {
    
    private WeatherResponse weather;
    private ForecastResponse forecast;
  
}
