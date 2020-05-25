package com.kazz.self.weather.controller;

import java.security.Principal;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kazz.self.weather.controller.response.LoginResponse;
import com.kazz.self.weather.dal.UserRepository;
import com.kazz.self.weather.dao.User;

import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder;

    public UserController(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @RequestMapping("")
    public User getUser(Principal principal) {
        Optional<User> existingUser = userRepository.findByEmail(principal.getName());

        return existingUser.orElse(null);

    }
    
    @PostMapping("/addCity")
    @ResponseBody
    public User addCity(@RequestBody City city, Principal principal) {
        Optional<User> user = userRepository.findByEmail(principal.getName());

        if (user.isPresent()) {
            Set<String> cities = user.get().getCities();
            if (cities == null) {
                cities = new HashSet<String>();
            }
            cities.add(city.getCity());
            user.get().setCities(cities);;
            userRepository.save(user.get());
        }
        
        
        return user.orElse(null);
    }
    
    @Getter
    @Setter
    public static class City {
        private String city;
    }

    @PostMapping("/create")
    @ResponseBody
    public LoginResponse createUser(@RequestBody User user) {

        LoginResponse response = new LoginResponse();

        if (StringUtils.isEmpty(user.getEmail())) {
            response.getError().add("Email is empty");
        }

        if (StringUtils.isEmpty(user.getPassword())) {
            response.getError().add("Password is empty");
        }

        if (response.getError().isEmpty()) {
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                response.getError().add("User already exists. Please use login");
            } else {
                String encodedPassword = encoder.encode(user.getPassword());

                user.setPassword(encodedPassword);
                userRepository.insert(user);
            }
        }

        return response;
    }

}
