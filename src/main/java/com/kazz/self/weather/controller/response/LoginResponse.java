package com.kazz.self.weather.controller.response;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponse {
    
    private List<String> error;
    private String authToken;
    
    public LoginResponse() {
        this.error = new ArrayList<String>();
    }

}
