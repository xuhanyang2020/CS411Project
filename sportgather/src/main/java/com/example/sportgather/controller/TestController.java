package com.example.sportgather.controller;

import com.example.sportgather.domain.CourtReservation;
import com.example.sportgather.service.ReservationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/test")
public class TestController {

    private final ReservationService reservationService;

    public TestController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/{sportname}")
    public List<CourtReservation> getTime(@PathVariable("sportname") String sportName){
        return reservationService.findAvailableTimeBySport(sportName);
    }
}
