package com.example.sportgather.controller;

import com.example.sportgather.domain.Reservation;
import com.example.sportgather.domain.User;
import com.example.sportgather.service.OverViewService;
import com.example.sportgather.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "overview")
public class OverViewController {

    private final OverViewService overViewService;
    private final ReservationService reservationService;

    @Autowired
    public OverViewController(OverViewService overViewService, ReservationService reservationService) {
        this.overViewService = overViewService;
        this.reservationService = reservationService;
    }

    @GetMapping(path = "/{id}")
    public List<Reservation> findReservationById(@PathVariable("id") String UserId){
        System.out.println("findReservationById is called");
        return reservationService.queryReservationByUserId(UserId);
    }

    @GetMapping(path = "/sportstar")
    public List<Map.Entry<String, Integer>> findSportStar(){
        System.out.println("findSportStar is called");
        return reservationService.querySportStar();
    }
}