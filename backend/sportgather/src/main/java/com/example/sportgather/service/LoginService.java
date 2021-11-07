package com.example.sportgather.service;

import com.example.sportgather.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {

    @Autowired
    private static UserRepository userRepository;

    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static String addUser(String firstName, String email, String password) {
        userRepository.saveUser(firstName, email, password);
        return "add user done";
    }

    public static String showId(String email){
        String id = userRepository.displayId(email);
        return id;
    }

}
