package com.kazz.self.weather.gateway.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class ForecastResponse {
    
    private List<WeatherResponse> list;
    
}
