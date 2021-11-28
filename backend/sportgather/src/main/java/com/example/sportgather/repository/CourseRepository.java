package com.example.sportgather.repository;

import com.example.sportgather.domain.Course;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CourseRepository {

    @Select("SELECT * FROM Course")
    List<Course> findAllCourse();

    @Select("SELECT * FROM Course NATURAL JOIN Hobby WHERE StudentId = #{UserId}")
    List<Course> findCourseByHobby(@Param("UserId") String UserId);

    @Select("SELECT * FROM Course NATURAL JOIN Sport WHERE SportId = #{sportId}")
    List<Course> findCourseBySport(@Param("sportId") String sportId);

    @Select("SELECT * FROM Course WHERE courseId = #{courseId}")
    Course findCourseByPk(@Param("courseId") String courseId);
}
