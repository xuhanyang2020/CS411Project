package com.example.sportgather.service;

import com.example.sportgather.domain.Appointment;
import com.example.sportgather.domain.AppointmentInfo;
import com.example.sportgather.domain.Reservation;
import com.example.sportgather.domain.User;
import com.example.sportgather.repository.AppointmentRepository;
import com.example.sportgather.repository.CourtRepository;
import com.example.sportgather.repository.ReservationRepository;
import com.example.sportgather.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ReservationRepository reservationRepository;
    private final CourtRepository courtRepository;
    private final UserRepository userRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, ReservationRepository repository, CourtRepository courtRepository, UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.reservationRepository = repository;
        this.courtRepository = courtRepository;
        this.userRepository = userRepository;
    }

    public List<AppointmentInfo> findAcceptAppointment(String userId, String status){
        List<Appointment> accepted = appointmentRepository.findAllAcceptAppointment(userId, status);
        System.out.println(accepted.size());
        List<AppointmentInfo> infoList = new ArrayList<>();
        // iterate to update appointment info
        for (Appointment app : accepted){
            AppointmentInfo info = new AppointmentInfo();
            info.setAppointmentId(app.getAppointmentId());
            info.setReservationId(app.getReservationId());
            // get reservation info
            Reservation reservation = reservationRepository.findReservationByReservationId(app.getReservationId());
            info.setTime(reservation.getBeginTime());
            info.setAccept("T");
            infoList.add(info);
            // set court location
            info.setLocation(courtRepository.findLocationByPk(reservation.getCourtId()));
            User teacher = userRepository.findUserById(app.getTeacherId()).get(0);
            info.setTeacherName(teacher.getFirstName() + " " + teacher.getLastName());
        }
        return infoList;
    }
}
