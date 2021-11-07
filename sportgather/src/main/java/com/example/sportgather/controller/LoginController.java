package com.example.sportgather.controller;

import com.example.sportgather.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping(path = "login")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping(path = "/{email}")
    public String displayId(@PathVariable("email") String email, HttpSession session) {
        String id = LoginService.showId(email);
        session.setAttribute("userid", id);
        System.out.println("displayId is called");
        return id;
    }

}
