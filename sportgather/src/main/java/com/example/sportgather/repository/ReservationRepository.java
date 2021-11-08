package com.example.sportgather.repository;

import com.example.sportgather.domain.Reservation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReservationRepository {

    @Select("SELECT * FROM Reservation")
    List<Reservation> findByAll();

    @Select("SELECT * FROM Reservation WHERE UserId = #{UserId}")
    List<Reservation> findByPk(@Param("UserId") String id);

    @Select("SELECT BeginTime FROM Reservation NATURAL JOIN Court WHERE Court.Name = #{courtName} AND BeginTime LIKE #{date} ")
    List<String> findTodayReservation(@Param("date") String date, @Param("courtName") String courtName);

}
