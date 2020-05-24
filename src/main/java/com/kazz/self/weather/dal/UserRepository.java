package com.kazz.self.weather.dal;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kazz.self.weather.dao.User;

public interface UserRepository extends MongoRepository<User, String> {
    
    public Optional<User> findByEmail(String email);

}
