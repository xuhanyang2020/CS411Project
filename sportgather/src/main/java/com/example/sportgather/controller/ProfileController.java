package com.example.sportgather.controller;

import com.example.sportgather.domain.User;
import com.example.sportgather.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping(path = "profile")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping(path = "/users")
    public List<User> findAll(){
        System.out.println("findAll is now called");
        return profileService.queryAll();
    }

    @GetMapping()
    public List<User> findUserById(HttpSession session) {
        String id = (String) session.getAttribute("userid");
        System.out.println(id);
        System.out.println("findUserById is called");
        return ProfileService.queryUserById(id);
    }

    @PutMapping(path="/updateInfo/{lastName}/{gender}/{age}/{phone}/{location}/{type}/{id}")
    public String updateInfo(@PathVariable("lastName") String lastName,
                           @PathVariable("gender") String gender,
                           @PathVariable("age") Integer age,
                             @PathVariable("phone") String phone,
                             @PathVariable("location") String location,
                             @PathVariable("type") String type,
                             @PathVariable("id") String id) {
        System.out.println("updateInfo is called");
        return ProfileService.modifyInfo(lastName, gender, age, phone, location, type, id);
    }



}