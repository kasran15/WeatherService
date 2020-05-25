package com.kazz.self.weather.dao;

import java.util.Set;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {

    @Id
    private String id;

    private String email;
    private String password;
    private Set<String> cities;
    
    private String currentCity;

    public User() {
    }
    

}
