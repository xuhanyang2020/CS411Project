package com.example.sportgather.repository;

import com.example.sportgather.domain.Reservation;
import com.example.sportgather.domain.User;
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

}
