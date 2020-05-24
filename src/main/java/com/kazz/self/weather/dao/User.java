package com.kazz.self.weather.dao;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {

    @Id
    private String id;

    private String email;
    private String password;
    private List<String> cities;

    public User() {
    }
    

}
