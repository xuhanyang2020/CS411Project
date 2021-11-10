package com.example.sportgather.controller;

import com.example.sportgather.domain.CourtReservation;
import com.example.sportgather.domain.Reservation;
import com.example.sportgather.domain.ReservationStar;
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
    public List<Reservation> findReservationById(@RequestParam("id") String userId){
        System.out.println(userId);
        System.out.println("findReservationById is called");
        List<Reservation> list = reservationService.findAllReservationByUserId(userId);
        System.out.println(list.size());
        for (Reservation reservation: list){
            System.out.println(reservation.getReservationId());
        }
        return list;
    }

    @GetMapping(path = "/reservationstar")
    public List<ReservationStar> findSportStar(){
        System.out.println("findSportStar is called");
        return reservationService.queryReservationStar();
    }

    @CrossOrigin
    @PostMapping(path = "/cancel/{reservationid_delete}")
    public void cancelReservation(@PathVariable("reservationid_delete") String reservationId){
        System.out.println("Receiving request for deleting " + reservationId);
        reservationService.deleteReservation(reservationId);
    }

}