package com.example.sportgather.controller;

import com.example.sportgather.domain.Reservation;
import com.example.sportgather.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "overview")
public class OverViewController {

    private final ReservationService reservationService;

    @Autowired
    public OverViewController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping(path = "/{id}")
    public String overviewPage(@PathVariable("id") String userId, Model model){
        Map<String, Integer> star = reservationService.querySportStar();
        List<Reservation> reservations = reservationService.queryReservationByUserId(userId);
        model.addAttribute("star", star);
        model.addAttribute("reservations", reservations);
        return "overview";
    }
}