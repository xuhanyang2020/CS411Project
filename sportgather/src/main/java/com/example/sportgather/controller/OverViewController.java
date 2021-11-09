package com.example.sportgather.controller;

import com.example.sportgather.domain.CourtReservation;
import com.example.sportgather.domain.Reservation;
import com.example.sportgather.domain.SportStar;
import com.example.sportgather.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "overview")
@CrossOrigin(origins = "http://localhost:3000")
public class OverViewController {

    private final ReservationService reservationService;

    @Autowired
    public OverViewController( ReservationService reservationService) {
        this.reservationService = reservationService;
    }


    @GetMapping()
    public List<Reservation> findReservationById(){
        System.out.println("findReservationById is called");
        List<Reservation> list = reservationService.findAllReservationByUserId("24");
        return list;
    }

    @GetMapping(path = "/sportstar")
    public List<SportStar> findSportStar(){
        System.out.println("findSportStar is called");
        return reservationService.querySportStar();
    }

    @GetMapping(path = "/cancel")
    public void cancelReservation(@RequestParam("reservationid")String reservationId){
        System.out.println("Receiving request for deleting" + reservationId);
        reservationService.deleteReservation(reservationId);
    }

}