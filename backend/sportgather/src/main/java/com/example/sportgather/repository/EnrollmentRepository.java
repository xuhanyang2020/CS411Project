package com.example.sportgather.repository;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface EnrollmentRepository {
    @Insert("INSERT INTO Enrollment VALUES (#{StudentId}, #{CourseId})")
    void enrollCourse(@Param("StudentId") String studentid, @Param("CourseId") String courseid);

    @Select("SELECT Count(*) FROM Enrollment WHERE StudentId=#{StudentId} AND CourseId=#{CourseId}")
    int fetchRegistered(@Param("StudentId") String studentid, @Param("CourseId") String courseid);
}
