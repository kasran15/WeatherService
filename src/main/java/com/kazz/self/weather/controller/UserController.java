package com.kazz.self.weather.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kazz.self.weather.controller.response.LoginResponse;
import com.kazz.self.weather.dal.UserRepository;
import com.kazz.self.weather.dao.User;

@RestController
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    private BCryptPasswordEncoder encoder;
    
    public UserController(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }
    
    
    @RequestMapping("/api/user")
    public User getUser(@Param(value = "email") String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        
        return existingUser.orElse(null);
        
    }
    
    @PostMapping("/api/user/create")
    @ResponseBody
    public LoginResponse createUser(@RequestBody User user) {
        
        LoginResponse response = new LoginResponse();
        
        if (user.getEmail().isEmpty()) {
            response.getError().add("Email is empty");
        }
        
        if (user.getPassword().isEmpty()) {
            response.getError().add("Email is empty");
        }
        
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            response.getError().add("User already exists. Please use login");
        } else {
            
            String encodedPassword = encoder.encode(user.getPassword());
            
            user.setPassword(encodedPassword);
            userRepository.insert(user);
            
            
            response.setAuthToken("asdf");
        }
        return response;
    }
    

}
