package com.example.sportgather.controller;


import com.example.sportgather.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "login")
public class LoginController {
    private final LoginService loginService;

    @Autowired

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping(path="/saveUser/{firstName}/{email}/{password}")
    public String saveUser(@PathVariable("firstName") String firstName,
                           @PathVariable("email") String email,
                           @PathVariable("password") String password) {
        System.out.println("saveUser is called");
        return LoginService.addUser(firstName, email, password);
    }

    @GetMapping(path = "/{email}")
    public String displayId(@PathVariable("email") String email) {
        System.out.println("displayId is called");
        return LoginService.showId(email);
    }

}
