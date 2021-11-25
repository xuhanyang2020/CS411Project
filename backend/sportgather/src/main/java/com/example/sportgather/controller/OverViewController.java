package com.example.sportgather.controller;

import com.example.sportgather.domain.*;
import com.example.sportgather.service.EnrollmentService;
import com.example.sportgather.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.List;

@RestController
@RequestMapping(path = "overview")
@CrossOrigin(origins = "http://localhost:3000")
public class OverViewController {

    private final ReservationService reservationService;
    private final EnrollmentService enrollmentService;

    @Autowired
    public OverViewController(ReservationService reservationService, EnrollmentService enrollmentService) {
        this.reservationService = reservationService;
        this.enrollmentService = enrollmentService;
    }

    // reservation operations
    @GetMapping("/reservation")
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
    @PostMapping(path = "/reservation/cancel/{reservationid_delete}")
    public void cancelReservation(@PathVariable("reservationid_delete") String reservationId){
        System.out.println("Receiving request for deleting " + reservationId);
        reservationService.deleteReservation(reservationId);
    }

    @GetMapping("/enrollment")
    public List<Course> findEnrollmentById(@RequestParam("id") String userId){
        System.out.println("Receiving request for deleting " + userId);
        return enrollmentService.findEnrollmentByUser(userId);
    }

    //waiting change to post method
    @CrossOrigin
    @GetMapping("/enrollment/cancel/{userId}/{courseId}")
    public void cancelEnrollment(@PathVariable("userId") String userId, @PathVariable("courseId")String courseId){
        enrollmentService.deleteEnrollment(userId, courseId);
    }

}