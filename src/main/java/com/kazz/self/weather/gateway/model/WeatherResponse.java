package com.kazz.self.weather.gateway.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class WeatherResponse {
    
    
    private List<Weather> weather;
    private Main main;
    private String name;
    
    @Getter
    @Setter
    public static class Weather {
        private int id;
        private String main;
        private String description;
        private String icon;
    }
    
    @Getter
    @Setter
    public static class Main {
        
        private String temp;
        private String feels_like;
        private String temp_min;
        private String temp_max;
        private String pressure;
        private String humidity;
        
    }
}
