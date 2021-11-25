package com.example.sportgather.repository;


import com.example.sportgather.domain.Course;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface EnrollmentRepository {

    @Select("SELECT * FROM Enrollment NATURAL JOIN Course WHERE StudentId = #{userId}")
    List<Course> findEnrollmentByUserId(@Param("userId") String userId);

    @Delete("DELETE FROM Enrollment WHERE StudentId = #{userId} AND CourseId = #{courseId}")
    void deleteEnrollmentByPk(@Param("userId")String userId, @Param("courseId")String courseid);
}
