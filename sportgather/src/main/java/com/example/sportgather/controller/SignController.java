package com.example.sportgather.controller;


import com.example.sportgather.domain.User;
import com.example.sportgather.service.LoginService;
import com.example.sportgather.service.SignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "sign")
public class SignController {
    private final SignService signService;

    @Autowired

    public SignController(SignService signService) {
        this.signService = signService;
    }

    /*
    @PostMapping()
    public String saveUser(@ModelAttribute("user")User user, Model model) {
        String email = user.getEmail();
        String id = LoginService.showId(email);
        if (id == null) {
            SignService.addUser(user.getFirstName(), user.getEmail(), user.getPassword());
            System.out.println("saveUser is called");
            return SignService.addUser(user.getFirstName(), user.getEmail(), user.getPassword());
        }
        else {
            return "user with such email already exists";
        }
    } */

    @PostMapping(path="/saveUser/{firstName}/{email}/{password}")
    public String saveUser(@PathVariable("firstName") String firstName,
                           @PathVariable("email") String email,
                           @PathVariable("password") String password) {
        System.out.println("saveUser is called");
        return SignService.addUser(firstName, email, password);
    }
}
