package com.kazz.self.weather.dao;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class WeatherInfo {
    
    @Id
    private String id;
    
    private String city;
    
    private boolean currentCity;
    
    private String currentWeather;

}
