package com.example.sportgather.repository;

import com.example.sportgather.domain.Appointment;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AppointmentRepository {

    @Select("SELECT * FROM Appointment WHERE Accept = #{status} AND StudentId = #{userId}")
    List<Appointment> findAllAcceptAppointment(@Param("userId") String userId, @Param("status") String status);

}
